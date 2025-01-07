import { MongoClient, ObjectId } from "mongodb"; // Importiere MongoClient und ObjectId aus dem mongodb-Paket
import { DB_URI } from "$env/static/private"; // Importiere die Datenbank-URI aus einer Umgebungsvariablen

const client = new MongoClient(DB_URI); // Erstelle einen neuen MongoClient mit der URI

await client.connect(); // Verbinde den Client mit der Datenbank
const db = client.db("HikesDB"); // Wähle die Datenbank "HikesDB" aus

// Verbindung zur Datenbank herstellen
async function connectToDB() {
  if (!db) { // Überprüfe, ob die Datenbankverbindung existiert
    await client.connect(); // Verbinde den Client, falls nicht verbunden
    db = client.db("HikesDB"); // Wähle die Datenbank "HikesDB" aus
  }
  return db; // Gib die Datenbankverbindung zurück
}

//////////////////////////////////////////
// Hikes
//////////////////////////////////////////

// Alle Wanderungen abrufen
async function getHikes() {
  let hikes = [];
  try {
    const collection = db.collection("hikes"); // Wähle die Sammlung "hikes" aus

    const query = {}; // Definiere eine leere Abfrage, um alle Dokumente abzurufen
    hikes = await collection.find(query).toArray(); // Führe die Abfrage aus und konvertiere das Ergebnis in ein Array
    hikes.forEach((hike) => {
      hike._id = hike._id.toString(); // Konvertiere ObjectId zu String
    });
  } catch (error) {
    console.log(error); // Fehlerprotokollierung
    // TODO: Fehlerbehandlung
  }
  return hikes; // Gib die Liste der Wanderungen zurück
}

// Wanderung nach ID abrufen
async function getHike(id) {
  let hike = null;
  try {
    const collection = db.collection("hikes"); // Wähle die Sammlung "hikes" aus
    const query = { _id: new ObjectId(id) }; // Filtere nach ID
    hike = await collection.findOne(query); // Finde ein Dokument mit der angegebenen ID

    if (!hike) {
      console.log("No hike with id " + id); // Falls keine Wanderung gefunden wurde
      // TODO: Fehlerbehandlung
    } else {
      hike._id = hike._id.toString(); // Konvertiere ObjectId zu String
    }
  } catch (error) {
    console.log(error.message); // Fehlerprotokollierung
  }
  return hike; // Gib die Wanderung zurück
}

// Wanderung erstellen
async function createHike(hike) {
  hike.titelbild = hike.titelbild || "/images/placeholder.jpg"; // Standardtitelbild setzen
  hike.favorite = hike.favorite || false; // Standardwert für Favorit setzen
  hike.vertigo_safe = hike.vertigo_safe || true; // Standardwert für Schwindelsicherheit setzen
  hike.locations = hike.locations || []; // Standardwert für Orte setzen
  try {
    const collection = db.collection("hikes"); // Wähle die Sammlung "hikes" aus
    const result = await collection.insertOne(hike); // Füge die Wanderung in die Sammlung ein
    return result.insertedId.toString(); // Gib die eingefügte ID als String zurück
  } catch (error) {
    console.log(error.message); // Fehlerprotokollierung
  }
  return null; // Gib null zurück, falls ein Fehler aufgetreten ist
}

// Wanderung aktualisieren
async function updateHike(hike) {
  try {
    let id = hike._id;
    delete hike._id; // Lösche die _id aus dem Objekt, da die _id nicht aktualisiert werden kann
    const collection = db.collection("hikes"); // Wähle die Sammlung "hikes" aus
    const query = { _id: new ObjectId(id) }; // Filtere nach ID
    const result = await collection.updateOne(query, { $set: hike }); // Aktualisiere die Wanderung

    if (result.matchedCount === 0) {
      console.log("No hike with id " + id); // Falls keine Wanderung mit der ID gefunden wurde
      // TODO: Fehlerbehandlung
    } else {
      console.log("Hike with id " + id + " has been updated."); // Erfolgreiche Aktualisierung
      return id; // Gib die ID zurück
    }
  } catch (error) {
    console.log(error.message); // Fehlerprotokollierung
  }
  return null; // Gib null zurück, falls ein Fehler aufgetreten ist
}

// Wanderung nach ID löschen
async function deleteHike(id) {
  try {
    const collection = db.collection("hikes"); // Wähle die Sammlung "hikes" aus
    const query = { _id: new ObjectId(id) }; // Filtere nach ID
    const result = await collection.deleteOne(query); // Lösche die Wanderung

    if (result.deletedCount === 0) {
      console.log("No hike with id " + id); // Falls keine Wanderung mit der ID gefunden wurde
    } else {
      console.log("Hike with id " + id + " has been successfully deleted."); // Erfolgreiche Löschung
      return id; // Gib die ID zurück
    }
  } catch (error) {
    console.log(error.message); // Fehlerprotokollierung
  }
  return null; // Gib null zurück, falls ein Fehler aufgetreten ist
}

//////////////////////////////////////////
// Challenges
//////////////////////////////////////////

// Alle Herausforderungen abrufen
async function getChallenges() {
  let challenges = [];
  try {
    const collection = db.collection("challenges"); // Wähle die Sammlung "challenges" aus

    const query = {}; // Definiere eine leere Abfrage, um alle Dokumente abzurufen
    challenges = await collection.find(query).toArray(); // Führe die Abfrage aus und konvertiere das Ergebnis in ein Array
    challenges.forEach((challenge) => {
      challenge._id = challenge._id.toString(); // Konvertiere ObjectId zu String
    });
  } catch (error) {
    console.log(error); // Fehlerprotokollierung
    // TODO: Fehlerbehandlung
  }
  return challenges; // Gib die Liste der Herausforderungen zurück
}

// Herausforderung nach ID abrufen
async function getChallenge(id) {
  let challenge = null;
  try {
    const collection = db.collection("challenges"); // Wähle die Sammlung "challenges" aus
    const query = { _id: id }; // `_id` ist bereits ein String
    challenge = await collection.findOne(query); // Finde ein Dokument mit der angegebenen ID

    if (!challenge) {
      console.log("Keine Challenge mit der ID " + id); // Falls keine Herausforderung gefunden wurde
      // TODO: Fehlerbehandlung
    }
  } catch (error) {
    console.log(error.message); // Fehlerprotokollierung
  }
  return challenge; // Gib die Herausforderung zurück
}

// Herausforderung erstellen
async function createChallenge(challenge) {
  // Standardwerte setzen
  challenge.progress = challenge.progress || 0; // Standardwert für Fortschritt setzen
  challenge.goal = challenge.goal || 1; // Standardwert für Ziel setzen
  challenge.status = challenge.status || "in_progress"; // Standardwert für Status setzen

  try {
    const collection = db.collection("challenges"); // Wähle die Sammlung "challenges" aus
    const result = await collection.insertOne(challenge); // Füge die Herausforderung in die Sammlung ein
    return result.insertedId.toString(); // Gib die eingefügte ID als String zurück
  } catch (error) {
    console.log(error.message); // Fehlerprotokollierung
  }
  return null; // Gib null zurück, falls ein Fehler aufgetreten ist
}

// Herausforderung aktualisieren
async function updateChallenge(challenge) {
  try {
    let id = challenge._id;
    delete challenge._id; // `_id` darf nicht aktualisiert werden

    const collection = db.collection("challenges"); // Wähle die Sammlung "challenges" aus
    const query = { _id: id }; // `_id` als String
    const result = await collection.updateOne(query, { $set: challenge }); // Aktualisiere die Herausforderung

    if (result.matchedCount === 0) {
      console.log("Keine Challenge mit der ID " + id); // Falls keine Herausforderung mit der ID gefunden wurde
      // TODO: Fehlerbehandlung
    } else {
      console.log("Challenge mit der ID " + id + " wurde aktualisiert."); // Erfolgreiche Aktualisierung
      return id; // Gib die ID zurück
    }
  } catch (error) {
    console.log(error.message); // Fehlerprotokollierung
  }
  return null; // Gib null zurück, falls ein Fehler aufgetreten ist
}

// Herausforderungen basierend auf den Favoriten-Wanderungen aktualisieren
async function updateChallenges() {
  try {
    const favoriteHikes = await db
      .collection("hikes")
      .find({ favorite: true }) // Finde alle favorisierten Wanderungen
      .map((hike) => hike._id.toString()) // Konvertiere ObjectId zu String
      .toArray();

    const challenges = await db.collection("challenges").find().toArray(); // Finde alle Herausforderungen

    for (const challenge of challenges) {
      const activatedCount = challenge.related_hikes.filter((hikeId) =>
        favoriteHikes.includes(hikeId)
      ).length; // Zähle die Anzahl der aktivierten Herausforderungen

      const isAchieved = activatedCount >= challenge.goal; // Überprüfe, ob das Ziel erreicht wurde

      await db.collection("challenges").updateOne(
        { _id: challenge._id },
        {
          $set: {
            progress: activatedCount, // Aktualisiere den Fortschritt
            status: isAchieved ? "achieved" : "in_progress", // Aktualisiere den Status
          },
        }
      );
    }

    console.log("Challenges erfolgreich aktualisiert."); // Erfolgreiche Aktualisierung
    return { success: true, message: "Challenges erfolgreich aktualisiert." }; // Gib Erfolgsmeldung zurück
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Challenges:", error); // Fehlerprotokollierung
    return { success: false, message: error.message }; // Gib Fehlermeldung zurück
  }
}

// Herausforderung nach ID löschen
async function deleteChallenge(id) {
  try {
    const collection = db.collection("challenges"); // Wähle die Sammlung "challenges" aus
    const query = { _id: id }; // `_id` als String
    const result = await collection.deleteOne(query); // Lösche die Herausforderung

    if (result.deletedCount === 0) {
      console.log("Keine Challenge mit der ID " + id); // Falls keine Herausforderung mit der ID gefunden wurde
    } else {
      console.log("Challenge mit der ID " + id + " wurde gelöscht."); // Erfolgreiche Löschung
      return id; // Gib die ID zurück
    }
  } catch (error) {
    console.log(error.message); // Fehlerprotokollierung
  }
  return null; // Gib null zurück, falls ein Fehler aufgetreten ist
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
}; // Exportiere alle Funktionen als Standard-Export