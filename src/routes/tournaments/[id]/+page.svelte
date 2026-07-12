<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import TournamentMatchesCard from "$lib/components/tournaments/TournamentMatchesCard.svelte";

	import AddPlayerModal from "$lib/components/tournaments/AddPlayerModal.svelte";
	import TournamentPlayersCard from "$lib/components/tournaments/TournamentPlayersCard.svelte";

	import type { Tournament } from "$lib/types/tournament";
	import type { Player } from "$lib/types/player";
	import TournamentRankingsCard from "$lib/components/tournaments/TournamentRankingsCard.svelte";

	let tournament = $state<Tournament | null>(null);
	let players = $state<Player[]>([]);
	let matches = $state<any[]>([]);
	let rankings = $state<any[]>([]);
	let tournamentCompleted = $state(false);

	let champion = $state<{
		id: number;
		name: string;
		wins: number;
	} | null>(null);

	let loading = $state(true);

	let showAddPlayerModal = $state(false);

	async function loadTournament() {
		try {
			const res = await fetch(`/api/tournaments/${page.params.id}`);

			if (!res.ok) {
				throw new Error("Tournament not found");
			}

			tournament = await res.json();
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}

	async function loadTournamentPlayers() {
		try {
			const res = await fetch(
				`/api/tournaments/${page.params.id}/players`,
			);

			players = await res.json();
		} catch (err) {
			console.error(err);
		}
	}

	async function loadMatches() {
		try {
			const res = await fetch(
				`/api/tournaments/${page.params.id}/matches`,
			);

			matches = await res.json();
		} catch (err) {
			console.error(err);
		}
	}

	async function loadRankings() {
		try {
			const res = await fetch(
				`/api/tournaments/${page.params.id}/rankings`,
			);

			rankings = await res.json();
		} catch (err) {
			console.error(err);
		}
	}

	async function loadTournamentStatus() {
		try {
			const res = await fetch(
				`/api/tournaments/${page.params.id}/completed`,
			);

			const data = await res.json();

			tournamentCompleted = data.completed;
			champion = data.winner;
		} catch (err) {
			console.error(err);
		}
	}

	function openAddPlayerModal() {
		showAddPlayerModal = true;
	}

	function closeAddPlayerModal() {
		showAddPlayerModal = false;
	}

	async function removePlayer(player: Player) {
		try {
			const response = await fetch(
				`/api/tournaments/${page.params.id}/players`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						playerId: player.id,
					}),
				},
			);

			if (!response.ok) {
				alert("Failed to remove player");
				return;
			}

			await loadTournamentPlayers();
		} catch (err) {
			console.error(err);
		}
	}

	async function generateRound() {
		try {
			const response = await fetch(
				`/api/tournaments/${page.params.id}/generate-round`,
				{
					method: "POST",
				},
			);

			const data = await response.json();

			if (!response.ok) {
				alert(data.error || "Failed to generate round");
				return;
			}

			await loadMatches();

			alert("Round generated successfully!");
		} catch (err) {
			console.error(err);
		}
	}

	async function selectWinner(matchId: number, winnerId: number) {
		try {
			const response = await fetch(`/api/matches/${matchId}/winner`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					winnerId,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				alert(data.error || "Failed to update winner");
				return;
			}

			await loadMatches();
			await loadRankings();
			await loadTournamentStatus();
		} catch (err) {
			console.error(err);
		}
	}

	onMount(async () => {
		await loadTournament();
		await loadTournamentPlayers();
		await loadMatches();
		await loadRankings();
		await loadTournamentStatus();
	});

	function badgeClass(status: Tournament["status"]) {
		switch (status) {
			case "upcoming":
				return "bg-emerald-500/20 text-emerald-400";

			case "active":
				return "bg-yellow-500/20 text-yellow-400";

			case "completed":
				return "bg-blue-500/20 text-blue-400";
		}
	}
</script>

<div class="mx-auto max-w-7xl px-6 py-10">
	<button
		onclick={() => goto("/tournaments")}
		class="mb-6 text-sm text-zinc-400 hover:text-white"
	>
		← Back to Tournaments
	</button>

	{#if loading}
		<p class="text-zinc-400">Loading tournament...</p>
	{:else if tournament}
		<div
			class="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
		>
			<div class="flex items-start justify-between">
				<div>
					<h1 class="text-4xl font-bold text-white">
						{tournament.name}
					</h1>

					<p class="mt-2 text-zinc-400">
						Manage players, matches and rankings.
					</p>

					{#if tournamentCompleted && champion}
						<div
							class="mt-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-8 text-center backdrop-blur-xl"
						>
							<div class="text-6xl">🏆</div>

							<h2 class="mt-4 text-3xl font-bold text-yellow-400">
								Tournament Completed
							</h2>

							<p class="mt-4 text-zinc-300">
								Congratulations to the Champion
							</p>

							<h3 class="mt-4 text-4xl font-bold text-white">
								🥇 {champion.name}
							</h3>

							<p class="mt-2 text-lg text-emerald-400">
								{champion.wins} Wins
							</p>
						</div>
					{/if}

					<div class="mt-6 flex gap-4">
						<button
							onclick={openAddPlayerModal}
							class="rounded-lg bg-emerald-500 px-5 py-3 font-medium text-black transition hover:bg-emerald-400"
						>
							+ Add Player
						</button>

						<button
							onclick={generateRound}
							disabled={tournamentCompleted}
							class="rounded-lg bg-blue-500 px-5 py-3 font-medium text-white transition hover:bg-blue-400"
						>
							Generate Round
						</button>
					</div>
				</div>

				<span
					class={`rounded-full px-4 py-2 text-sm font-medium ${badgeClass(tournament.status)}`}
				>
					{tournament.status}
				</span>
			</div>
		</div>

		<div class="mt-8">
			<TournamentPlayersCard {players} onRemove={removePlayer} />
		</div>
		<div class="mt-8">
			<TournamentMatchesCard {matches} onWinnerSelect={selectWinner} />
		</div>
		<div class="mt-8">
			<TournamentRankingsCard {rankings} />
		</div>
	{/if}
</div>

{#if tournament}
	<AddPlayerModal
		open={showAddPlayerModal}
		tournamentId={tournament.id}
		onClose={closeAddPlayerModal}
		onAdded={async () => {
			closeAddPlayerModal();
			await loadTournamentPlayers();
			await loadMatches();
		}}
	/>
{/if}
