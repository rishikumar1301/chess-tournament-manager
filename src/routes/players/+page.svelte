<script lang="ts">
    import { onMount } from "svelte";
    import PlayerTable from "$lib/components/players/PlayerTable.svelte";
    import PlayerModal from "$lib/components/players/PlayerModal.svelte";
    import type { Player } from "$lib/types/player";
    import ConfirmDialog from "$lib/components/shared/ConfirmDialog.svelte";

    let players = $state<Player[]>([]);
    let loading = $state(true);
    let showModal = $state(false);
    let selectedPlayer = $state<Player | null>(null);
    let showDeleteDialog = $state(false);
    let playerToDelete = $state<Player | null>(null);

    function openAddModal() {
        selectedPlayer = null;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
        selectedPlayer = null;
    }

    function openEditModal(player: Player) {
        selectedPlayer = player;
        showModal = true;
    }

    function handleDelete(player: Player) {
       
	playerToDelete = player;
	showDeleteDialog = true;

    }

    function closeDeleteDialog() {
	showDeleteDialog = false;
	playerToDelete = null;
}

    async function confirmDelete() {
	if (!playerToDelete) return;

	try {
		const response = await fetch(
			`/api/players/${playerToDelete.id}`,
			{
				method: 'DELETE'
			}
		);

		if (!response.ok) {
			alert('Failed to delete player');
			return;
		}

		await loadPlayers();

		showDeleteDialog = false;
		playerToDelete = null;

	} catch (err) {
		console.error(err);
	}
}

    async function handleSave(playerData: Partial<Player>) {
        try {
            let response: Response;

            if (selectedPlayer) {
                response = await fetch(`/api/players/${selectedPlayer.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(playerData),
                });
            } else {
                response = await fetch("/api/players", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(playerData),
                });
            }

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Something went wrong");
                return;
            }

            await loadPlayers();

            showModal = false;
            selectedPlayer = null;
        } catch (err) {
            console.error(err);
            alert("Failed to save player.");
        }
    }
    async function loadPlayers() {
        try {
            const res = await fetch("/api/players");

            players = await res.json();
        } catch (error) {
            console.error(error);
        } finally {
            loading = false;
        }
    }

    onMount(loadPlayers);
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
    <div class="mb-8 flex items-center justify-between">
        <div>
            <h1 class="text-4xl font-bold text-white">Players</h1>

            <p class="mt-2 text-zinc-400">Manage all tournament players.</p>
        </div>

        <button
            onclick={openAddModal}
            class="rounded-xl bg-emerald-500 px-5 py-3 font-medium text-black transition duration-300 hover:scale-105 hover:bg-emerald-400"
        >
            + Add Player
        </button>
    </div>

    {#if loading}
        <div class="py-20 text-center text-zinc-400">Loading players...</div>
    {:else}
        <PlayerTable {players} onEdit={openEditModal} onDelete={handleDelete} />
    {/if}
</div>
<PlayerModal
    open={showModal}
    player={selectedPlayer}
    onClose={closeModal}
    onSave={handleSave}
/>
<ConfirmDialog
	open={showDeleteDialog}
	title="Delete Player"
	message={`Are you sure you want to delete "${playerToDelete?.name}"?`}
	onCancel={closeDeleteDialog}
	onConfirm={confirmDelete}
/>
