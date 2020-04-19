<template>
  <div id="app">
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

export default {
  name: 'App',
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
  mounted() {
    // Слежу за изменением размеров окна
    window.addEventListener('resize', this.resized);
  },
  methods: {
    resized() {
      this.debouncedUpdateViewport();

      if (!this.$store.state.isResizing) {
        this.$store.commit('resizing');
      }
    },
    debouncedUpdateViewport: debounce(
      function () {
        this.$store.commit('updateViewport');
        this.$store.commit('resizingDone');
      },
      800,
    ),
  },
};
</script>

<style lang="sass">
// Импорт всяких глобальных штук
@import './assets/sass/style'

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  width: 100vw
  height: 100vh
</style>
