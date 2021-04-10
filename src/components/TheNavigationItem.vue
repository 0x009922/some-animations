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
        order: {
            type: Number,
            default: null,
        },
    },
});
</script>

<template>
    <router-link :to="to" class="px-4 py-2 block text-gray-500 hover:text-black" active-class="text-blue-500">
        <template v-if="order !== null">{{ order }}. </template>{{ title }}
    </router-link>
</template>
