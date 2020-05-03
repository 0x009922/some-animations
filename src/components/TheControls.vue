<template>
  <div
    class="the-controls__scrim"
  >
    <div class="the-controls__first">
      <transition
        appear
        name="the-controls__menu-switch-transition--delayed"
        @before-leave="$event.style.position = 'absolute'"
      >
        <icon-button
          v-if="!isNavigating"
          key="one"
          size="24"
          @click="showNavigation"
        >
          menu
        </icon-button>
        <icon-button
          v-else
          key="two"
          size="24"
          @click="hideNavigation"
        >
          close
        </icon-button>
      </transition>
    </div>

    <div class="the-controls__second">
      <transition
        appear
        name="the-controls__menu-switch-transition"
        @before-leave="$event.style.position = 'absolute'"
      >
        <template v-if="$route.name !== 'home'">
          <router-link
            v-if="isNavigating"
            to="/"
            tag="div"
          >
            <icon-button
              @click="hideNavigation"
            >
              home
            </icon-button>
          </router-link>


          <icon-button
            v-else
            size="24"
            @click="isForcePaused ? resume() : pause()"
          >
            {{ isForcePaused ? 'play' : 'pause' }}
          </icon-button>
        </template>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import IconButton from './AppIconButton';

export default {
  name: 'TheControls',
  components: { IconButton },
  computed: {
    ...mapState([
      'isForcePaused',
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
@use '@/assets/sass/easings'

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
    @mixin transition
      &-enter-active,
      &-leave-active
        transition: all .4s easings.$ease-in-out-expo
      &-enter
        opacity: 0
        transform: translateX(-50px) scale(0.8)
      &-leave-to
        opacity: 0
        transform: translateX(50px) scale(0.8)

    @include transition
    &--delayed
      @include transition
      &-enter-active
        transition-delay: .09s
      // &-leave-active
      //   transition-delay: .05s
</style>
