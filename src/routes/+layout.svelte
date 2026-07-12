<script lang="ts">
	import Navbar from "$lib/components/layout/Navbar.svelte";
	import "./layout.css";

	let { children } = $props();
</script>

<div
	class="min-h-screen flex flex-col bg-linear-to-b from-zinc-950 via-zinc-900 to-black text-white"
>
	<div
		class="absolute left-0 pointer-events-none top-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]"
	></div>

	<div
		class="absolute bottom-0  pointer-events-none right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[150px]"
	></div>
	<Navbar />

	<main class="flex-1">
		{@render children()}
	</main>
</div>
