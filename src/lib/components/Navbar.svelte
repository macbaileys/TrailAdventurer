<script>
	export let title = "TrailAdventurer";
</script>

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+uBsiRxDqdEvhCr7FSkv5b6Ulfp9y"
	crossorigin="anonymous"
/>

<nav class="navbar navbar-expand-lg">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">
			<img
				src="/videos/bonfire.gif"
				alt="Bonfire"
				style="width: 40px; height: 40px; margin-right: 10px;"
			/>
			{title}
		</a>
		<div class="d-flex gap-2">
			<button
				class="btn"
				on:click={() => (window.location.href = "/hikes")}
				>Alle Wanderungen</button
			>
			<button
				class="btn"
				on:click={() => (window.location.href = "/challenges")}
				>Herausforderungen</button
			>
			<button
				class="btn ai-button"
				on:click={() => (window.location.href = "/openai_integration")}
				>Wanderung mit AI finden</button
			>
		</div>
	</div>
</nav>

<style>
	.navbar {
		background-color: #000;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.navbar-brand {
		font-size: 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: #4caf50 !important;
		display: flex;
		align-items: center;
	}

	.btn {
		background-color: white;
		color: #4caf50;
		border: none;
		padding: 0.5rem 1.5rem;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: bold;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.btn:hover {
		background-color: #45a049;
		color: white;
	}

	.ai-button {
		background-color: #4caf50;
		color: white;
	}

	.ai-button:hover {
		background-color: #45a049;
		color: white;
	}
</style>
