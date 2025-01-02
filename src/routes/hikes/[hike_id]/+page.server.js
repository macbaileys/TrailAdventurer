import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    hike: await db.getHike(params.hike_id),
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();

    await db.deleteHike(data.get("id"));
    throw redirect(303, "/hikes");
  },
};
