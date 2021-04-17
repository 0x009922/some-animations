<script lang="ts">
import { defineComponent } from 'vue';
import { useMainStore } from '~/state/main-store';
import IconGithub from '@vite-icons/line-md/github-twotone';

const GITHUB_LINK = import.meta.env.VITE_GITHUB_LINK;
const GITHUB_REPO_NAME = import.meta.env.VITE_GITHUB_REPO_NAME;

export default defineComponent({
    name: 'TheHome',
    components: {
        IconGithub,
    },
    setup() {
        const store = useMainStore();

        const openNav = () => store.setNavigationOpenedState(true);

        return {
            openNav,
            GITHUB_LINK,
            GITHUB_REPO_NAME,
        };
    },
});
</script>

<template>
    <div class="h-screen flex items-center justify-center">
        <div class="space-y-4 max-w-md select-none">
            <h1 class="text-6xl">Compendium</h1>

            <p>
                This is the compendium of some of my animations.
                <br />
                To open catalog, press
                <span class="esc-key-code" @click="openNav">ESC</span>
                or click on the icon in the top left corner of your screen.
            </p>

            <p>
                <a :href="GITHUB_LINK" class="underline hover:text-blue-500 flex items-center">
                    <icon-github class="inline-block mr-1" />

                    <span>{{ GITHUB_REPO_NAME }}</span>
                </a>
            </p>
        </div>
    </div>
</template>

<style scoped lang="sass">
.esc-key-code
    @apply bg-gray-100 border rounded px-1 hover:shadow-lg cursor-pointer transition
</style>
