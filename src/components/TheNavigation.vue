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
        <template v-for="[category, items] in categorizedAnimations">
          <tile-transition :key="`category-${category}`">
            <div
              v-if="isNavigating"
              class="the-navigation__tiles-category"
              :class="{
                'the-navigation__tiles-category--empty': !category
              }"
            >
              <template v-if="category in categories">
                {{ categories[category].title }}
              </template>
            </div>
          </tile-transition>

          <template v-for="(item, i) in items">
            <tile-transition :key="`${category}-${i}`">
              <router-link
                v-if="isNavigating"
                #default="{ isActive, navigate, route }"
                :to="{ name: item.route.name }"
              >
                <div>
                  <tile
                    :is-active="isActive"
                    @click="isActive ? hideNavigation() : navigate(route)"
                  >
                    {{ item.tile }}
                  </tile>
                </div>
              </router-link>
            </tile-transition>
          </template>
        </template>
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
import TileTransition from './TheNavigationTileTransition';
import animations from '@/animations';
import animationsCategories from '@/animations/categories';

export default {
  name: 'TheNavigation',
  components: {
    Tile,
    GlobalEvents,
    TileTransition,
  },
  data: () => ({
    animations: animations.map(({ route, tile }) => ({
      to: { name: route.name },
      tile,
    })),
    categories: animationsCategories,
  }),
  computed: {
    ...mapState([
      'isNavigating',
      'isPaused',
    ]),
    categorizedAnimations() {
      const groups = animations.reduce((prev, val) => {
        const cat = val.category || null;

        if (prev.has(cat)) {
          prev.get(cat).push(val);
        } else {
          prev.set(cat, [val]);
        }

        return prev;
      }, new Map());

      return [...groups];
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
@use '@/assets/sass/const'
@use '@/assets/sass/easings'

.the-navigation
  pointer-events: none
  z-index: 10

  $origin-x: 30px
  $origin-y: 30px
  $radius: max(140vw, 140vh)

  &__background
    position: fixed
    top: calc(#{$origin-y} - #{$radius})
    left: calc(#{$origin-x} - #{$radius})
    width: calc(#{$radius} * 2)
    height: calc(#{$radius} * 2)
    // border: 2px solid $primary
    background: const.$primary
    z-index: 9
    border-radius: 50%
    overflow: hidden
    will-change: transform, opacity
    // pointer-events: auto

    &-transition
      &-enter-active
        transition: transform 1.5s easings.$ease-out-quart
      &-leave-active
        transition: all .6s .5s easings.$ease-out-quart
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

  &__tiles-category
    grid-column: 1 / 4
    font-size: 3em
    color: const.$background

    &--empty
      height: 20px
      // border: 1px solid $background
</style>
