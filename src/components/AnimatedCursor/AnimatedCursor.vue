<script lang="ts">
import { templateRef, unrefElement, useEventListener, useMouse, usePageLeave, useRafFn } from '@vueuse/core';
import { computed, defineComponent, onMounted, onUnmounted, PropType, reactive, watch, watchEffect } from 'vue';
import { Mesh, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';
import { useArrow } from './arrow';
import { useWaves } from './waves';

interface Disposable {
    dispose: () => void;
}

function useDisposer(): {
    bind: <T extends Disposable>(thing: T) => T;
} {
    const things: Disposable[] = [];

    onUnmounted(() => {
        things.forEach((x) => x.dispose());
    });

    return {
        bind(thing) {
            things.push(thing);
            return thing;
        },
    };
}

export default defineComponent({
    name: 'AnimatedCursor',
    props: {
        active: Boolean,
        loopOnlyOnActive: {
            type: Boolean,
            default: true,
        },
        viewport: {
            type: Object as PropType<{ width: number; height: number }>,
            required: true,
        },
    },
    setup(props) {
        const canv = templateRef('canvas');

        const mouse = reactive(useMouse({ touch: false }));
        const isMouseLeft = usePageLeave();

        const mouseScenePosition = reactive(new Vector2());

        onMounted(() => {
            const { bind } = useDisposer();

            const renderer = bind(new WebGLRenderer({ canvas: unrefElement(canv), alpha: true }));
            renderer.setClearColor(0x444444, 0);
            const camera = new PerspectiveCamera(30, 0, 0.1, 20);
            const scene = new Scene();
            camera.position.set(0, 0, 10);
            camera.lookAt(0, 0, 0);

            const arrow = useArrow(
                reactive({
                    position: mouseScenePosition,
                    show: computed(() => props.active && !isMouseLeft.value && mouse.sourceType === 'mouse'),
                }),
            );
            scene.add(arrow);

            // "бесконечная" плоскость
            const zeroPlaneGeom = bind(new PlaneGeometry(50, 50));
            // const zeroPlaneMat = bind(new MeshBasicMaterial({ color: 0x444444 }));
            const zeroPlane = new Mesh(zeroPlaneGeom);
            zeroPlane.visible = false;
            // zeroPlane.position.z = 0;
            scene.add(zeroPlane);

            // Raycaster - чтобы смотреть, где мышь попалась
            const raycaster = new Raycaster();

            // Позиция мыши в рамках сцены
            // Обновляется автоматом
            watchEffect(() => {
                raycaster.setFromCamera(
                    {
                        x: (mouse.x / props.viewport.width) * 2 - 1,
                        y: -(mouse.y / props.viewport.height) * 2 + 1,
                    },
                    camera,
                );
                const [intersection] = raycaster.intersectObject(zeroPlane);
                if (intersection) {
                    mouseScenePosition.set(intersection.point.x, intersection.point.y);
                }
            });

            watchEffect(() => {
                // update viewport
                const { width, height } = props.viewport;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            });

            const { pause, resume } = useRafFn(
                () => {
                    renderer.render(scene, camera);
                },
                { immediate: false },
            );

            watch(
                () => props.active || !props.loopOnlyOnActive,
                (flag) => (flag ? resume() : pause()),
                { immediate: true },
            );

            const waves = useWaves(scene);
            useEventListener('click', () => {
                props.active && waves.start(mouseScenePosition);
            });
        });
    },
});
</script>

<template>
    <canvas ref="canvas" class="absolute inset-0 pointer-events-none" height="100%" width="100%" />
</template>
