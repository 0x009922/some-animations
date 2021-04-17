<script lang="ts">
import { defineComponent } from 'vue';
import Layout from './layout/Layout.vue';
import NavOverlay from './components/TheNavOverlay.vue';
import ResizeBadge from './components/TheResizeBadge.vue';
import { tools as mainStoreTools } from './state/main-store';

export default defineComponent({
    name: 'App',
    components: {
        Layout,
        NavOverlay,
        ResizeBadge,
    },
    setup() {
        mainStoreTools.createAndProvide();
    },
});
</script>

<template>
    <layout>
        <router-view />
    </layout>
    <nav-overlay />
    <resize-badge />
</template>
