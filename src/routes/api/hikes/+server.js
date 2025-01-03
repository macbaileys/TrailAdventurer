import { json } from "@sveltejs/kit";
import db from "$lib/db.js";

export async function PATCH({ request }) {
    try {
        const { id, favorite } = await request.json();

        if (!id) {
            return json({ error: "Keine ID angegeben" }, { status: 400 });
        }

        const hikesCollection = db.collection("hikes");
        const result = await hikesCollection.updateOne(
            { "_id.$oid": id }, // Suche anhand von "$oid"
            { $set: { favorite } }
        );

        if (result.modifiedCount === 0) {
            return json({ error: "Hike nicht gefunden" }, { status: 404 });
        }

        return json({ message: "Hike erfolgreich aktualisiert" });
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Hikes:", error);
        return json({ error: "Fehler beim Aktualisieren des Hikes" }, { status: 500 });
    }
}
