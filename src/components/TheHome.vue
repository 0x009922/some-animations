<script lang="ts">
import { defineComponent } from 'vue';
import { useMainStore } from '~/state/main-store';
import IconGithub from '@vite-icons/line-md/github-twotone';
import IconEscape from '@vite-icons/mdi/keyboard-esc';
import AnimatedCursor from './AnimatedCursor';

const GITHUB_LINK = import.meta.env.VITE_GITHUB_LINK!;
const GITHUB_REPO_NAME = import.meta.env.VITE_GITHUB_REPO_NAME!;

export default defineComponent({
    name: 'TheHome',
    components: {
        IconGithub,
        AnimatedCursor,
        IconEscape,
    },
    setup() {
        const store = useMainStore();

        const openNav = () => store.setNavigationOpenedState(true);

        return {
            openNav,
            GITHUB_LINK,
            GITHUB_REPO_NAME,
            store,
        };
    },
});
</script>

<template>
    <div class="home-container">
        <div class="space-y-4 max-w-md w-full select-none">
            <h1 class="sm:text-6xl text-2xl">Compendium</h1>

            <p>
                This is the compendium of some of my animations.
                <br />
                To open catalog, press
                <span class="esc-key-code" @click="openNav">
                    <icon-escape class="inline-block" />
                </span>
                or click on the icon in the top left corner of your screen.
            </p>

            <p>
                <a :href="GITHUB_LINK" class="underline hover:text-blue-300 flex items-center">
                    <icon-github class="inline-block mr-1" />

                    <span>{{ GITHUB_REPO_NAME }}</span>
                </a>
            </p>
        </div>

        <animated-cursor
            :viewport="store.viewport"
            :active="!store.isNavigationOpened.value"
            :loop-only-on-active="false"
        />
    </div>
</template>

<style scoped lang="sass">
a
    cursor: none

.home-container
    @apply h-screen w-screen flex items-center justify-center bg-gray-700 text-white
    @apply overflow-hidden relative p-4
    cursor: none

.esc-key-code
    @apply inline-flex items-center relative
    top: 4px
    @apply text-white bg-gray-700 border rounded px-1
</style>
