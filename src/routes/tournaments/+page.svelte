<script lang="ts">
    import { onMount } from "svelte";

    import TournamentTable from "$lib/components/tournaments/TournamentTable.svelte";
    import TournamentModal from "$lib/components/tournaments/TournamentModal.svelte";
    import ConfirmDialog from "$lib/components/shared/ConfirmDialog.svelte";

    import type { Tournament } from "$lib/types/tournament";

    let tournaments = $state<Tournament[]>([]);
    let loading = $state(true);

    let showModal = $state(false);
    let selectedTournament = $state<Tournament | null>(null);

    let showDeleteDialog = $state(false);
    let tournamentToDelete = $state<Tournament | null>(null);

    async function loadTournaments() {
        try {
            loading = true;

            const res = await fetch("/api/tournaments");
            tournaments = await res.json();
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    }

    function openAddModal() {
        selectedTournament = null;
        showModal = true;
    }

    function openEditModal(tournament: Tournament) {
        selectedTournament = tournament;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
        selectedTournament = null;
    }

    function handleDelete(tournament: Tournament) {
        tournamentToDelete = tournament;
        showDeleteDialog = true;
    }

    function closeDeleteDialog() {
        showDeleteDialog = false;
        tournamentToDelete = null;
    }

    async function confirmDelete() {
        if (!tournamentToDelete) return;

        try {
            const response = await fetch(
                `/api/tournaments/${tournamentToDelete.id}`,
                {
                    method: "DELETE",
                },
            );

            if (!response.ok) {
                const data = await response.json();
                alert(data.error || "Failed to delete tournament");
                return;
            }

            await loadTournaments();

            closeDeleteDialog();
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    }

    async function handleSave(tournamentData: Partial<Tournament>) {
        try {
            let response: Response;

            if (selectedTournament) {
                response = await fetch(
                    `/api/tournaments/${selectedTournament.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(tournamentData),
                    },
                );
            } else {
                response = await fetch("/api/tournaments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(tournamentData),
                });
            }

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Something went wrong");
                return;
            }

            await loadTournaments();

            closeModal();
        } catch (err) {
            console.error(err);
            alert("Failed to save tournament.");
        }
    }

    onMount(loadTournaments);
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-4xl font-bold text-white">Tournaments</h1>

            <p class="mt-2 text-zinc-400">Manage chess tournaments.</p>
        </div>

        <button
            onclick={openAddModal}
            class="rounded-xl bg-emerald-500 px-5 py-3 font-medium text-black transition hover:scale-105 hover:bg-emerald-400"
        >
            + Create Tournament
        </button>
    </div>

    {#if loading}
        <div class="py-20 text-center text-zinc-400">
            Loading tournaments...
        </div>
    {:else}
        <TournamentTable
            {tournaments}
            onEdit={openEditModal}
            onDelete={handleDelete}
        />
    {/if}
</div>

<TournamentModal
    open={showModal}
    tournament={selectedTournament}
    onClose={closeModal}
    onSave={handleSave}
/>

<ConfirmDialog
    open={showDeleteDialog}
    title="Delete Tournament"
    message={`Delete "${tournamentToDelete?.name ?? ""}"?`}
    onCancel={closeDeleteDialog}
    onConfirm={confirmDelete}
/>
