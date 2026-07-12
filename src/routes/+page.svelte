<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import Stats from '$lib/components/home/Stats.svelte';
	import Features from '$lib/components/home/Features.svelte';
    import About from '$lib/components/home/About.svelte';
    import Footer from '$lib/components/layout/Footer.svelte';
</script>

<svelte:head>
	<title>Chess Tournament Manager</title>
	<meta
		name="description"
		content="Manage chess tournaments, players, matches and rankings."
	/>
</svelte:head>


	<Hero />
	<Stats />
	<Features />
	<About/>
	<Footer/>

