import db from '$lib/db'; // Importiere das gesamte Objekt
import { json } from '@sveltejs/kit';

export async function POST() {
    try {
        const database = await db.connectToDB(); // Auf `connectToDB` über das exportierte Objekt zugreifen

        // Hole alle Hikes mit favorite: true
        const favoriteHikes = await database.collection('hikes')
            .find({ favorite: true })
            .map(hike => hike._id.toString()) // ObjectId zu String umwandeln
            .toArray();

        // Iteriere durch alle Challenges
        const challenges = await database.collection('challenges').find().toArray();

        for (const challenge of challenges) {
            // Zähle, wie viele related_hikes in den favoriteHikes enthalten sind
            const activatedCount = challenge.related_hikes.filter(hikeId => favoriteHikes.includes(hikeId)).length;

            // Prüfe, ob das Ziel erreicht wurde
            const isAchieved = activatedCount >= challenge.goal;

            // Aktualisiere den Fortschritt und den Status
            await database.collection('challenges').updateOne(
                { _id: challenge._id },
                {
                    $set: {
                        progress: activatedCount,
                        status: isAchieved ? 'achieved' : 'in_progress'
                    }
                }
            );
        }

        return json({ success: true, message: 'Challenges erfolgreich aktualisiert!' });
    } catch (error) {
        console.error(error);
        return json({ success: false, message: error.message }, { status: 500 });
    }
}
