import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("HikesDB"); // select database

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
// Favorites
//////////////////////////////////////////


export default {
  getHikes,
  getHike,
  createHike,
  updateHike,
  deleteHike,
};
