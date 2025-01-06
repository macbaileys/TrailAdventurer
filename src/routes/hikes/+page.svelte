<script>
  import HikeCard from "$lib/components/HikeCard.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  let { data, filterByFavorites = false } = $props();

  let showAllHikes = $state(false);

  let hikes = $derived.by(() => {
    if (filterByFavorites) {
      let hikesFiltered = data.hikes.filter((hike) => hike.favorite);
      return hikesFiltered;
    }
    return showAllHikes ? data.hikes : data.hikes.slice(0, 4);
  });
</script>

<Navbar />

<div class="container mt-4 p-4 border rounded bg-light shadow">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="text-success">Alle Wanderungen</h1>
    <a href="/hikes/create" class="btn btn-success shadow">
      Neue Wanderung hinzufügen
    </a>
  </div>

  <!-- Introduction Section -->
  <div class="row text-center mb-5">
    <div class="col-md-10 offset-md-1">
      <h1 class="display-4 fw-bold text-success">
        TrailAdventurer: Deine WebApp zu den spektakulärsten Wanderungen!
      </h1>
      <p class="lead text-secondary">
        Stell dir vor, du stehst vor einer Auswahl von Wanderungen, die alle nur
        darauf warten, von dir entdeckt zu werden.
        <strong>TrailAdventurer</strong> ist dein Kompass der dich durch die majestätischen
        Gipfeln der Alpen und durch die versteckten Pfaden in den Wäldern führt.
      </p>
      <p class="fs-5 text-success fw-bold">
        Worauf wartest du noch? Der nächste grosse Moment wartet bereits hinter
        dem nächsten Gipfel! 🌄✨
      </p>
    </div>
  </div>

  <!-- Filter Switch -->
  <div class="form-check form-switch mb-4">
    <input
      class="form-check-input"
      type="checkbox"
      id="filter"
      bind:checked={filterByFavorites}
    />
    <label class="form-check-label" for="filter">Nur erledigte anzeigen</label>
  </div>

  <!-- Hike Cards -->
  <div class="row g-4">
    {#each hikes as hike}
      <div class="col-sm-6 col-md-4 col-lg-3">
        <HikeCard {hike} />
      </div>
    {/each}
  </div>

  <!-- Show All Button -->
  {#if !showAllHikes && data.hikes.length > 4}
    <div class="text-center mt-4">
      <button
        class="btn btn-outline-secondary shadow"
        onclick={() => (showAllHikes = true)}
      >
        Alle anzeigen
      </button>
    </div>
  {/if}
</div>

<style>
  @import "bootstrap/dist/css/bootstrap.min.css";
  @import "../styles.css"; /* Adjust the path as necessary */
</style>
