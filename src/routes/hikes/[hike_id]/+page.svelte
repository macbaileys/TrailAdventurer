<script>
  import Navbar from "$lib/components/Navbar.svelte";

  export let data;
  let hike = data.hike;

  function renderStars(rating) {
    const fullStars = Math.round(rating);
    return "⭐".repeat(fullStars);
  }
</script>

<Navbar />

<main class="container mt-5 hike-details">
  <div class="card shadow-lg border-0">
    <!-- Header -->
    <div class="card-header bg-success text-white text-center">
      <h1 class="hike-id-title">{hike.wanderung}</h1>
    </div>

    <!-- Body -->
    <div class="card-body">
      <div class="row g-4">
        <!-- Image Section -->
        <div class="col-md-6">
          <img
            src={hike.titelbild}
            alt={hike.wanderung}
            class="img-fluid rounded shadow-sm"
          />
        </div>

        <!-- Details Section -->
        <div class="col-md-6">
          <h4 class="mb-4 text-success">Details</h4>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <strong>Distanz:</strong>
              {hike.kilometer} km
            </li>
            <li class="list-group-item">
              <strong>Aufstieg:</strong>
              {hike.elevation_up} m
            </li>
            <li class="list-group-item">
              <strong>Abstieg:</strong>
              {hike.elevation_down} m
            </li>
            <li class="list-group-item">
              <strong>SAC-Level:</strong> T{hike.exposedness_level}
            </li>
            <li class="list-group-item">
              <strong>Unser Schwierigkeitsrating:</strong>{" "}
              {hike.TrailAdventurer_difficulty}/10
            </li>
            <li class="list-group-item">
              <strong>Durchschnittliches Rating:</strong>{" "}
              <span>{renderStars(hike.user_rating)}</span>
            </li>
            <li class="list-group-item">
              <strong>Dauer:</strong>
              {hike.dauer}
            </li>
            <li class="list-group-item">
              <strong>Höhenangst:</strong>
              {hike.vertigo_safe ? "erlaubt" : "nicht erlaubt"}
            </li>
            <li class="list-group-item">
              <strong>Kanton:</strong>
              {hike.canton}
            </li>
            <li class="list-group-item">
              <strong>Bereits gewandert?</strong>
              {#if hike.favorite}
                <form method="POST" action="?/removeFromFavorites" use:enhance>
                  <input type="hidden" name="id" value={hike._id} />
                  <button class="btn btn-danger w-100 shadow-sm"
                    >Als zu tun markieren</button
                  >
                </form>
              {:else}
                <form method="POST" action="?/addToFavorites" use:enhance>
                  <input type="hidden" name="id" value={hike._id} />
                  <button class="btn btn-success w-100 shadow-sm"
                    >Als erledigt markieren</button
                  >
                </form>
              {/if}
            </li>
          </ul>
        </div>
      </div>

      <!-- Description Section -->
      <div class="mt-5">
        <h5 class="text-success">Beschreibung</h5>
        <p class="lead">{hike.description}</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="card-footer bg-light text-center">
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={hike._id} />
        <button class="btn btn-danger shadow-sm mt-3 w-100"
          >Aus Datenbank entfernen</button
        >
      </form>
    </div>
  </div>
</main>

<style>
  @import "bootstrap/dist/css/bootstrap.min.css";
  @import "../../styles.css"; /* Correct relative path */
</style>
