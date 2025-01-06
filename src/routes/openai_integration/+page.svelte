<script>
    import { writable } from "svelte/store";
    import Navbar from "$lib/components/Navbar.svelte";
    import HikeCard from "$lib/components/HikeCard.svelte";

    let userInput = "";
    let response = writable(null);
    let loading = writable(false);

    async function getHike() {
        loading.set(true);
        response.set(null);
        try {
            const res = await fetch("/openai_integration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: userInput }),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch hikes");
            }

            const data = await res.json();
            response.set(data.hikes);
        } catch (error) {
            console.error("Error fetching hike:", error);
        } finally {
            loading.set(false);
        }
    }
</script>

<Navbar />

<main class="container-fluid main-container">
    <div class="card card-wrapper shadow-lg">
        <h1 class="title">Finde deinen Hike mit AI</h1>
        <textarea
            bind:value={userInput}
            class="form-control prompt-area"
            placeholder="TrailAdventurer nutzt die API von OpenAI GPT-4, um dir bei der Suche nach Wanderwegen zu helfen. Beschreibe deine Wanderung möglichst genau mit Ort, Kanton, Schwierigkeitslevel, Distanz, etc."
        ></textarea>
        <button
            class="btn btn-success btn-lg submit-btn"
            on:click={getHike}
            disabled={$loading}
        >
            {#if $loading}lädt Wanderwege...{/if}
            {#if !$loading}Suchen{/if}
        </button>
    </div>

    {#if $response}
        <div class="results">
            <h2 class="results-title">Vorgeschlagene Wanderungen</h2>
            <div class="hikes row g-4">
                {#if $response.length > 0}
                    {#each $response as hike}
                        <div class="col-md-6 col-lg-4">
                            <HikeCard {hike} />
                        </div>
                    {/each}
                {:else}
                    <p class="text-muted fs-5">
                        Keine Wanderungen gefunden. Bitte versuche es erneut!
                    </p>
                {/if}
            </div>
        </div>
    {/if}
</main>

<style>
    @import "bootstrap/dist/css/bootstrap.min.css";
    @import "../styles.css"; /* Ensure correct path */
</style>
