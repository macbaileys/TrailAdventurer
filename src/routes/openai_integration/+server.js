import { OpenAI } from "openai";
import { MongoClient, ObjectId } from "mongodb";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

// Set up OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Set up MongoDB
const client = new MongoClient(process.env.DB_URI);
await client.connect();
const db = client.db("HikesDB");
const hikesCollection = db.collection("hikes");

// Function to call OpenAI API with retry logic
async function callOpenAIWithRetry(prompt) {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            return await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "user",
                        content: `Extract concise and relevant keywords directly related to this hiking description: "${prompt}". 
                        Focus only on key attributes like specific locations (e.g., California, Patagonia), difficulty levels (easy, moderate, hard), or any unique terms.
                        Provide a comma-separated list without additional text or prefixes.`,
                    },
                ],
                max_tokens: 50,
            });
        } catch (error) {
            if (error.status === 429) {
                retries++;
                console.log(`Rate limit hit. Retrying (${retries}/${maxRetries})...`);
                await new Promise((resolve) => setTimeout(resolve, 2 ** retries * 1000));
            } else {
                throw error;
            }
        }
    }

    throw new Error("Rate limit exceeded after retries. Unable to complete request.");
}

export async function POST({ request }) {
    try {
        console.log("POST request received");

        const { prompt } = await request.json();

        // Call OpenAI API to extract keywords
        const chatResponse = await callOpenAIWithRetry(prompt);

        const chatData = chatResponse.choices[0].message.content.trim();
        const keywords = chatData
            .split(",")
            .map((keyword) => keyword.trim().toLowerCase());

        console.log("ChatGPT Keywords:", keywords);

        // MongoDB query to find hikes matching keywords
        let hikes = await hikesCollection
            .find({
                $or: [
                    { wanderung: { $regex: keywords.join("|"), $options: "i" } },
                    { locations: { $in: keywords } },
                ],
            })
            .sort({ user_rating: -1 })
            .limit(3)
            .toArray();

        // Broader match if no hikes found
        if (hikes.length === 0 && keywords.length > 0) {
            console.log("No exact matches found, applying broader match...");
            hikes = await hikesCollection
                .find({
                    $text: { $search: keywords.join(" ") }, // Full-text search for broader matches
                })
                .sort({ user_rating: -1 })
                .limit(3)
                .toArray();
        }

        // Fallback logic if still no hikes are found
        if (hikes.length === 0) {
            console.log("No specific hikes found, applying fallback...");
            hikes = await hikesCollection
                .find({})
                .sort({ user_rating: -1 })
                .limit(3)
                .toArray();
        }

        console.log("MongoDB Query Results:", hikes);

        // Serialize ObjectId to string for the frontend
        hikes = hikes.map((hike) => ({
            ...hike,
            _id: hike._id.toString(),
        }));

        return new Response(JSON.stringify({ hikes }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in POST /openai_integration:", error);

        if (error.status === 429) {
            return new Response(
                JSON.stringify({
                    error: "Rate limit reached. Please try again later.",
                }),
                { status: 429, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ error: "An unexpected error occurred. Please try again later." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
