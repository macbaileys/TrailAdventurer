<script>
    export let challenge;

    // Determine the progress bar classes based on the challenge status
    const getProgressBarClass = (status) => {
        return status === "achieved"
            ? "bg-success text-white sparkle-effect"
            : "bg-warning text-dark";
    };
</script>

<div class="card challenge-card shadow-lg border-0">
    <!-- Card Header -->
    <div class="card-header bg-success text-white text-center">
        <h2 class="card-title mb-0">{challenge.name}</h2>
    </div>

    <!-- Card Body -->
    <div class="card-body">
        <!-- Description -->
        <p class="card-text text-muted">{challenge.description}</p>

        <!-- Progress Section -->
        <div class="progress-container mb-3">
            <p class="fw-bold text-dark">Fortschritt:</p>
            <div class="progress" style="height: 20px;">
                <div
                    class={`progress-bar progress-bar-striped ${
                        challenge.status === "achieved"
                            ? "sparkle-effect"
                            : "progress-bar-animated"
                    } ${getProgressBarClass(challenge.status)}`}
                    role="progressbar"
                    style={`width: ${Math.min((challenge.progress / challenge.goal) * 100, 100)}%;`}
                    aria-valuenow={challenge.progress}
                    aria-valuemin="0"
                    aria-valuemax={challenge.goal}
                >
                    {Math.round(
                        Math.min(
                            (challenge.progress / challenge.goal) * 100,
                            100,
                        ),
                    )}%
                </div>
            </div>
        </div>

        <!-- Status -->
        <p class="text-dark">
            <span class="fw-bold">Status:</span>
            <span
                class={`badge ${challenge.status === "achieved" ? "bg-success" : "bg-warning text-dark"}`}
                data-bs-toggle="tooltip"
                title={challenge.status === "achieved"
                    ? "Herzlichen Glückwunsch! Herausforderung abgeschlossen."
                    : "Herausforderung läuft noch."}
            >
                {challenge.status === "achieved"
                    ? "Abgeschlossen"
                    : "In Bearbeitung"}
            </span>
        </p>

        <!-- Reward -->
        <p class="text-success">
            <strong>Belohnung:</strong>
            {challenge.reward}
        </p>
    </div>

    <!-- Card Footer: Badge Image -->
    {#if challenge.status === "achieved" && challenge.badge_image}
        <div class="card-footer text-center bg-light">
            <img
                src={challenge.badge_image}
                alt="Badge für {challenge.name}"
                class="rounded-circle shadow-lg img-fluid"
                style="max-width: 200px; max-height: 200px;"
            />
            <p class="mt-3 fw-bold text-success">Verdienter Erfolg!</p>
        </div>
    {/if}
</div>

<style>
    @import "bootstrap/dist/css/bootstrap.min.css";
    @import "../../routes/styles.css"; /* Updated path to src/routes/styles.css */
</style>
