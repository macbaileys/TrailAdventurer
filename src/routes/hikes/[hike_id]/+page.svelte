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
              <strong>SAC-Level:</strong>
              T{hike.exposedness_level}
            </li>
            <li class="list-group-item">
              <strong>Unser Schwierigkeitsrating:</strong>
              {hike.TrailAdventurer_difficulty}/10
            </li>
            <li class="list-group-item">
              <strong>Durchschnittliches Rating:</strong>
              <span>{renderStars(hike.user_rating)}</span>
            </li>
            <li class="list-group-item">
              <strong>Dauer:</strong>
              {hike.dauer}
            </li>
            <li class="list-group-item">
              <strong
                >Höhenangst
                {hike.vertigo_safe ? "erlaubt" : "nicht erlaubt"}
              </strong>
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
                  <button class="btn btn-danger">Als zu tun markieren</button>
                </form>
              {:else}
                <form method="POST" action="?/addToFavorites" use:enhance>
                  <input type="hidden" name="id" value={hike._id} />
                  <button class="btn btn-success">Als erledigt markieren</button
                  >
                </form>
              {/if}
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-4">
        <h5 class="text-success">Beschreibung</h5>
        <p>{hike.description}</p>
      </div>
    </div>
    <div class="card-footer bg-light text-center">
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={hike._id} />
        <button class="btn btn-danger mt-3">Aus Datenbank entfernen</button>
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

  .img-fluid {
    border-radius: 8px;
  }

  button {
    cursor: pointer;
  }
</style>
