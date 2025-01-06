<script>
    import { goto } from "$app/navigation";
    import { onMount, onDestroy } from "svelte";

    let tooltipInstances = [];

    // Initialize tooltips on mount
    onMount(() => {
        const tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]'),
        );
        tooltipInstances = tooltipTriggerList.map(
            (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
        );
    });

    // Cleanup tooltips on destroy
    onDestroy(() => {
        tooltipInstances.forEach((tooltip) => tooltip.dispose());
        tooltipInstances = [];
    });
</script>

<div class="video-container">
    <!-- Background Video -->
    <video autoplay muted loop playsinline class="background-video">
        <source src="/videos/startpage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>

    <!-- Content Overlay -->
    <div class="content">
        <h1 class="title">Willkommen bei Trail Adventurer</h1>
        <h2 class="subtitle">Dein interaktives Wanderabenteuer</h2>
        <button
            class="cta-button"
            on:click={() => goto("/hikes")}
            data-bs-toggle="tooltip"
            title="Starte dein Abenteuer"
        >
            START
        </button>
    </div>
</div>

<style>
    @import "bootstrap/dist/css/bootstrap.min.css";
    @import "./styles.css"; /* Ensure this path matches your file structure */
</style>
