<script>
  import { enhance } from "$app/forms";

  let { hike } = $props();
</script>

<div class="hike-card">
  <div>
    <img class="img-fluid" src={hike.titelbild} alt={hike.wanderung} />
  </div>
  <div class="details">
    <div class="wanderung">
      <a href={"/hikes/" + hike._id}>{hike.wanderung}</a>
    </div>
    <div>
      <strong>Kanton:</strong>
      {hike.canton}
    </div>
    <div>
      Kilometer: {hike.kilometer} km
    </div>
    <div>
      Aufstieg: {hike.elevation_up} m, Abstieg: {hike.elevation_down} m
    </div>
    <div>
      Dauer: {hike.dauer}
    </div>
    <div>
      Schwierigkeit: {hike.TrailAdventurer_difficulty}
    </div>
    <div>
      Nutzerbewertung: {Array.from(
        { length: Math.round(hike.user_rating) },
        () => "⭐",
      ).join("")} ({hike.user_rating.toFixed(1)})
    </div>
    <div>
      Höhenangst {hike.vertigo_safe ? "erlaubt" : "nicht erlaubt"}
    </div>

    {#if hike.favorite}
      <form method="POST" action="?/removeFromFavorites" use:enhance>
        <input type="hidden" name="id" value={hike._id} />
        <button class="btn btn-danger">Als zu tun markieren</button>
      </form>
    {:else}
      <form method="POST" action="?/addToFavorites" use:enhance>
        <input type="hidden" name="id" value={hike._id} />
        <button class="btn btn-success">Als erledigt markieren</button>
      </form>
    {/if}
  </div>
</div>

<style>
  .hike-card {
    border: 2px solid #4caf50;
    height: 100%;
    background-color: black;
    color: #8bc34a;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  .details {
    padding: 1em;
  }
  .wanderung a {
    font-weight: bold;
    color: #ffd700;
    text-decoration: none;
    font-size: 1.2em;
  }
  .wanderung a:hover {
    text-decoration: underline;
    color: #ffc107;
  }
  .btn {
    padding: 0.5em 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn.btn-danger {
    background-color: #d9534f;
    color: white;
  }
  .btn.btn-success {
    background-color: #5cb85c;
    color: white;
  }
  .btn:hover {
    opacity: 0.9;
  }
</style>
