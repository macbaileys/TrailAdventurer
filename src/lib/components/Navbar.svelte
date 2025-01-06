<script>
	export let title = "TrailAdventurer";
</script>

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+uBsiRxDqdEvhCr7FSkv5b6Ulfp9y"
	crossorigin="anonymous"
/>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">
			<img src="/videos/bonfire.gif" alt="Bonfire" class="navbar-icon" />
			{title}
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<div class="navbar-nav ms-auto gap-2">
				<a href="/hikes" class="btn btn-outline-success"
					>Alle Wanderungen</a
				>
				<a href="/challenges" class="btn btn-outline-success"
					>Herausforderungen</a
				>
				<a href="/openai_integration" class="btn btn-success ai-button"
					>Wanderung mit AI finden</a
				>
			</div>
		</div>
	</div>
</nav>

<style>
	@import "../../routes/styles.css"; /* Adjust the path as needed */
</style>
