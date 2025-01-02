<script>
    import HeroBanner from "$lib/components/HeroBanner.svelte";
    import { goto } from "$app/navigation";
</script>

<div class="video-container">
    <video autoplay muted loop playsinline class="background-video">
        <source src="/videos/startpage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <div class="content">
        <div class="title">Welcome to Trail Adventurer</div>
        <div class="subtitle">Discover the Ultimate Hiking Experience</div>
        <button class="cta-button" on:click={() => goto("/hikes")}>START</button
        >
    </div>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap");

    :global(body) {
        margin: 0;
        padding: 0;
        font-family: "Roboto", sans-serif;
    }

    .video-container {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .background-video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    .content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    }

    .title {
        font-size: 4rem;
        font-family: "Roboto", sans-serif;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        margin-bottom: 1rem;
    }

    .subtitle {
        font-size: 2rem;
        font-family: "Roboto", sans-serif;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        margin-bottom: 2rem;
    }

    .cta-button {
        background-color: black;
        color: white;
        padding: 1rem 3rem;
        font-size: 1.5rem;
        font-family: "Roboto", sans-serif;
        border: none;
        border-radius: 0;
        cursor: pointer;
        transition:
            transform 0.3s,
            box-shadow 0.3s;
    }

    .cta-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    }
</style>
