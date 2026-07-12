<script lang="ts">
</script>

<section class="relative overflow-hidden">
	<div class="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]"></div>

	<div class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[150px]"></div>

	<div class="relative mx-auto max-w-7xl px-6 py-24 text-center">

		<div
			class="mb-8 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300"
		>
			♟ Built with SvelteKit + PostgreSQL
		</div>

		<h1 class="mx-auto max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-7xl">
			Chess Tournament
			<span class="text-emerald-400">Management System</span>
		</h1>

		<p class="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
			Create tournaments, manage players, generate random matches,
			and track rankings — all from one modern dashboard.
		</p>

		<div class="mt-12 flex justify-center gap-4">

			<a
				href="/players"
				class="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-emerald-400"
			>
				Manage Players
			</a>

			<a
				href="/tournaments"
				class="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
			>
				View Tournaments
			</a>

		</div>

	</div>
</section>