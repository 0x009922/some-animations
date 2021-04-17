<script lang="ts">
import { defineComponent } from 'vue';
import Layout from './layout/Layout.vue';
import TheNavOverlay from './components/TheNavOverlay';
import { tools as mainStoreTools } from './state/main-store';

export default defineComponent({
    name: 'App',
    components: {
        Layout,
        TheNavOverlay,
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

    <the-nav-overlay />
</template>
