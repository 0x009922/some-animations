<script lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core';
import { computed, defineComponent, watch } from 'vue';
import { useMainStore } from '~/state/main-store';
import { animationNameToRouteName, items as animationsCatalog } from '~/catalog';
import IconArrow from '@vite-icons/uim/arrow-circle-left';
import IconMenu from '@vite-icons/ic/twotone-menu-book';
import IconEsc from '@vite-icons/mdi/keyboard-esc';
import IconHome from '@vite-icons/mdi/slash-forward';
import { useRoute } from 'vue-router';

export default defineComponent({
    components: {
        IconArrow,
        IconMenu,
        IconEsc,
        IconHome,
    },
    setup() {
        const store = useMainStore();
        const route = useRoute();

        function toggleShow() {
            store.setNavigationOpenedState(!store.isNavigationOpened.value);
        }

        const showOverlay = computed(() => store.isNavigationOpened.value);
        const viewport = computed(() => store.viewport);
        const cursorActive = computed(() => showOverlay.value);

        watch(
            () => route.name,
            () => store.setNavigationOpenedState(false),
        );

        const { Escape } = useMagicKeys();
        whenever(Escape, toggleShow);

        function afterDelay<F extends Function>(ms: number, fn: F) {
            setTimeout(fn, ms);
        }

        return {
            Escape,
            viewport,
            cursorActive,
            showOverlay,
            toggleShow,
            animationNameToRouteName,
            afterDelay,
            animationsCatalog: [...animationsCatalog].reverse(),
        };
    },
});
</script>

<template>
    <transition name="the-nav-overlay__transition">
        <div
            v-show="showOverlay"
            ref="root"
            class="the-nav-overlay fixed inset-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur"
        >
            <div class="h-full overflow-y-auto">
                <div class="mx-auto w-full max-w-2xl p-4 grid gap-2 mt-16 md:mt-0">
                    <router-link
                        v-for="(item, i) in animationsCatalog"
                        :key="i"
                        v-slot="{ navigate, isActive }"
                        custom
                        :to="{ name: animationNameToRouteName(item.name) }"
                    >
                        <div
                            tabindex="0"
                            :class="{
                                'the-nav-overlay__nav-link': true,
                                'the-nav-overlay__nav-link--active': isActive,
                            }"
                            @click="afterDelay(200, () => navigate($event))"
                            @keydown.enter.space="navigate"
                        >
                            <div class="mr-4">{{ item.order }}. {{ item.summary }}</div>

                            <transition name="the-nav-overlay__icon-transition">
                                <icon-arrow
                                    v-if="isActive"
                                    class="the-nav-overlay__icon-animation text-green-400 text-lg"
                                    title="Here you are!"
                                />
                            </transition>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </transition>

    <div class="fixed top-0 left-0 p-4 flex <sm:space-x-4 >sm:(space-x-0 space-y-4 flex-col items-start)">
        <div class="the-nav-overlay__toggle" title="Toggle nav" @click="toggleShow">
            <icon-menu />
            <icon-esc :class="{ 'mt-1': true, 'text-blue-400': Escape }" />
        </div>

        <router-link v-slot="{ navigate, isActive }" custom to="/">
            <transition name="bounce-transition">
                <div v-if="!isActive && showOverlay" title="Home" class="the-nav-overlay__home" @click="navigate">
                    <icon-home />
                </div>
            </transition>
        </router-link>
    </div>
</template>

<style lang="sass">
@keyframes the-nav-overlay__icon-animation-keyframes
    0%
        transform: translateX(0)
    100%
        transform: translateX(5px)


.the-nav-overlay
    user-select: none

    &__toggle,
    &__home
        @apply bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xl
        @apply hover:text-blue-400 cursor-pointer flex items-center

    &__toggle
        @apply space-x-2

    &__transition
        &-enter-active, &-leave-active
            transition: opacity .15s cubic-bezier(0.33, 1, 0.68, 1)
        &-enter-from, &-leave-to
            opacity: 0

    &__icon
        &-animation
            animation: the-nav-overlay__icon-animation-keyframes .2s ease alternate infinite

        &-transition
            &-enter-from, &-leave-to
                opacity: 0
                transform: scale(0.7)
            &-enter-active, &-leave-active
                transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1)

    &__nav-link
        @apply p-2 rounded flex items-center cursor-pointer
        @apply bg-gray-700 bg-opacity-40 text-white

        &--active
            @apply text-white
</style>
