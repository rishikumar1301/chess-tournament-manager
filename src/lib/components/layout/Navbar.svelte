<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ name: 'Players', href: '/players' },
		{ name: 'Tournaments', href: '/tournaments' }
	];
</script>

<nav class="sticky top-0 z-50  border-b border-white/10
bg-gray-100 backdrop-blur-xl">
	<div class=" mx-auto flex h-16  items-center justify-between px-10">
		<div class="flex items-center gap-2">
			<span class="text-3xl text-black">♟</span>

			<h1 class="text-lg font-bold text-emerald-400">
				Chess Tournament Manager
			</h1>
		</div>

		<div class="flex gap-6">
			{#each links as link}
				<a
					href={link.href}
					class={`font-medium transition ${
						page.url.pathname.startsWith(link.href)
							? 'text-emerald-400 text-2xl'
							: 'text-zinc-300 text-2xl hover:text-white'
					}`}
				>
					{link.name}
				</a>
			{/each}
		</div>
	</div>
</nav>