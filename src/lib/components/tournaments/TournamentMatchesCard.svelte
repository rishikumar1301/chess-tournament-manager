<script lang="ts">
    interface Match {
        id: number;
        round: number;
        player1_id: number;
        player1_name: string;
        player2_id: number | null;
        player2_name: string | null;
        winner_id: number | null;
    }

    interface Props {
        matches: Match[];
        onWinnerSelect: (matchId: number, winnerId: number) => void;
    }

    let { matches, onWinnerSelect }: Props = $props();
</script>

<div class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
    <h2 class="mb-6 text-2xl font-bold text-white">Current Matches</h2>

    {#if matches.length === 0}
        <div class="py-10 text-center text-zinc-400">
            No matches generated yet.
        </div>
    {:else}
        <div class="space-y-6">
            {#each matches as match}
                <div class="rounded-xl border border-white/10 bg-white/5 p-5">
                    <div class="mb-4 text-sm font-semibold text-emerald-400">
                        Round {match.round}
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="font-medium text-white">
                                {match.player1_name}
                            </div>

                            <div class="text-zinc-500">VS</div>

                            <div class="font-medium text-white">
                                {match.player2_name ?? "BYE"}
                            </div>
                        </div>

                        {#if match.winner_id === null && match.player2_id}
                            <div class="flex gap-3">
                                <button
                                    onclick={() =>
                                        onWinnerSelect(
                                            match.id,
                                            match.player1_id,
                                        )}
                                    class="flex-1 rounded-lg bg-emerald-500 px-4 py-2 font-medium text-black hover:bg-emerald-400"
                                >
                                    🏆 {match.player1_name}
                                </button>

                                <button
                                    onclick={() =>
                                        onWinnerSelect(
                                            match.id,
                                            match.player2_id!,
                                        )}
                                    class="flex-1 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-400"
                                >
                                    🏆 {match.player2_name}
                                </button>
                            </div>
                        {:else if match.player2_id === null}
                            <p class="text-sm text-emerald-400">
                                Bye - Automatic Win
                            </p>
                        {:else}
                            <p class="text-sm font-medium text-emerald-400">
                                🏆 Winner:
                                {match.winner_id === match.player1_id
                                    ? match.player1_name
                                    : match.player2_name}
                            </p>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
