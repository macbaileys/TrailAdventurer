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

<h1 class="page-title">Herausforderungen</h1>

<div class="challenge-list">
    {#if data.challenges.length > 0}
        {#each data.challenges as challenge}
            <ChallengeCard {challenge} />
        {/each}
    {:else}
        <p>Es gibt momentan keine Herausforderungen.</p>
    {/if}
</div>

<button on:click={updateChallenges}>Challenges aktualisieren</button>

<style>
    .page-title {
        text-align: center;
        margin: 2rem 0;
        font-size: 2.5rem;
        color: #4caf50;
    }

    .challenge-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
    }

    p {
        text-align: center;
        font-size: 1.2rem;
        color: #666;
    }
</style>
