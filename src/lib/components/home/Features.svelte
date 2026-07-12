<script lang="ts">
	import {
		Users,
		Trophy,
		Swords,
		Medal
	} from 'lucide-svelte';

	const features = [
		{
			title: 'Player Management',
			description:
				'Create, update, and manage player profiles with a simple CRUD interface.',
			icon: Users
		},
		{
			title: 'Tournament Management',
			description:
				'Create tournaments, manage participants, and track tournament status.',
			icon: Trophy
		},
		{
			title: 'Random Match Generator',
			description:
				'Automatically generate fair match pairings and simulate winners for each round.',
			icon: Swords
		},
		{
			title: 'Live Rankings',
			description:
				'View tournament standings and automatically determine the top 3 players.',
			icon: Medal
		}
	];
</script>

<section class="py-24">
	<div class="mx-auto max-w-7xl px-6">

		<div class="mb-16 text-center">

			<p class="mb-3 font-medium uppercase tracking-widest text-emerald-400">
				Features
			</p>

			<h2 class="text-4xl font-bold text-white">
				Everything You Need
			</h2>

			<p class="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
				A modern platform to organize chess tournaments,
				manage players, generate matches, and display rankings.
			</p>

		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

			{#each features as feature}

				{@const Icon = feature.icon}

				<div
					class="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400 "
				>

					<div
						class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500 group-hover:text-black"
					>

						<Icon size={28} />

					</div>

					<h3 class="mb-4 text-xl font-semibold text-white">
						{feature.title}
					</h3>

					<p class="leading-7 text-zinc-400">
						{feature.description}
					</p>

				</div>

			{/each}

		</div>

	</div>
</section>