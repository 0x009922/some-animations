<template>
  <div
    id="app"
    v-resize="resized"
  >
    <the-navigation />
    <the-route-scope />
    <the-resizing-overlay />
    <the-controls />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import debounce from 'lodash/debounce';

import TheNavigation from '@/components/TheNavigation';
import TheRouteScope from '@/components/TheRouteScope';
import TheResizingOverlay from '@/components/TheResizingOverlay';
import TheControls from '@/components/TheControls';

import Resize from '@/directives/Resize';

export default {
  name: 'App',
  directives: {
    Resize,
  },
  components: {
    TheRouteScope,
    TheNavigation,
    TheResizingOverlay,
    TheControls,
  },
  computed: {
    ...mapState([
      'isResizing',
    ]),
  },
  methods: {
    resized(newViewport) {
      this.setViewport(newViewport);

      if (!this.$store.state.isResizing) {
        this.$store.commit('resizing');
      }
    },
    setViewport: debounce(
      function (value) {
        this.$store.commit('setViewport', value);
        this.$store.commit('resizingDone');
      },
      800,
    ),
  },
};
</script>

<style lang="sass">
@import './assets/sass/style'
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  width: 100vw
  height: 100vh
  // overflow: hidden

.router-view-box
  // margin-right: 50px
  // margin: 50px
  overflow: hidden
  transition: filter .3s ease
  &.blured
    filter: blur(13px)
</style>
