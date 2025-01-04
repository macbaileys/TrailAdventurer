<script>
    export let challenge;
</script>

<div class="challenge-card">
    <div class="challenge-details">
        <div class="name">
            <h2>{challenge.name}</h2>
        </div>
        <div class="description">
            <p>{challenge.description}</p>
        </div>
        <div class="progress-container">
            <p>Fortschritt: {challenge.progress}/{challenge.goal}</p>
            <progress max={challenge.goal} value={challenge.progress}
            ></progress>
        </div>
        <div class="status">
            <p>
                Status: {challenge.status === "achieved"
                    ? "Abgeschlossen"
                    : "In Bearbeitung"}
            </p>
        </div>
        <div class="reward">
            <p>Belohnung: {challenge.reward}</p>
        </div>
    </div>
</div>

<style>
    .challenge-card {
        border: 2px solid #2196f3;
        height: 100%;
        background-color: #f3f4f6;
        color: #333;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        margin-bottom: 1rem;
    }
    .challenge-details {
        padding: 1em;
    }
    .name h2 {
        color: #1e88e5;
        font-size: 1.5em;
        margin-bottom: 0.5rem;
    }
    .description p {
        font-size: 1em;
        color: #666;
        margin-bottom: 1rem;
    }
    .progress-container {
        margin-bottom: 1rem;
    }
    progress {
        width: 100%;
        height: 20px;
        border: none;
        background: #e0e0e0;
        border-radius: 10px;
    }
    progress::-webkit-progress-bar {
        background-color: #e0e0e0;
        border-radius: 10px;
    }
    progress::-webkit-progress-value {
        background-color: #4caf50;
        border-radius: 10px;
    }
    .status p,
    .reward p {
        font-size: 1em;
        color: #444;
    }
</style>
