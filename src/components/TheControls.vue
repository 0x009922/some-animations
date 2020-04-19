<template>
  <div
    class="the-controls__scrim"
  >
    <div class="the-controls__first">
      <transition
        name="the-controls__menu-switch-transition"
        @before-leave="$event.style.position = 'absolute'"
      >
        <icon-button
          v-if="!isNavigating"
          key="one"
          @click="showNavigation"
        >
          {{ mdiMenu }}
        </icon-button>
        <icon-button
          v-else
          key="two"
          light
          @click="hideNavigation"
        >
          {{ mdiClose }}
        </icon-button>
      </transition>
    </div>

    <div class="the-controls__second">
      <transition name="fade-transition">
        <icon-button
          v-if="!isNavigating && $route.name !== 'home'"
          size="24"
          @click="isPaused ? resume() : pause()"
        >
          {{ isPaused ? mdiPlay : mdiPause }}
        </icon-button>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import {
  mdiClose,
  mdiMenu,
  mdiPause,
  mdiPlay,
} from '@mdi/js';

import IconButton from './AppIconButton';

export default {
  name: 'TheControls',
  components: { IconButton },
  data: () => ({
    mdiClose,
    mdiMenu,
    mdiPause,
    mdiPlay,
  }),
  computed: {
    ...mapState([
      'isPaused',
      'isNavigating',
      // 'isResizin'
    ]),
  },
  methods: {
    ...mapMutations([
      'pause',
      'resume',
      'showNavigation',
      'hideNavigation',
    ]),
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/style'

.the-controls
  &__scrim
    pointer-events: none
    z-index: 15
    & > *
      pointer-events: auto

  &__first, &__second
    position: fixed
    top: 8px
    z-index: 15

  &__first
    left: 8px

  &__second
    left: 8px + 8px + 44px

  &__menu-switch-transition
    &-enter-active,
    &-leave-active
      transition: all .4s $ease-in-out-expo
    &-enter, &-leave-to
      opacity: 0
    &-enter
      transform: translateX(-50px) scale(0.8)
    // &-leave-to
    //   transform: rotate(90deg) translateX(-50px)
</style>
