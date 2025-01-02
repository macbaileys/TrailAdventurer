<script>
	export let title = 'TrailAdventurer';
	export let subtitle = 'Entdecke die schönsten Wanderwege und erlebe die Natur hautnah!';
	export let backgroundUrl = 'https://source.unsplash.com/1920x1080/?hiking,adventure';
</script>

<div
	class="hero-banner position-relative text-center"
	style="background: url({backgroundUrl}) no-repeat center center / cover; height: 60vh; display: flex; align-items: center; justify-content: center; color: white;"
>
	<!-- Halbtransparente Overlay -->
	<div
		class="position-absolute w-100 h-100 bg-gradient"
		style="background: rgba(0, 0, 0, 0.6);"
	></div>

	<!-- Text -->
	<div class="text-container position-relative text-center">
		<h1
			class="display-3 fw-bold text-uppercase"
			style="text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);"
		>
			{title}
		</h1>
		<p
			class="fs-4 mt-3"
			style="max-width: 600px; margin: 0 auto; text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);"
		>
			{subtitle}
		</p>
		<a
			href="/paths"
			class="btn btn-success btn-lg mt-4 px-5 py-3 shadow-sm"
			style="border-radius: 30px; font-size: 1.2rem;"
		>
			Wanderwege entdecken
		</a>
	</div>
</div>

<style>
	.hero-banner {
		position: relative;
		font-family: 'Roboto', sans-serif;
	}

	.bg-gradient {
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
	}

	.text-container {
		z-index: 10;
	}

	.btn-success:hover {
		background-color: #218838;
		box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
	}
</style>
