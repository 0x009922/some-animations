<template>
  <div
    class="the-route-scope"
  >
    <div
      v-show="!isResizing"
      class="the-route-scope__view"
      :class="{
        'the-route-scope__view--paused': isPaused,
      }"
      @dblclick="isPaused ? resume() : pause()"
    >
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'TheRouteScope',

  computed: {
    ...mapState([
      'isNavigating',
      'isResizing',
      'isPaused',
    ]),
  },

  methods: {
    ...mapMutations([
      'pause',
      'resume',
    ]),
  },
};
</script>

<style lang="sass">
.the-route-scope
  height: 100vh
  position: relative
  overflow: hidden

  &__view
    perspective: 2000px
    height: 100%

  &__route-transition
    &-enter-active, &-leave-active
      transition: all .6s ease
    &-enter, &-leave-to
      opacity: 0
      transform: translateZ(-30px)
</style>
