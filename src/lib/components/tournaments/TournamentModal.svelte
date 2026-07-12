<script lang="ts">
	import type { Tournament } from '$lib/types/tournament';

	interface Props {
		open: boolean;
		tournament: Tournament | null;
		onClose: () => void;
		onSave: (tournament: Partial<Tournament>) => void;
	}

	let { open, tournament, onClose, onSave }: Props = $props();

	let name = $state('');
	let status = $state<'upcoming' | 'active' | 'completed'>('upcoming');

	$effect(() => {
		if (tournament) {
			name = tournament.name;
			status = tournament.status;
		} else {
			name = '';
			status = 'upcoming';
		}
	});

	function handleSubmit() {
		onSave({
			name: name.trim(),
			status
		});
	}
</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

		<div class="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">

			<h2 class="mb-6 text-2xl font-bold text-white">
				{tournament ? 'Edit Tournament' : 'Create Tournament'}
			</h2>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				class="space-y-5"
			>

				<div>
					<label
						for="name"
						class="mb-2 block text-sm font-medium text-zinc-300"
					>
						Tournament Name
					</label>

					<input
						id="name"
						type="text"
						required
						bind:value={name}
						class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-emerald-400"
					/>
				</div>

				<div>
					<label
						for="status"
						class="mb-2 block text-sm font-medium text-zinc-300"
					>
						Status
					</label>

					<select
						id="status"
						bind:value={status}
						class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-emerald-400"
					>
						<option value="upcoming">Upcoming</option>
						<option value="active">Active</option>
						<option value="completed">Completed</option>
					</select>
				</div>

				<div class="flex justify-end gap-3 pt-2">

					<button
						type="button"
						onclick={onClose}
						class="rounded-lg border border-zinc-700 px-5 py-2 text-zinc-300 hover:bg-zinc-800"
					>
						Cancel
					</button>

					<button
						type="submit"
						class="rounded-lg bg-emerald-500 px-5 py-2 font-medium text-black hover:bg-emerald-400"
					>
						{tournament ? 'Update Tournament' : 'Create Tournament'}
					</button>

				</div>

			</form>

		</div>

	</div>
{/if}