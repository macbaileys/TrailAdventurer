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
</script>

<Navbar />

<div class="container my-5">
  <a href="/hikes" class="btn btn-primary mb-3 shadow"> ← Zurück </a>
  <div class="card shadow-lg border-success">
    <div class="card-header bg-success text-white text-center">
      <h2>Wanderung hinzufügen</h2>
    </div>
    <div class="card-body">
      <form method="POST" action="?/create" class="needs-validation" novalidate>
        <!-- Name -->
        <div class="mb-3">
          <label for="wanderung" class="form-label">Name</label>
          <input
            id="wanderung"
            name="wanderung"
            class="form-control"
            type="text"
            placeholder="Name der Wanderung"
            required
          />
          <div class="invalid-feedback">Bitte einen Namen eingeben.</div>
        </div>

        <!-- Description -->
        <div class="mb-3">
          <label for="description" class="form-label">Beschreibung</label>
          <textarea
            id="description"
            name="description"
            class="form-control"
            placeholder="Kurze Beschreibung der Wanderung"
            rows="3"
            required
          ></textarea>
          <div class="invalid-feedback">Bitte eine Beschreibung eingeben.</div>
        </div>

        <!-- Canton -->
        <div class="row g-3">
          <div class="col-md-6">
            <label for="canton" class="form-label">Kanton</label>
            <input
              id="canton"
              name="canton"
              class="form-control"
              type="text"
              placeholder="z.B. Zürich"
              required
            />
            <div class="invalid-feedback">Bitte einen Kanton eingeben.</div>
          </div>

          <!-- Kilometer -->
          <div class="col-md-6">
            <label for="kilometer" class="form-label">Kilometer</label>
            <input
              id="kilometer"
              name="kilometer"
              class="form-control"
              type="number"
              step="0.1"
              placeholder="z.B. 12.5"
              required
            />
            <div class="invalid-feedback">
              Bitte die Kilometeranzahl eingeben.
            </div>
          </div>
        </div>

        <!-- Elevation -->
        <div class="row g-3 mt-3">
          <div class="col-md-6">
            <label for="elevation_up" class="form-label"
              >Höhenmeter Aufstieg</label
            >
            <input
              id="elevation_up"
              name="elevation_up"
              class="form-control"
              type="number"
              placeholder="z.B. 500"
              required
            />
            <div class="invalid-feedback">Bitte die Höhenmeter eingeben.</div>
          </div>
          <div class="col-md-6">
            <label for="elevation_down" class="form-label"
              >Höhenmeter Abstieg</label
            >
            <input
              id="elevation_down"
              name="elevation_down"
              class="form-control"
              type="number"
              placeholder="z.B. 450"
              required
            />
            <div class="invalid-feedback">Bitte die Höhenmeter eingeben.</div>
          </div>
        </div>

        <!-- Exposedness Level -->
        <div class="mb-3 mt-3">
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
            placeholder="z.B. 3"
            required
          />
          <div class="invalid-feedback">
            Bitte einen Wert zwischen 1 und 5 eingeben.
          </div>
        </div>

        <!-- Difficulty -->
        <div class="mb-3">
          <label for="TrailAdventurer_difficulty" class="form-label"
            >Schwierigkeit (berechnet)</label
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
            placeholder="z.B. 300 Minuten"
            required
          />
          <div class="invalid-feedback">Bitte eine Dauer angeben.</div>
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
            <div class="mt-3">
              <img
                src={$titleImage}
                alt="Vorschau der Wanderung"
                class="img-thumbnail"
              />
            </div>
          {/if}
          <input type="hidden" name="titelbild" bind:value={$titleImage} />
        </div>

        <button type="submit" class="btn btn-success w-100 mt-3">
          Wanderung hinzufügen
        </button>
      </form>

      {#if form?.success}
        <div class="alert alert-success mt-3 text-center">
          Wanderung erfolgreich hinzugefügt!
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  @import "bootstrap/dist/css/bootstrap.min.css";
  @import "../../styles.css"; /* Adjust path if needed */
</style>
