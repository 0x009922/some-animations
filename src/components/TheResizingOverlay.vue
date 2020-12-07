<script lang="ts">
import { defineComponent } from 'vue';
import { useMainStore } from '../state/main-store';

// todo - какую-нибудь анимацию вместо слова resizing

export default defineComponent({
    name: 'TheResizingOverlay',
    setup() {
        const { isResizing } = useMainStore();

        return { isResizing };
    },
});
</script>

<template>
    <div v-show="isResizing" class="h-screen w-screen fixed inset-0 flex items-center justify-center text-9xl bg-white">
        Resizing
    </div>
</template>
