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

<main class="main-container">
    <div class="card-wrapper">
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
            <h2>Suggested Hikes</h2>
            <div class="hikes">
                {#if $response.length > 0}
                    {#each $response as hike}
                        <div class="hike-card-wrapper">
                            <HikeCard {hike} />
                        </div>
                    {/each}
                {:else}
                    <p>Keine Wanderungen gefunden. Bitte versuche es erneut!</p>
                {/if}
            </div>
        </div>
    {/if}
</main>

<style>
    .main-container {
        background: url("/images/background.png") no-repeat center center fixed;
        background-size: cover;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: "Roboto", sans-serif;
        padding: 20px;
    }

    .card-wrapper {
        background: rgba(255, 255, 255, 0.6); /* Overall 60% transparency */
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        max-width: 600px;
        width: 100%;
        text-align: center;
        margin-bottom: 40px;
    }

    .title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 20px;
        color: #333;
    }

    .prompt-area {
        width: 100%;
        height: 100px;
        margin-bottom: 20px;
        border-radius: 10px;
        border: 1px solid #ccc;
        padding: 10px;
        font-size: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .submit-btn {
        width: 100%;
        padding: 10px;
        font-size: 1.25rem;
        border-radius: 10px;
        background-color: #28a745;
        border: none;
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .submit-btn:hover {
        background-color: #218838;
    }

    .results {
        width: 100%;
        text-align: center;
    }

    .results h2 {
        font-size: 2rem;
        margin-bottom: 20px;
        color: #333;
    }

    .hikes {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }

    .hike-card-wrapper {
        flex: 1 1 calc(33% - 20px);
        max-width: 300px;
        display: flex;
        justify-content: center;
    }

    @media (max-width: 768px) {
        .hike-card-wrapper {
            flex: 1 1 calc(50% - 20px);
        }
    }

    @media (max-width: 576px) {
        .hike-card-wrapper {
            flex: 1 1 100%;
        }
    }
</style>
