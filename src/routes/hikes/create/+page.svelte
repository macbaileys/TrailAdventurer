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
        titleImage.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function calculateDifficulty(elevation_up, exposedness_level, kilometer) {
    return Math.round(
      elevation_up / 100 + exposedness_level * 2 + kilometer / 2,
    );
  }

  $effect(() => {
    vertigoSafe = exposedness_level <= 3;
  });
</script>

<Navbar />

<div class="container my-4">
  <a href="/hikes" class="btn btn-secondary mb-3">Zurück</a>
  <h1 class="mb-4 text-center">Wanderung hinzufügen</h1>
  <form method="POST" action="?/create" class="card p-4 shadow">
    <!-- Name -->
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

    <!-- Description -->
    <div class="mb-3">
      <label for="description" class="form-label">Beschreibung</label>
      <textarea
        id="description"
        name="description"
        class="form-control"
        placeholder="Beschreibung"
      ></textarea>
    </div>

    <!-- Canton -->
    <div class="mb-3">
      <label for="canton" class="form-label">Kanton</label>
      <input
        id="canton"
        name="canton"
        class="form-control"
        type="text"
        placeholder="Kanton"
      />
    </div>

    <!-- Kilometer -->
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

    <!-- Elevation Up -->
    <div class="mb-3">
      <label for="elevation_up" class="form-label">Höhenmeter Aufstieg</label>
      <input
        id="elevation_up"
        name="elevation_up"
        class="form-control"
        type="number"
        placeholder="500"
      />
    </div>

    <!-- Elevation Down -->
    <div class="mb-3">
      <label for="elevation_down" class="form-label">Höhenmeter Abstieg</label>
      <input
        id="elevation_down"
        name="elevation_down"
        class="form-control"
        type="number"
        placeholder="450"
      />
    </div>

    <!-- Exposedness Level -->
    <div class="mb-3">
      <label for="exposedness_level" class="form-label"
        >Exponiertheitslevel</label
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

    <!-- Trail Adventurer Difficulty -->
    <div class="mb-3">
      <label for="TrailAdventurer_difficulty" class="form-label"
        >Trail-Abenteurer-Schwierigkeit (berechnet)</label
      >
      <input
        id="TrailAdventurer_difficulty"
        name="TrailAdventurer_difficulty"
        class="form-control"
        type="text"
        placeholder="Automatisch berechnet"
        readonly
      />
    </div>

    <!-- Duration -->
    <div class="mb-3">
      <label for="dauer" class="form-label">Dauer</label>
      <input
        id="dauer"
        name="dauer"
        class="form-control"
        type="text"
        placeholder="300 Minuten"
      />
    </div>

    <!-- Title Image -->
    <div class="mb-3">
      <label for="titleImage" class="form-label">Titelbild</label>
      <input
        id="titleImage"
        type="file"
        class="form-control"
        accept="image/*"
        onchange={handleFileInput}
      />
      {#if $titleImage}
        <div class="mt-2">
          <img
            src={$titleImage}
            alt="Vorschau der Wanderung"
            class="img-thumbnail"
          />
        </div>
      {/if}
      <input type="hidden" name="titelbild" bind:value={$titleImage} />
    </div>

    <button type="submit" class="btn btn-success">Wanderung hinzufügen</button>
  </form>

  {#if form?.success}
    <div class="alert alert-success mt-3">
      Wanderung erfolgreich hinzugefügt!
    </div>
  {/if}
</div>
