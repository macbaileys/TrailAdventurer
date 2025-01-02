import db from "$lib/db.js";

export const actions = {
    addToFavorites: async ({ request }) => {
        const data = await request.formData();
        const hikeId = data.get("id");

        try {
            await db.addToFavorites(hikeId);
            console.log(`Hike ${hikeId} added to Favorites.`);
            return { success: true };
        } catch (error) {
            console.error("Error adding to Favorites:", error.message);
            return { success: false, error: "Failed to add hike to Favorites." };
        }
    },

    removeFromFavorites: async ({ request }) => {
        const data = await request.formData();
        const hikeId = data.get("id");

        try {
            await db.removeFromFavorites(hikeId);
            console.log(`Hike ${hikeId} removed from Favorites.`);
            return { success: true }; //okay
        } catch (error) {
            console.error("Error removing from Favorites:", error.message);
            return { success: false, error: "Failed to remove hike from Favorites." };
        }
    },
};
