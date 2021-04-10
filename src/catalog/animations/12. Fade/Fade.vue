<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useMainStore } from '~/state/main-store';
import Scene from './Scene';

export default defineComponent({
    name: 'AnimationFade',
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
});
</script>

<template>
    <div class="fade-layout">
        <div class="canvas-wrapper">
            <canvas ref="canvas" width="1000" height="1000" />
        </div>
    </div>
</template>

<style lang="sass" scoped>
.fade-layout
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  background: rgb(240, 240, 240)
  .canvas-wrapper
    // border: 2px dashed teal
    canvas
      width: 700px
      height: 700px
      display: block
</style>
