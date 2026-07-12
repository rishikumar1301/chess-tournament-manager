<script lang="ts">
    import { Pencil, Trash2 } from "lucide-svelte";
    import type { Player } from "$lib/types/player";

    let {
        players,
        onEdit,
        onDelete,
    }: {
        players: Player[];
        onEdit: (player: Player) => void;
        onDelete: (player: Player) => void;
    } = $props();
</script>

<div
    class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
>
    <table class="w-full">
        <thead class="border-b border-white/10 bg-white/5">
            <tr>
                <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300"
                >
                    Name
                </th>

                <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300"
                >
                    Email
                </th>

                <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300"
                >
                    Country
                </th>

                <th
                    class="px-6 py-4 text-center text-sm font-semibold text-zinc-300"
                >
                    Actions
                </th>
            </tr>
        </thead>

        <tbody>
            {#if players.length === 0}
                <tr>
                    <td
                        colspan="4"
                        class="px-6 py-10 text-center text-zinc-400"
                    >
                        No players found.
                    </td>
                </tr>
            {:else}
                {#each players as player}
                    <tr class="border-b border-white/5 hover:bg-white/5">
                        <td class="px-6 py-4 font-medium text-white">
                            {player.name}
                        </td>

                        <td class="px-6 py-4 text-zinc-300">
                            {player.email}
                        </td>

                        <td class="px-6 py-4 text-zinc-300">
                            {player.country ?? "-"}
                        </td>

                        <td class="px-6 py-4">
                            <div class="flex justify-center gap-3">
                                <button
                                onclick={()=>onEdit(player)}
                                    class="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                onclick={()=>onDelete(player)}
                                    class="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
