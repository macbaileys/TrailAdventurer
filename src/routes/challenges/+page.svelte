<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import ChallengeCard from "$lib/components/ChallengeCard.svelte";

    export let data; // Initiale Daten aus `+page.server.js`

    async function updateChallenges() {
        const response = await fetch("/api/updateChallenges", {
            method: "POST",
        });

        if (response.ok) {
            window.location.reload(); // Aktualisiert die gesamte Seite
        } else {
            console.error("Fehler beim Aktualisieren der Challenges");
        }
    }
</script>

<Navbar />

<div class="container mt-5">
    <h1 class="page-title display-4 text-success text-center">
        Herausforderungen
    </h1>
    <p class="lead text-center text-dark mb-4">
        Klicke auf den Button unten, um zu prüfen, ob du für neue Erfolge oder
        Herausforderungen berechtigt bist.
    </p>

    <!-- Update Button -->
    <div class="text-center mb-5">
        <button
            on:click={updateChallenges}
            class="btn btn-lg btn-success px-5 py-3 shadow-lg update-button"
        >
            Challenges aktualisieren
        </button>
    </div>

    <!-- Challenge List -->
    <div class="challenge-list row g-4">
        {#if data.challenges.length > 0}
            {#each data.challenges as challenge}
                <div class="col-lg-4 col-md-6">
                    <ChallengeCard {challenge} />
                </div>
            {/each}
        {:else}
            <p class="text-center text-muted fs-5">
                Es gibt momentan keine Herausforderungen.
            </p>
        {/if}
    </div>
</div>

<style>
    @import "bootstrap/dist/css/bootstrap.min.css";
    @import "../styles.css"; /* Ensure correct relative path */
</style>
