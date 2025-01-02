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

<div
  class="container mt-4"
  style="background: url('/images/background.png') no-repeat center center; background-size: cover; padding: 20px; border-radius: 10px;"
>
  <div class="d-flex justify-content-between align-items-center">
    <h1 class="mb-0">Hike List</h1>
    <a href="/hikes/create" class="btn btn-primary">Add New Hike</a>
  </div>

  <p
    class="mt-3"
    style="background: rgba(255, 255, 255, 0.8); padding: 10px; border-radius: 5px;"
  >
    Here you can find all the hikes available in our database. Use the filters
    and tools to find your perfect adventure!
  </p>

  <div class="form-check mt-3">
    <input
      class="form-check-input"
      type="checkbox"
      id="filter"
      bind:checked={filterByFavorites}
    />
    <label class="form-check-label" for="filter"> Favoriten anzeigen</label>
  </div>

  <div class="row mt-3">
    {#each hikes as hike}
      <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
        <HikeCard {hike}></HikeCard>
      </div>
    {/each}
  </div>

  {#if !showAllHikes && data.hikes.length > 4}
    <div class="text-center mt-3">
      <button class="btn btn-secondary" onclick={() => (showAllHikes = true)}>
        Alles anzeigen
      </button>
    </div>
  {/if}
</div>
