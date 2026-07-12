<script lang="ts">
	const techStack = [
		'SvelteKit',
		'TypeScript',
		'Tailwind CSS',
		'PostgreSQL',
		'Neon Database'
	];
</script>

<section class="py-24">
	<div class="mx-auto max-w-5xl px-6">

		<div
			class="rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl"
		>

			<p class="mb-3 text-center font-medium uppercase tracking-[0.3em] text-emerald-400">
				About
			</p>

			<h2 class="text-center text-4xl font-bold text-white">
				Built for Modern Chess Tournament Management
			</h2>

			<p
				class="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-zinc-400"
			>
				Chess Tournament Manager is a modern web application that
				streamlines tournament organization from start to finish.
				It enables organizers to manage players, create tournaments,
				generate random match pairings, record match results,
				and automatically calculate final rankings—all through
				a clean, responsive, and intuitive interface.
			</p>

			<div class="mt-12">

				<h3 class="mb-6 text-center text-xl font-semibold text-white">
					Built With
				</h3>

				<div class="flex flex-wrap justify-center gap-4">

					{#each techStack as tech}

						<span
							class="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-300"
						>
							{tech}
						</span>

					{/each}

				</div>

			</div>

		</div>

	</div>
</section>