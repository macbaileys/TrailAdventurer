<script>
    import Navbar from "$lib/components/Navbar.svelte"; // Importiere die Navbar-Komponente
    import ChallengeCard from "$lib/components/ChallengeCard.svelte"; // Importiere die Challenge Card Komponente

    export let data; // Die geladenen Daten aus `+page.server.js`
</script>

<Navbar />
<!-- Hier wird die Navbar-Komponente eingebunden -->

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
