<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-white/10  bg-transparent py-12">
	<div class="mx-auto max-w-5xl px-6">
		<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
			<p class="text-center text-zinc-400">
				&copy; {currentYear} Chess Tournament Manager. All rights reserved.
			</p>
            <p class="text-center text-zinc-400">Designed & Developed by Rishi Kumar</p>
			<div class="flex gap-6">
				<a
					href="https://github.com/chess-tournament-manager"
					target="_blank"
					class="text-zinc-400 hover:text-emerald-400"
				>
					GitHub
				</a>
				<a
					href="https://twitter.com/chess_tournament"
					target="_blank"
					class="text-zinc-400 hover:text-emerald-400"
				>
					Twitter
				</a>
			</div>
		</div>
	</div>
</footer>