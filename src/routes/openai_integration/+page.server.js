import db from "$lib/db.js";

export async function load() {
    let hikes = await db.getHikes();
    return {
        hikes
    };
}
export async function load({ params }) {
    return {
        hike: await db.getHike(params.hike_id),
    };
}

export const actions = {
    addToFavorites: async ({ request }) => {
        let data = await request.formData();
        let id = data.get("id");
        let hike = {
            _id: id,
            favorite: true
        };
        await db.updateHike(hike);
    },
    removeFromFavorites: async ({ request }) => {
        let data = await request.formData();
        let id = data.get("id");
        let hike = {
            _id: id,
            favorite: false
        };
        await db.updateHike(hike);
    },
    showAllHikes: async () => {
        let hikes = await db.getHikes();
        return {
            hikes
        };
    }
};
