<script lang="ts">
    import { Users, Trophy, Swords, Medal } from "lucide-svelte";

    const stats = [
        {
            icon: Users,
            value: "128+",
            label: "Players",
        },
        {
            icon: Trophy,
            value: "16",
            label: "Tournaments",
        },
        {
            icon: Swords,
            value: "240",
            label: "Matches",
        },
        {
            icon: Medal,
            value: "16",
            label: "Champions",
        },
    ];
</script>

<section class="-mt-12 relative z-10 pb-20">
    <div class="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-4">
        {#each stats as stat}
            {@const Icon = stat.icon}

            <div
                class="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-400"
            >
                <Icon size={34} class="mx-auto mb-5 text-emerald-400" />

                <h3 class="text-4xl font-bold text-white">
                    {stat.value}
                </h3>

                <p class="mt-2 text-zinc-400">
                    {stat.label}
                </p>
            </div>
        {/each}
    </div>
</section>
