import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("HikesDB"); // select database

// Verbindung zur Datenbank herstellen
async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db("HikesDB"); // Datenbank auswählen
  }
  return db;
}


//////////////////////////////////////////
// Hikes
//////////////////////////////////////////

// Get all hikes
async function getHikes() {
  let hikes = [];
  try {
    const collection = db.collection("hikes");

    const query = {}; // Define query if needed
    hikes = await collection.find(query).toArray();
    hikes.forEach((hike) => {
      hike._id = hike._id.toString(); // Convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return hikes;
}

// Get hike by id
async function getHike(id) {
  let hike = null;
  try {
    const collection = db.collection("hikes");
    const query = { _id: new ObjectId(id) }; // Filter by id
    hike = await collection.findOne(query);

    if (!hike) {
      console.log("No hike with id " + id);
      // TODO: errorhandling
    } else {
      hike._id = hike._id.toString(); // Convert ObjectId to String
    }
  } catch (error) {
    console.log(error.message);
  }
  return hike;
}

// Create hike
async function createHike(hike) {
  hike.titelbild = hike.titelbild || "/images/placeholder.jpg"; // Default title image
  hike.favorite = hike.favorite || false;
  hike.vertigo_safe = hike.vertigo_safe || true;
  hike.locations = hike.locations || [];
  try {
    const collection = db.collection("hikes");
    const result = await collection.insertOne(hike);
    return result.insertedId.toString(); // Convert ObjectId to String
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Update hike
async function updateHike(hike) {
  try {
    let id = hike._id;
    delete hike._id; // Delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("hikes");
    const query = { _id: new ObjectId(id) }; // Filter by id
    const result = await collection.updateOne(query, { $set: hike });

    if (result.matchedCount === 0) {
      console.log("No hike with id " + id);
      // TODO: errorhandling
    } else {
      console.log("Hike with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Delete hike by id
async function deleteHike(id) {
  try {
    const collection = db.collection("hikes");
    const query = { _id: new ObjectId(id) }; // Filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No hike with id " + id);
    } else {
      console.log("Hike with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}
//////////////////////////////////////////
// Challenges
//////////////////////////////////////////

// Get all challenges
async function getChallenges() {
  let challenges = [];
  try {
    const collection = db.collection("challenges");

    const query = {}; // Define query if needed
    challenges = await collection.find(query).toArray();
    challenges.forEach((challenge) => {
      challenge._id = challenge._id.toString(); // Convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return challenges;
}

// Get challenge by id
async function getChallenge(id) {
  let challenge = null;
  try {
    const collection = db.collection("challenges");
    const query = { _id: id }; // `_id` ist bereits ein String
    challenge = await collection.findOne(query);

    if (!challenge) {
      console.log("Keine Challenge mit der ID " + id);
      // TODO: errorhandling
    }
  } catch (error) {
    console.log(error.message);
  }
  return challenge;
}


// Create challenge
async function createChallenge(challenge) {
  // Standardwerte setzen
  challenge.progress = challenge.progress || 0; // Zahl
  challenge.goal = challenge.goal || 1; // Zahl
  challenge.status = challenge.status || "in_progress"; // String

  try {
    const collection = db.collection("challenges");
    const result = await collection.insertOne(challenge);
    return result.insertedId.toString(); // ID als String zurückgeben
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Update challenge
async function updateChallenge(challenge) {
  try {
    let id = challenge._id;
    delete challenge._id; // `_id` darf nicht aktualisiert werden

    const collection = db.collection("challenges");
    const query = { _id: id }; // `_id` als String
    const result = await collection.updateOne(query, { $set: challenge });

    if (result.matchedCount === 0) {
      console.log("Keine Challenge mit der ID " + id);
      // TODO: errorhandling
    } else {
      console.log("Challenge mit der ID " + id + " wurde aktualisiert.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}
// Update challenges basierend auf den Favoriten-Hikes
async function updateChallenges() {
  try {
    const favoriteHikes = await db
      .collection("hikes")
      .find({ favorite: true })
      .map((hike) => hike._id.toString()) // ObjectId zu String umwandeln
      .toArray();

    const challenges = await db.collection("challenges").find().toArray();

    for (const challenge of challenges) {
      const activatedCount = challenge.related_hikes.filter((hikeId) =>
        favoriteHikes.includes(hikeId)
      ).length;

      const isAchieved = activatedCount >= challenge.goal;

      await db.collection("challenges").updateOne(
        { _id: challenge._id },
        {
          $set: {
            progress: activatedCount,
            status: isAchieved ? "achieved" : "in_progress",
          },
        }
      );
    }

    console.log("Challenges erfolgreich aktualisiert.");
    return { success: true, message: "Challenges erfolgreich aktualisiert." };
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Challenges:", error);
    return { success: false, message: error.message };
  }
}


// Delete challenge by id
async function deleteChallenge(id) {
  try {
    const collection = db.collection("challenges");
    const query = { _id: id }; // `_id` als String
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("Keine Challenge mit der ID " + id);
    } else {
      console.log("Challenge mit der ID " + id + " wurde gelöscht.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

export default {
  getHikes,
  getHike,
  createHike,
  updateHike,
  deleteHike,
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  updateChallenges,
  connectToDB,
};
