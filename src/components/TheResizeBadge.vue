<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useMainStore } from '~/state/main-store';
import IconResize from '/@vite-icons/icons8/resize-four-directions';

export default defineComponent({
    name: 'TheResizeBadge',
    components: {
        IconResize,
    },
    setup() {
        const store = useMainStore();

        const show = computed(() => store.isResizing.value);

        return {
            show,
        };
    },
});
</script>

<template>
    <transition name="bounce-transition">
        <div v-if="show" class="fixed bottom-0 left-0">
            <div class="m-4 bg-black bg-opacity-50 rounded p-2 text-white">
                <icon-resize class="animate-spin" />
            </div>
        </div>
    </transition>
</template>
