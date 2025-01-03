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

<div class="container mt-4 p-4 border rounded bg-light">
  <div class="d-flex justify-content-between align-items-center">
    <h1 class="mb-0">Alle Wanderungen</h1>
    <a href="/hikes/create" class="btn btn-success">Neue Wanderung hinzufügen</a
    >
  </div>

  <div class="container py-5">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 text-center">
        <h1 class="display-10 fw-bold text-primary mb-3">
          TrailAdventurer: Deine WebApp zu den spektakulärsten Naturabenteuern!
        </h1>
        <p class="lead text-secondary">
          Stell dir vor, du stehst vor einer Auswahl von Wanderungen, die alle
          nur darauf warten, von dir entdeckt zu werden.
          <strong>TrailAdventurer</strong> ist dein Kompass der dich durch die majestätischen
          Gipfeln der Alpen und durch die versteckten Pfaden in den Wäldern führt.
        </p>
        <p class="text-secondary">
          Erkunde Wanderungen, die du nach Schwierigkeitsgraden, Exponiertheit
          und weiteren Attributen filtern kannst. Hol dir Inspiration und plane
          dein nächstes Abenteuer ganz nach deinem Geschmack – egal, ob du auf
          der Suche nach einem Adrenalin-Kick oder einem ruhigen Naturerlebnis
          bist.
        </p>
        <p class="text-secondary">
          Sammle Belohnungen und erringe neue Achievements, indem du
          Herausforderungen meisterst wie „Walliser Entdecker“ oder „Mutiger
          Wanderer“. Mit <strong>TrailAdventurer</strong> wird jede Wanderung zu
          einem Teil einer epischen Reise.
        </p>
        <p class="fs-5 text-success fw-bold">
          Worauf wartest du noch? Der nächste große Moment wartet bereits hinter
          dem nächsten Gipfel! 🌄✨
        </p>
      </div>
    </div>
  </div>

  <div class="form-check form-switch mt-3">
    <input
      class="form-check-input"
      type="checkbox"
      id="filter"
      bind:checked={filterByFavorites}
    />
    <label class="form-check-label" for="filter">Nur erledigte anzeigen</label>
  </div>

  <div class="row mt-4">
    {#each hikes as hike}
      <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
        <HikeCard {hike} />
      </div>
    {/each}
  </div>

  {#if !showAllHikes && data.hikes.length > 4}
    <div class="text-center mt-4">
      <button
        class="btn btn-outline-secondary"
        onclick={() => (showAllHikes = true)}
      >
        Alle anzeigen
      </button>
    </div>
  {/if}
</div>

<style>
  .form-check-input {
    width: 1.5em;
    height: 1.5em;
    cursor: pointer;
  }

  .form-check-label {
    font-weight: 500;
    margin-left: 0.5em;
  }

  .btn-success {
    background-color: #28a745;
    border: none;
  }

  .btn-success:hover {
    background-color: #218838;
  }
</style>
