<script lang="ts">
import { defineComponent } from 'vue';
import { tools as mainStoreTools } from './state/main-store';
// import { mapState } from 'vuex';

// import { debounce } from '~/utils';
import TheNavigation from './components/TheNavigation.vue';
import TheRouteScope from './components/TheRouteScope.vue';
import TheResizingOverlay from './components/TheResizingOverlay.vue';
// import TheControls from './components/TheControls.vue';

export default defineComponent({
    name: 'App',
    components: {
        TheRouteScope,
        TheNavigation,
        TheResizingOverlay,
        // TheControls,
    },
    setup() {
        mainStoreTools.createAndProvide();
    },
    // computed: {
    //     ...mapState(['isResizing']),
    // },
    // mounted() {
    //     // Слежу за изменением размеров окна
    //     window.addEventListener('resize', this.resized);
    // },
    // methods: {
    //     resized() {
    //         this.debouncedUpdateViewport();

    //         if (!this.$store.state.isResizing) {
    //             this.$store.commit('resizing');
    //         }
    //     },
    //     debouncedUpdateViewport: debounce(function () {
    //         this.$store.commit('updateViewport');
    //         this.$store.commit('resizingDone');
    //     }, 800),
    // },
});
</script>

<template>
    <div class="app">
        <the-navigation />
        <the-route-scope />
        <the-resizing-overlay />
        <!-- <the-controls /> -->
    </div>
</template>

<style lang="sass" scoped>
.app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  width: 100vw
  height: 100vh
</style>
