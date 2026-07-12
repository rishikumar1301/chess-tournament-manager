<script lang="ts">
	interface Props {
		open: boolean;
		title: string;
		message: string;
		onCancel: () => void;
		onConfirm: () => void;
	}

	let { open, title, message, onCancel, onConfirm }: Props = $props();
</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

		<div class="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6">

			<h2 class="text-xl font-bold text-white">
				{title}
			</h2>

			<p class="mt-4 text-zinc-400">
				{message}
			</p>

			<div class="mt-8 flex justify-end gap-3">

				<button
					type="button"
					onclick={onCancel}
					class="rounded-lg border border-zinc-700 px-5 py-2 text-zinc-300 hover:bg-zinc-800"
				>
					Cancel
				</button>

				<button
					type="button"
					onclick={onConfirm}
					class="rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-500"
				>
					Delete
				</button>

			</div>

		</div>

	</div>
{/if}