<script lang="ts">
	interface Ranking {
		id: number;
		name: string;
		wins: number;
	}

	interface Props {
		rankings: Ranking[];
	}

	let { rankings }: Props = $props();
</script>

<div
	class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
>
	<div class="mb-6 flex items-center justify-between">
		<h2 class="text-2xl font-bold text-white">
			Rankings
		</h2>

		<span class="text-sm text-zinc-400">
			{rankings.length} Players
		</span>
	</div>

	{#if rankings.length === 0}

		<div class="py-10 text-center text-zinc-400">
			No rankings available.
		</div>

	{:else}

		<div class="space-y-3">

			{#each rankings as player, index}

				<div
					class="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
				>

					<div class="flex items-center gap-4">

						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-black"
						>
							{index + 1}
						</div>

						<div>

							<h3 class="font-semibold text-white">
								{player.name}
							</h3>

						</div>

					</div>

					<div class="font-semibold text-emerald-400">
						{player.wins} Wins
					</div>

				</div>

			{/each}

		</div>

	{/if}
</div>