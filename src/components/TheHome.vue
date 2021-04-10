<script>
// import AppIcon from './AppIcon.vue';
// import AppButton from './AppButton.vue';
import { useMainStore } from '../state/main-store';
// import { Button } from 'equal-vue';

export default {
    name: 'Home',
    // components: { ItButton: Button },
    setup() {
        const { setNavigationOpenedState } = useMainStore();

        function openNavigation() {
            setNavigationOpenedState(true);
        }

        return {
            openNavigation,
        };
    },
};
</script>

<template>
    <div class="h-screen flex items-center justify-center">
        <transition appear name="the-home__appear-transition">
            <div class="space-y-4">
                <h1 class="text-6xl">Some<br />Animations</h1>

                <div class="d-flex flex-column align-start">
                    <div
                        class="border px-2 py-1 inline-block rounded focus:ring focus:outline-none hover:bg-gray-50 transition"
                        role="button"
                        tabindex="0"
                        @click="openNavigation"
                    >
                        Открыть список
                    </div>

                    <!-- <a href="https://github.com/LiquidSolid/some-animations" target="_blank">
                        <app-button class="mt-2 d-flex align-center">
                            <app-icon class="mr-2" name="github" />

                            Github
                        </app-button>
                    </a> -->
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="sass" scoped>
// @use '@/assets/sass/const'
// @use '@/assets/sass/easings'

.the-home
  // color: const.$primary
  // background: const.$background
  height: 100%
  perspective: 1000px
  h1
    font-weight: normal
    font-size: 5em
    margin-bottom: 16px
  a
    text-decoration: none
  &__appear-transition
    &-enter-active
      // transition: all .8s .3s easings.$ease-out-quart
    &-enter
      transform: translateZ(50px)
      opacity: 0
</style>
