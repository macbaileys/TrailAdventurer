import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const hike = {
      wanderung: data.get("wanderung") || "Unbenannt",
      kilometer: parseFloat(data.get("kilometer")) || "Keine Angabe in ",
      elevation_up: parseInt(data.get("elevation_up"), 10) || 500,
      elevation_down: parseInt(data.get("elevation_down"), 10) || 450,
      exposedness_level: parseInt(data.get("exposedness_level"), 10) || 2,
      TrailAdventurer_difficulty: parseInt(data.get("TrailAdventurer_difficulty"), 10) || 3,
      user_rating: 4.3, // Placeholder user rating
      dauer: data.get("dauer") || "300 Minuten",
      titelbild: data.get("titelbild") || "/images/newhike.png",
      vertigo_safe: data.get("vertigo_safe") === "true" || true,
      favorite: false, // Default value
      starting_point: data.get("starting_point")?.split(",").map(Number) || [],
      end_point: data.get("end_point")?.split(",").map(Number) || [],
      locations: data.get("locations")?.split(",") || ["überall"],
    };

    await db.createHike(hike);
    return { success: true };
  },
};
