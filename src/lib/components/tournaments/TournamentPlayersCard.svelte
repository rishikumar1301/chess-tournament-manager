<script lang="ts">
	import type { Player } from "$lib/types/player";

	interface Props {
		players: Player[];
		onRemove: (player: Player) => void;
	}

	let { players, onRemove }: Props = $props();
</script>

<div class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
	<div class="mb-6 flex items-center justify-between">
		<h2 class="text-2xl font-bold text-white">Tournament Players</h2>

		<span
			class="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400"
		>
			{players.length} Players
		</span>
	</div>

	{#if players.length === 0}
		<div class="py-10 text-center text-zinc-400">No players added yet.</div>
	{:else}
		<div class="space-y-3">
			{#each players as player}
				<div
					class="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 font-bold text-black"
						>
							{player.name.charAt(0).toUpperCase()}
						</div>

						<div>
							<h3 class="font-semibold text-white">
								{player.name}
							</h3>

							<p class="text-sm text-zinc-400">
								{player.country ?? "Unknown"}
							</p>
						</div>
					</div>

					<button
						onclick={() => onRemove(player)}
						class="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/30"
					>
						Remove
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
