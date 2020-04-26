<template>
  <div
    class="the-route-scope"
  >
    <div
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
    height: 100%
</style>
