<script lang="ts">
// import { mapState, mapMutations } from 'vuex';
// import GlobalEvents from 'vue-global-events';

import { defineComponent, onBeforeUnmount } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { animationNameToRouteName, items as catalogItems } from '../catalog';
import { useMainStore } from '../state/main-store';
import TheNavigationItem from './TheNavigationItem.vue';

// import Tile from './TheNavigationTile';
// import TileTransition from './TheNavigationTileTransition';
// import animations from '@/animations';
// import animationsCategories from '@/animations/categories';

function useKeyPress(params: { handler: () => unknown }) {
    function listener(e: KeyboardEvent) {
        // console.log(e.key, e.isComposing, );
        if (e.shiftKey && !e.repeat && e.key === 'K') {
            params.handler();
        }
    }

    const eventName = 'keypress';

    window.addEventListener(eventName, listener);
    onBeforeUnmount(() => {
        window.removeEventListener(eventName, listener);
    });
}

export default defineComponent({
    name: 'TheNavigation',
    components: { TheNavigationItem },
    setup() {
        const { isNavigationOpened, setNavigationOpenedState } = useMainStore();

        function close() {
            setNavigationOpenedState(false);
        }

        function open() {
            setNavigationOpenedState(true);
        }

        useKeyPress({
            handler: () => {
                setNavigationOpenedState(!isNavigationOpened.value);
            },
        });

        const items: {
            title: string;
            to: RouteLocationRaw;
        }[] = catalogItems.map((x) => ({
            title: x.summary,
            to: {
                name: animationNameToRouteName(x.name),
            },
        }));

        return {
            isNavigationOpened,
            close,
            open,
            items,
        };
    },
    // components: {
    //     Tile,
    //     GlobalEvents,
    //     TileTransition,
    // },
    // data: () => ({
    //     categories: animationsCategories,
    // }),
    // computed: {
    //     ...mapState(['isNavigating', 'isForcePaused']),
    //     categorizedAnimations() {
    //         const groups = animations.reduce((prev, val) => {
    //             const cat = val.category || null;

    //             if (prev.has(cat)) {
    //                 prev.get(cat).push(val);
    //             } else {
    //                 prev.set(cat, [val]);
    //             }

    //             return prev;
    //         }, new Map());

    //         return [...groups];
    //     },
    // },
    // watch: {
    //     $route() {
    //         this.hideNavigation();
    //         if (this.isForcePaused) {
    //             this.resume();
    //         }
    //     },
    // },
    // methods: {
    //     ...mapMutations(['showNavigation', 'hideNavigation', 'toggleNavigation', 'resume']),
    // },
});
</script>

<template>
    <div v-show="isNavigationOpened" class="fixed inset-0 bg-black opacity-5 z-40" @click="close" />

    <div v-show="isNavigationOpened" class="fixed top-0 left-0 bottom-0 z-50 p-8">
        <div class="max-w-xs w-screen h-full border border-gray-300 rounded bg-white bg-opacity-90">
            <div class="text-xl p-4">Каталог</div>

            <div>
                <the-navigation-item :to="{ name: 'home' }" title="Домашняя страница" />

                <template v-for="{ title, to } in items">
                    <the-navigation-item v-bind="{ to, title }" />
                </template>
            </div>
        </div>
    </div>

    <div
        v-show="!isNavigationOpened"
        class="fixed top-0 left-0 bg-white z-50 text-xs p-1 rounded-br cursor-pointer select-none shadow"
        @click="open"
    >
        Каталог
        <span class="opacity-50 ml-2">Shift + K</span>
    </div>

    <!-- <div class="the-navigation">
        <transition name="the-navigation__background-transition" :duration="{ leave: 1100 }">
            <div v-if="isNavigating" v-sparks="'light'" class="the-navigation__background" />
        </transition>

        <div
            v-sparks="'light'"
            class="the-navigation__content"
            :class="{
                'the-navigation__content--enable-pointer-events': isNavigating,
            }"
        >
            <div class="the-navigation__tiles-grid">
                <template v-for="[category, items] in categorizedAnimations">
                    <tile-transition :key="`category-${category}`">
                        <div
                            v-if="isNavigating"
                            class="the-navigation__tiles-category"
                            :class="{
                                'the-navigation__tiles-category--empty': !category,
                            }"
                        >
                            <template v-if="category in categories">
                                {{ categories[category].title }}
                            </template>
                        </div>
                    </tile-transition>

                    <template v-for="(item, i) in items">
                        <tile-transition :key="`${category}-${i}`">
                            <div v-if="isNavigating">
                                <tile :animation="item" />
                            </div>
                        </tile-transition>
                    </template>
                </template>
            </div>
        </div>

        <global-events @keyup.esc="toggleNavigation" />
    </div> -->
</template>

<style lang="sass" scoped>
// @use '@/assets/sass/const'
// @use '@/assets/sass/easings'

// .the-navigation
//   pointer-events: none
//   z-index: 10
//   &__background
//     position: fixed

//     top: 0
//     left: 0
//     right: 0
//     bottom: 0
//     opacity: 0.8
//     background: black
//     // $radius: max(140vw, 140vh)
//     // top: calc(-#{$radius})
//     // left: calc(-#{$radius})
//     // top: calc(#{$origin-y} - #{$radius})
//     // left: calc(#{$origin-x} - #{$radius})
//     // width: calc(#{$radius} * 2)
//     // height: calc(#{$radius} * 2)
//     // border: 2px solid $primary
//     // background: const.$background
//     z-index: 9
//     // border-radius: 50%
//     overflow: hidden
//     will-change: opacity
//     // pointer-events: auto

//     &-transition
//       &-enter-active
//         // top: 0
//         // left: 0
//         transition: all .6s easings.$ease-out-quart
//       &-leave-active
//         // right: 100vh
//         // left: 100vw
//         transition: all .6s .5s easings.$ease-out-quart
//       &-enter,
//       &-leave-to
//         // transform: scale(0)
//         opacity: 0

//   &__content
//     position: fixed
//     top: 0
//     left: 0
//     width: 100vw
//     height: 100vh
//     overflow: auto
//     z-index: 11
//     // pointer-events: auto
//     padding: 50px
//     -ms-overflow-style: none
//     &::-webkit-scrollbar
//       display: none

//     &--enable-pointer-events
//       pointer-events: auto

//   &__tiles-grid
//     display: grid
//     pointer-events: auto
//     justify-content: center
//     grid-template-columns: repeat(4, max-content)
//     gap: 16px

//   &__tiles-category
//     grid-column: 1 / 5
//     font-size: 1.8em
//     color: const.$primary

//     &--empty
//       height: 20px
//       // border: 1px solid $background
</style>
