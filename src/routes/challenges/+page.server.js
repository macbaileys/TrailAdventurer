import db from "$lib/db.js";

export async function load() {
    try {
        const challenges = await db.getChallenges(); // `getChallenges` verwendet
        return { challenges };
    } catch (error) {
        console.error("Fehler beim Laden der Challenges:", error);
        return { challenges: [] }; // Rückgabe einer leeren Liste im Fehlerfall
    }
}
