<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TheNavigationItem',
    props: {
        title: {
            type: String,
            required: true,
        },
        to: {
            type: Object,
            required: true,
        },
    },
});
</script>

<template>
    <router-link :to="to" class="px-4 py-2 block text-gray-500 hover:text-black" active-class="text-blue-500">
        {{ title }}
    </router-link>
</template>
