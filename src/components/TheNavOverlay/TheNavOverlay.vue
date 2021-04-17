<script lang="ts">
import {
    templateRef,
    unrefElement,
    useEventListener,
    useMagicKeys,
    useMouse,
    usePageLeave,
    useRafFn,
    whenever,
} from '@vueuse/core';
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue';
import { Mesh, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';
import { useMainStore } from '~/state/main-store';
import { useArrow } from './arrow';
import { useWaves } from './waves';
import { animationNameToRouteName, items as animationsCatalog } from '~/catalog';
import IconArrow from '@vite-icons/uim/arrow-circle-left';
import IconMenu from '@vite-icons/ic/twotone-menu-book';
import IconEsc from '@vite-icons/mdi/keyboard-esc';
import { useRoute } from 'vue-router';

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
    components: {
        IconArrow,
        IconMenu,
        IconEsc,
    },
    setup() {
        const canv = templateRef('canvas');
        const store = useMainStore();
        const route = useRoute();

        function toggleShow() {
            store.setNavigationOpenedState(!store.isNavigationOpened.value);
        }

        const showOverlay = computed(() => store.isNavigationOpened.value);

        watch(
            () => route.name,
            () => {
                // setTimeout(() => {
                store.setNavigationOpenedState(false);
                // }, 200);
            },
        );

        const { Escape } = useMagicKeys();
        whenever(Escape, toggleShow);

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
                    show: computed(() => showOverlay.value && !isMouseLeft.value && mouse.sourceType === 'mouse'),
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
                        x: (mouse.x / store.viewport.width) * 2 - 1,
                        y: -(mouse.y / store.viewport.height) * 2 + 1,
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
                const { width, height } = store.viewport;
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

            watch(showOverlay, (flag) => (flag ? resume() : pause()), { immediate: true });

            const waves = useWaves(scene);
            useEventListener('click', () => {
                waves.start(mouseScenePosition);
            });
        });

        return {
            mouseScenePosition,
            showOverlay,
            toggleShow,
            animationNameToRouteName,
            animationsCatalog: [...animationsCatalog].reverse(),
        };
    },
});
</script>

<template>
    <div
        v-show="showOverlay"
        ref="root"
        class="the-nav-overlay fixed inset-0 bg-black bg-opacity-80 backdrop-filter backdrop-blur"
    >
        <div class="h-full overflow-y-auto">
            <div class="mx-auto w-full max-w-2xl p-8 grid gap-2">
                <router-link
                    v-for="(item, i) in animationsCatalog"
                    :key="i"
                    v-slot="{ navigate, isActive }"
                    custom
                    :to="{ name: animationNameToRouteName(item.name) }"
                >
                    <div
                        tabindex="0"
                        :class="{
                            'text-blue-400 block hover:bg-blue-900 p-2 rounded flex items-center': true,
                            'font-black4': isActive,
                        }"
                        @click="navigate"
                        @keydown.enter.space="navigate"
                    >
                        <div class="mr-4">{{ item.order }}. {{ item.summary }}</div>

                        <transition name="the-nav-overlay__icon-transition">
                            <icon-arrow
                                v-if="isActive"
                                class="the-nav-overlay__icon-animation text-green-400 text-lg"
                                title="Here you are!"
                            />
                        </transition>
                    </div>
                </router-link>
            </div>
        </div>

        <canvas ref="canvas" class="absolute inset-0 pointer-events-none" height="100%" width="100%" />
    </div>

    <div class="fixed top-0 left-0">
        <div class="the-nav-overlay__toggle" @click="toggleShow">
            <icon-menu />
            <icon-esc />
        </div>
    </div>
</template>

<style lang="sass">
@keyframes the-nav-overlay__icon-animation-keyframes
    0%
        transform: translateX(0)
    100%
        transform: translateX(5px)


.the-nav-overlay
    cursor: none
    user-select: none

    &__toggle
        @apply m-4 bg-black bg-opacity-50 text-white p-2 rounded text-xl
        @apply hover:text-blue-400 cursor-pointer flex items-center space-x-1

    &__icon
        &-animation
            animation: the-nav-overlay__icon-animation-keyframes .2s ease alternate infinite

        &-transition
            &-enter-from, &-leave-to
                opacity: 0
                transform: scale(0.7)
            &-enter-active, &-leave-active
                transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1)
</style>
