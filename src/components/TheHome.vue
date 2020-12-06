<template>
    <div v-sparks="'dark'" class="the-home d-flex align-center justify-center">
        <transition appear name="the-home__appear-transition">
            <div>
                <h1>Animations</h1>

                <div class="d-flex flex-column align-start">
                    <app-button @click="$store.commit('showNavigation')"> Открыть список </app-button>

                    <a href="https://github.com/LiquidSolid/some-animations">
                        <app-button class="mt-2 d-flex align-center">
                            <app-icon color="light" class="mr-2"> github </app-icon>

                            Github
                        </app-button>
                    </a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import AppIcon from './AppIcon';
import AppButton from './AppButton';

export default {
    name: 'Home',
    components: { AppIcon, AppButton },
};
</script>

<style lang="sass" scoped>
@use '@/assets/sass/const'
@use '@/assets/sass/easings'

.the-home
  color: const.$primary
  background: const.$background
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
      transition: all .8s .3s easings.$ease-out-quart
    &-enter
      transform: translateZ(50px)
      opacity: 0
</style>
