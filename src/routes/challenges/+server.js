import { json } from '@sveltejs/kit';
import db from '$lib/db.js'; // Verbindung zur Datenbank

// GET-Route: Alle Challenges abrufen
export async function GET() {
    try {
        const challenges = await db.collection('challenges').find({}).toArray();
        return json(challenges);
    } catch (error) {
        console.error('Fehler beim Abrufen der Challenges:', error);
        return json({ error: 'Fehler beim Abrufen der Challenges' }, { status: 500 });
    }
}


// PATCH: Fortschritt einer Challenge aktualisieren
export async function PATCH({ request }) {
    try {
        const { hikeId } = await request.json();

        // Suche die Challenge, die den Hike referenziert
        const collection = db.collection('challenges');
        const challenge = await collection.findOne({ related_hikes: hikeId });

        if (!challenge) {
            return json({ error: 'Keine passende Challenge gefunden' }, { status: 404 });
        }

        // Fortschritt nur erhöhen, wenn die Challenge noch nicht abgeschlossen ist
        if (challenge.progress < challenge.goal) {
            const result = await collection.updateOne(
                { _id: challenge._id },
                {
                    $inc: { progress: 1 }, // Fortschritt um 1 erhöhen
                    $set: { status: challenge.progress + 1 >= challenge.goal ? 'completed' : 'in_progress' } // Status prüfen
                }
            );

            if (result.modifiedCount > 0) {
                return json({ message: 'Challenge-Fortschritt aktualisiert' });
            }
        }

        return json({ message: 'Challenge ist bereits abgeschlossen' });
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Challenge:', error);
        return json({ error: 'Fehler beim Aktualisieren der Challenge' }, { status: 500 });
    }
}
