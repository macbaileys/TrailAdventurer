<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import { writable } from "svelte/store";

  let { form } = $props();
  const titleImage = writable(null);

  function handleFileInput(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        titleImage.set(e.target.result); // Update the store
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<Navbar />

<div class="container my-4">
  <a href="/hikes" class="btn btn-secondary mb-3">Back</a>
  <h1 class="mb-4 text-center">Add a Hike</h1>
  <form method="POST" action="?/create" class="card p-4 shadow">
    <div class="mb-3">
      <label for="wanderung" class="form-label">Name</label>
      <input
        id="wanderung"
        name="wanderung"
        class="form-control"
        type="text"
        placeholder="Name"
      />
    </div>
    <div class="mb-3">
      <label for="kilometer" class="form-label">Kilometer</label>
      <input
        id="kilometer"
        name="kilometer"
        class="form-control"
        type="number"
        step="0.1"
        placeholder="Kilometer"
      />
    </div>
    <div class="mb-3">
      <label for="elevation_up" class="form-label">Elevation Up</label>
      <input
        id="elevation_up"
        name="elevation_up"
        class="form-control"
        type="number"
        placeholder="500"
      />
    </div>
    <div class="mb-3">
      <label for="elevation_down" class="form-label">Elevation Down</label>
      <input
        id="elevation_down"
        name="elevation_down"
        class="form-control"
        type="number"
        placeholder="450"
      />
    </div>
    <div class="mb-3">
      <label for="exposedness_level" class="form-label">Exposedness Level</label
      >
      <input
        id="exposedness_level"
        name="exposedness_level"
        class="form-control"
        type="number"
        min="1"
        max="5"
        placeholder="2"
      />
    </div>
    <div class="mb-3">
      <label for="TrailAdventurer_difficulty" class="form-label">
        Trail Adventurer Difficulty</label
      >
      <input
        id="TrailAdventurer_difficulty"
        name="TrailAdventurer_difficulty"
        class="form-control"
        type="number"
        placeholder="3"
      />
    </div>
    <div class="mb-3">
      <label for="dauer" class="form-label">Duration</label>
      <input
        id="dauer"
        name="dauer"
        class="form-control"
        type="text"
        placeholder="300 Minuten"
      />
    </div>
    <div class="mb-3">
      <label for="titleImage" class="form-label">Title Image</label>
      <input
        id="titleImage"
        type="file"
        class="form-control"
        accept="image/*"
        onchange={handleFileInput}
      />
      {#if $titleImage}
        <div class="mt-2">
          <img src={$titleImage} alt="Hike preview" class="img-thumbnail" />
        </div>
      {/if}
      <input type="hidden" name="titelbild" bind:value={$titleImage} />
    </div>
    <div class="mb-3">
      <label for="vertigo_safe" class="form-label">Vertigo Safe</label>
      <select id="vertigo_safe" name="vertigo_safe" class="form-control">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="starting_point" class="form-label">Starting Point</label>
      <input
        id="starting_point"
        name="starting_point"
        class="form-control"
        type="text"
        placeholder="31.6289,-7.9923"
      />
    </div>
    <div class="mb-3">
      <label for="end_point" class="form-label">End Point</label>
      <input
        id="end_point"
        name="end_point"
        class="form-control"
        type="text"
        placeholder="31.6597,-7.9785"
      />
    </div>
    <div class="mb-3">
      <label for="locations" class="form-label">Locations</label>
      <input
        id="locations"
        name="locations"
        class="form-control"
        type="text"
        placeholder="südamerika"
      />
    </div>
    <button type="submit" class="btn btn-primary">Add Hike</button>
  </form>

  {#if form?.success}
    <div class="alert alert-success mt-3">Hike created successfully!</div>
  {/if}
</div>
