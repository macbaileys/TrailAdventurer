<script>
  import Navbar from "$lib/components/Navbar.svelte";
  export let data;
  let hike = data.hike;

  function renderStars(rating) {
    const fullStars = Math.round(rating);
    return "⭐".repeat(fullStars) + "☆".repeat(5 - fullStars);
  }
</script>

<Navbar />

<main class="container mt-5">
  <div class="card shadow-lg border-0">
    <div class="card-header bg-success text-white text-center">
      <h1>{hike.wanderung}</h1>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <img
            src={hike.titelbild}
            alt={hike.wanderung}
            class="img-fluid rounded shadow-sm"
          />
        </div>
        <div class="col-md-6">
          <h4 class="mb-3 text-success">Details</h4>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Distance:</strong>
              {hike.kilometer} km
            </li>
            <li class="list-group-item">
              <strong>Elevation Gain:</strong>
              {hike.elevation_up} m
            </li>
            <li class="list-group-item">
              <strong>Elevation Loss:</strong>
              {hike.elevation_down} m
            </li>
            <li class="list-group-item">
              <strong>Exposedness Level:</strong>
              {hike.exposedness_level}
            </li>
            <li class="list-group-item">
              <strong>Trail Adventurer Difficulty:</strong>
              {hike.TrailAdventurer_difficulty}
            </li>
            <li class="list-group-item">
              <strong>User Rating:</strong>
              <span>{renderStars(hike.user_rating)}</span>
            </li>
            <li class="list-group-item">
              <strong>Duration:</strong>
              {hike.dauer}
            </li>
            <li class="list-group-item">
              <strong>Vertigo Safe:</strong>
              {hike.vertigo_safe ? "Yes" : "No"}
            </li>
            <li class="list-group-item">
              <strong>Favorite:</strong>
              {hike.favorite ? "Yes" : "No"}
            </li>
            <li class="list-group-item">
              <strong>Starting Point:</strong> [{hike.starting_point[0]}, {hike
                .starting_point[1]}]
            </li>
            <li class="list-group-item">
              <strong>End Point:</strong> [{hike.end_point[0]}, {hike
                .end_point[1]}]
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-footer bg-light text-center">
      <h5>Locations</h5>
      <ul class="list-inline">
        {#each hike.locations as location}
          <li class="list-inline-item badge bg-success text-white p-2 m-1">
            {location}
          </li>
        {/each}
      </ul>
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={hike._id} />
        <button class="btn btn-danger mt-3">Delete Hike</button>
      </form>
    </div>
  </div>
</main>

<style>
  .container {
    background-color: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
  }

  .card-header {
    font-size: 2rem;
    font-weight: bold;
  }

  .list-group-item {
    font-size: 1.1rem;
  }

  .badge {
    font-size: 1rem;
  }

  .img-fluid {
    border-radius: 8px;
  }
</style>
