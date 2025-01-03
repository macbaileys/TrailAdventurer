import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

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
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deleteHike(data.get("id"));
    throw redirect(303, "/hikes");
  },
};
