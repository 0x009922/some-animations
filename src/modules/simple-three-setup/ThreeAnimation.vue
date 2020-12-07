<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref, watch } from 'vue';
import { ThreeAnimationFactory, ThreeAnimation } from '@/utils/ThreeAnimation';
import { useMainStore } from '@/state/main-store';

/**
 * Компонент для простой сцены Three
 */
export default defineComponent({
    name: 'ThreeAnimation',
    props: {
        factory: {
            type: Function as PropType<ThreeAnimationFactory>,
            required: true,
        },
    },
    setup(props) {
        const store = useMainStore();

        let animationInstance: ThreeAnimation | null = null;

        let canvas = ref<HTMLCanvasElement | null>(null);

        // обновляю размер анимации при изменении
        watch(
            () => store.viewport,
            (val) => animationInstance?.setSize(val),
            { deep: true },
        );

        onMounted(() => {
            // создаю анимацию
            // eslint-disable-next-line new-cap
            animationInstance = props.factory(canvas.value!);
            animationInstance!.setSize(store.viewport);
            store.setLoop(animationInstance!.animate.bind(animationInstance));
        });

        onBeforeUnmount(() => {
            // уничтожаю анимацию
            animationInstance?.destroy?.();
            store.dropLoop();
        });

        return {
            canvas,
            viewport: store.viewport,
        };
    },
});
</script>

<template>
    <canvas ref="canvas" :width="viewport.width" :height="viewport.height" />
</template>
