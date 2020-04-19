<template>
  <div class="the-navigation">
    <transition
      name="the-navigation__background-transition"
      :duration="{ leave: 1100 }"
    >
      <div
        v-if="isNavigating"
        v-sparks="'light'"
        class="the-navigation__background"
      />
    </transition>

    <div
      v-sparks="'light'"
      class="the-navigation__content"
      :class="{
        'the-navigation__content--enable-pointer-events': isNavigating,
      }"
    >
      <div
        class="the-navigation__tiles-grid"
      >
        <router-link
          v-for="(item, i) in animations"
          :key="i"
          #default="{ isActive, navigate, route }"
          :to="item.to"
          tag="div"
        >
          <tile
            :show="isNavigating"
            :blur="anythingFocused && !(i in focusedTiles)"
            :is-active="isActive"
            @focus="$set(focusedTiles, i, true)"
            @blur="$delete(focusedTiles, i)"
            @click="isActive ? hideNavigation() : navigate(route)"
          >
            {{ item.tile }}
          </tile>
        </router-link>
      </div>
    </div>

    <global-events
      @keyup.esc="toggleNavigation"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import GlobalEvents from 'vue-global-events';

import Tile from './TheNavigationTile';
import animations from '@/animations';

export default {
  name: 'TheNavigation',
  components: {
    Tile,
    GlobalEvents,
  },
  data: () => ({
    animations: animations.map(({ route, tile }) => ({
      to: { name: route.name },
      tile,
    })),
    focusedTiles: {},
  }),
  computed: {
    ...mapState([
      'isNavigating',
      'isPaused',
    ]),
    anythingFocused() {
      return Object.keys(this.focusedTiles).length > 0;
    },
  },
  watch: {
    $route() {
      this.hideNavigation();
      if (this.isPaused) {
        this.resume();
      }
    },
  },
  methods: {
    ...mapMutations([
      'showNavigation',
      'hideNavigation',
      'toggleNavigation',
      'resume',
    ]),
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/style'


.the-navigation
  pointer-events: none
  z-index: 10

  $origin-x: 40px
  $origin-y: 40px
  $radius:  max(140vw, 140vh)

  &__background
    position: fixed
    top: calc(#{$origin-y} - #{$radius})
    left: calc(#{$origin-x} - #{$radius})
    width: calc(#{$radius} * 2)
    height: calc(#{$radius} * 2)
    // border: 2px solid $primary
    background: $primary
    z-index: 9
    border-radius: 50%
    overflow: hidden
    will-change: transform, opacity
    // pointer-events: auto

    &-transition
      &-enter-active
        transition: transform 1.5s $ease-out-quart
      &-leave-active
        transition: all .6s .5s $ease-out-quart
      &-enter
        transform: scale(0)
      &-leave-to
        opacity: 0

  &__content
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    overflow: auto
    z-index: 11
    // pointer-events: auto
    padding: 50px
    -ms-overflow-style: none
    &::-webkit-scrollbar
      display: none

    &--enable-pointer-events
      pointer-events: auto

  &__tiles-grid
    display: grid
    pointer-events: auto
    justify-content: center
    grid-template-columns: repeat(3, max-content)
    gap: 16px
</style>
