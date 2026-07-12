<script lang="ts">
    import type { Player } from "$lib/types/player";

    interface Props {
        open: boolean;
        tournamentId: number;
        onClose: () => void;
        onAdded: () => void;
    }

    let { open, tournamentId, onClose, onAdded }: Props = $props();

    let players = $state<Player[]>([]);
    let search = $state("");
    let loading = $state(false);

    async function loadPlayers() {
        loading = true;

        try {
            const res = await fetch(
                `/api/players?tournamentId=${tournamentId}`,
            );

            players = await res.json();
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    }

    async function addPlayer(playerId: number) {
	try {
		const response = await fetch(
			`/api/tournaments/${tournamentId}/players`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ playerId })
			}
		);

		const data = await response.json();

		if (!response.ok) {
			alert(data.error || 'Failed to add player');
			return;
		}

		onAdded();
		onClose();

	} catch (err) {
		console.error(err);
		alert('Something went wrong');
	}
}

    $effect(() => {
        if (open) {
            search = "";
            loadPlayers();
        }
    });

    const filteredPlayers = $derived(
        players.filter((player) =>
            player.name.toLowerCase().includes(search.toLowerCase()),
        ),
    );
</script>

{#if open}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
        <div
            class="w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-900 p-6"
        >
            <div class="mb-6 flex items-center justify-between">
                <h2 class="text-2xl font-bold text-white">Add Player</h2>

                <button
                    onclick={onClose}
                    class="text-zinc-400 hover:text-white"
                >
                    ✕
                </button>
            </div>

            <input
                bind:value={search}
                placeholder="🔍 Search players..."
                class="mb-6 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-emerald-400"
            />

            {#if loading}
                <p class="py-8 text-center text-zinc-400">Loading players...</p>
            {:else if filteredPlayers.length === 0}
                <p class="py-8 text-center text-zinc-400">No players found.</p>
            {:else}
                <div class="max-h-96 space-y-3 overflow-y-auto">
                    {#each filteredPlayers as player}
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
                                onclick={() => addPlayer(player.id)}
                                class="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-black hover:bg-emerald-400"
                            >
                                Add
                            </button>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}
