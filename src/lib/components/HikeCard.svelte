<script>
  import { enhance } from "$app/forms";

  let { hike } = $props();
</script>

<div class="card hike-card shadow-lg border-success">
  <div class="position-relative">
    <img
      src={hike.titelbild}
      class="card-img-top img-fluid"
      alt={`Titelbild von ${hike.wanderung}`}
    />
    <div class="overlay">
      <h5
        class="text-white fw-bold position-absolute top-50 start-50 translate-middle"
      >
        {hike.wanderung}
      </h5>
    </div>
  </div>
  <div class="card-body">
    <h5 class="card-title text-success fw-bold">
      <a href={"/hikes/" + hike._id} class="text-decoration-none text-success">
        {hike.wanderung}
      </a>
    </h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <strong>Kanton:</strong>
        {hike.canton}
      </li>
      <li class="list-group-item">
        <strong>Kilometer:</strong>
        {hike.kilometer} km
      </li>
      <li class="list-group-item">
        <strong>Aufstieg:</strong>
        {hike.elevation_up} m, <strong>Abstieg:</strong>{" "}
        {hike.elevation_down} m
      </li>
      <li class="list-group-item">
        <strong>Dauer:</strong>
        {hike.dauer}
      </li>
      <li class="list-group-item">
        <strong>Schwierigkeit:</strong>
        {hike.TrailAdventurer_difficulty}
      </li>
      <li class="list-group-item">
        <strong>Nutzerbewertung:</strong>{" "}
        {Array.from({ length: Math.round(hike.user_rating) }, () => "⭐").join(
          "",
        )}{" "}
        ({hike.user_rating.toFixed(1)})
      </li>
      <li class="list-group-item">
        <strong>Höhenangst:</strong>{" "}
        {hike.vertigo_safe ? "erlaubt" : "nicht erlaubt"}
      </li>
    </ul>

    <div class="mt-3">
      {#if hike.favorite}
        <form method="POST" action="?/removeFromFavorites" use:enhance>
          <input type="hidden" name="id" value={hike._id} />
          <button class="btn btn-danger w-100">Als zu Tun markieren</button>
        </form>
      {:else}
        <form method="POST" action="?/addToFavorites" use:enhance>
          <input type="hidden" name="id" value={hike._id} />
          <button class="btn btn-success w-100">Als erledigt markieren</button>
        </form>
      {/if}
    </div>
  </div>
</div>

<style>
  @import "bootstrap/dist/css/bootstrap.min.css";
  @import "../../routes/styles.css"; /* Ensure correct relative path */
</style>
