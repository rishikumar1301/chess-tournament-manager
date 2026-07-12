<script lang="ts">
    import { goto } from "$app/navigation";
    import { Pencil, Trash2 } from "lucide-svelte";
    import type { Tournament } from "$lib/types/tournament";
    
    interface Props {
        tournaments: Tournament[];
        onEdit: (tournament: Tournament) => void;
        onDelete: (tournament: Tournament) => void;
    }

    let { tournaments, onEdit, onDelete }: Props = $props();
   

    


    function badgeClass(status: Tournament["status"]) {
        switch (status) {
            case "upcoming":
                return "bg-emerald-500/20 text-emerald-400";

            case "active":
                return "bg-yellow-500/20 text-yellow-400";

            case "completed":
                return "bg-blue-500/20 text-blue-400";

            default:
                return "bg-zinc-700 text-zinc-300";
        }
    }

    function formatStatus(status: Tournament["status"]) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
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
                    Status
                </th>

                <th
                    class="px-6 py-4 text-center text-sm font-semibold text-zinc-300"
                >
                    Actions
                </th>
            </tr>
        </thead>

        <tbody>
            {#if tournaments.length === 0}
                <tr>
                    <td
                        colspan="3"
                        class="px-6 py-10 text-center text-zinc-400"
                    >
                        No tournaments found.
                    </td>
                </tr>
            {:else}
                {#each tournaments as tournament}
                    <tr
                        class="cursor-pointer border-b border-white/5 transition hover:bg-white/5"
                        onclick={() => goto(`/tournaments/${tournament.id}`)}
                    >
                        <td class="px-6 py-4">
                            <div class="font-medium text-white">
                                {tournament.name}
                            </div>
                        </td>

                        <td class="px-6 py-4">
                            <span
                                class={`rounded-full px-3 py-1 text-sm font-medium ${badgeClass(tournament.status)}`}
                            >
                                {formatStatus(tournament.status)}
                            </span>
                        </td>

                        <td class="px-6 py-4">
                            <div class="flex justify-center gap-3">
                                <button
                                    onclick={(e) => {
                                        e.stopPropagation();
                                        onEdit(tournament);
                                    }}
                                    class="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                    onclick={(e) => {
                                        e.stopPropagation();
                                        onDelete(tournament);
                                    }}
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
