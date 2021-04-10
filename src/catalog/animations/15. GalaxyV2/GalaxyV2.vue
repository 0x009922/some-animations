import { onUnmounted } from 'vue';
<script lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { useMainStore } from '~/state/main-store';
import Scene from './galaxy-v2';

export default {
    setup() {
        const { setLoop, dropLoop } = useMainStore();
        const canvas = ref<HTMLCanvasElement | null>(null);

        onMounted(() => {
            const scene = new Scene(canvas.value!);
            setLoop(scene.render.bind(scene));
        });

        onUnmounted(() => {
            dropLoop();
        });

        return { canvas };
    },
};
</script>

<template>
    <div class="galaxy-v2 bg-black h-full flex items-center justify-center">
        <div class="galaxy-v2--wrapper">
            <canvas ref="canvas" width="1000" height="1000" />
        </div>
    </div>
</template>

<style lang="sass" scoped>
.galaxy-v2
  &--wrapper
    border: 2px solid #565254
    border-radius: 2px
    overflow: hidden
    canvas
      background: black
      display: block
      width: 700px
      height: 700px
</style>
