import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const hike = {
      wanderung: data.get("wanderung") || "Unbenannt",
      description: data.get("description") || "No description provided",
      canton: data.get("canton") || "Unknown",
      kilometer: parseFloat(data.get("kilometer")) || 0,
      elevation_up: parseInt(data.get("elevation_up"), 10) || 0,
      elevation_down: parseInt(data.get("elevation_down"), 10) || 0,
      exposedness_level: parseInt(data.get("exposedness_level"), 10) || 1,
      TrailAdventurer_difficulty: parseInt(data.get("TrailAdventurer_difficulty"), 10) || 1,
      user_rating: 4.0, // Placeholder user rating
      dauer: data.get("dauer") || "0 Minuten",
      titelbild: data.get("titelbild") || "/images/default.png",
      vertigo_safe: data.get("vertigo_safe") === "true",
      favorite: false, // Default value
      starting_point: data.get("starting_point")?.split(",").map(Number) || [],
      end_point: data.get("end_point")?.split(",").map(Number) || [],
      locations: data.get("locations")?.split(",") || ["unknown"],
    };

    await db.createHike(hike);
    return { success: true };
  },
};
