<script lang="ts">
	import type { Player } from '$lib/types/player';

	interface Props {
		open: boolean;
		player: Player | null;
		onClose: () => void;
		onSave: (player: Partial<Player>) => void;
	}

	let { open, player, onClose, onSave }: Props = $props();

	let name = $state('');
	let email = $state('');
	let country = $state('');

	$effect(() => {
		if (player) {
			name = player.name;
			email = player.email;
			country = player.country ?? '';
		} else {
			name = '';
			email = '';
			country = '';
		}
	});

	function handleSubmit() {
		onSave({
			name: name.trim(),
			email: email.trim(),
			country: country.trim()
		});
	}
</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
		<div class="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">

			<h2 class="mb-6 text-2xl font-bold text-white">
				{player ? 'Edit Player' : 'Add Player'}
			</h2>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				class="space-y-5"
			>

				<div>
					<label for="name" class="mb-2 block text-sm font-medium text-zinc-300">
						Name
					</label>

					<input
						id="name"
						type="text"
						bind:value={name}
						required
						autocomplete="name"
						class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
					/>
				</div>

				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-zinc-300">
						Email
					</label>

					<input
						id="email"
						type="email"
						bind:value={email}
						required
						autocomplete="email"
						class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
					/>
				</div>

				<div>
					<label for="country" class="mb-2 block text-sm font-medium text-zinc-300">
						Country
					</label>

					<input
						id="country"
						type="text"
						bind:value={country}
						autocomplete="country-name"
						class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
					/>
				</div>

				<div class="flex justify-end gap-3 pt-2">

					<button
						type="button"
						onclick={onClose}
						class="rounded-lg border border-zinc-700 px-5 py-2 text-zinc-300 transition hover:bg-zinc-800"
					>
						Cancel
					</button>

					<button
						type="submit"
						class="rounded-lg bg-emerald-500 px-5 py-2 font-medium text-black transition hover:bg-emerald-400"
					>
						{player ? 'Update Player' : 'Save Player'}
					</button>

				</div>

			</form>

		</div>
	</div>
{/if}