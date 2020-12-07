<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import { useMainStore } from '@/state/main-store';
import Animation from './Animation';

export default defineComponent({
    setup() {
        const { setLoop, dropLoop } = useMainStore();
        const canvas = ref<HTMLCanvasElement | null>(null);

        onMounted(() => {
            const scene = new Animation(canvas.value!);
            setLoop(scene.animate.bind(scene));
        });

        onBeforeUnmount(() => {
            dropLoop();
        });

        return { canvas };
    },
});
</script>

<template>
    <div class="h-full bg-black flex items-center justify-center">
        <canvas ref="canvas" />
    </div>
</template>
