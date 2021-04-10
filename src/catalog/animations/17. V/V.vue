<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useMainStore } from '~/state/main-store';

const config = {
    fadeInDelay: 200,
    fadeOutDelay: 200,
    fadeInStart: 400,
    fadeOutStart: 800,
    fadeDuration: 400,

    padding: 50,
    width: 430,
    height: 300,
    vCount: 4,
};

// статические computed
const transitionDuration = computed(() => `${config.fadeDuration / 1000}s`);
const viewSize = computed(() => {
    const ext = config.padding * 2;
    return `0, 0, ${config.width + ext}, ${config.height + ext}`;
});
const xStep = computed(() => config.width / 2 / config.vCount);
const yStep = computed(() => config.height / config.vCount);
const vPoints = computed(() => {
    const cx = config.width / 2 + config.padding;
    const lx = (i: number) => i * xStep.value + config.padding;
    const rx = (i: number) => config.width - i * xStep.value + config.padding;
    const y = (i: number) => config.height - i * yStep.value + config.padding;
    return new Array(config.vCount)
        .fill(0)
        .map((x, i) => `${lx(i)},${config.padding} ${cx},${y(i)} ${rx(i)},${config.padding}`)
        .reverse();
});
const width = computed(() => config.width + config.padding * 2);
const height = computed(() => config.height + config.padding * 2);

export default defineComponent({
    name: 'AnimationV',
    setup() {
        const { isPaused } = useMainStore();
        const hovered = ref(false);
        let timeout: number | null = null;

        // видимые итемы
        const vVisible = reactive(new Set<number>());

        function fadeIn() {
            const toggle = (index: number) => {
                vVisible.add(index);
            };

            toggle(0);
            for (let i = 1; i < config.vCount; i++) {
                setTimeout(() => toggle(i), config.fadeInDelay * i);
            }

            const fadeOutTimeout = config.fadeInDelay * (config.vCount - 1) + config.fadeDuration + config.fadeOutStart;

            timeout = window.setTimeout(fadeOut, fadeOutTimeout);
        }

        function fadeOut() {
            const toggle = (index: number) => {
                vVisible.delete(index);
            };

            toggle(0);
            for (let i = 1; i < config.vCount; i++) {
                setTimeout(() => toggle(i), config.fadeOutDelay * i);
            }

            const fadeInTimeout = config.fadeOutDelay * (config.vCount - 1) + config.fadeDuration + config.fadeInStart;

            timeout = window.setTimeout(fadeIn, fadeInTimeout);
        }

        function start() {
            vVisible.size > 0 ? fadeOut() : fadeIn();
        }

        function clear() {
            if (timeout) {
                window.clearTimeout(timeout);
            }
        }

        watch(
            () => isPaused.value,
            (flag) => (!flag ? start() : clear()),
            { immediate: true },
        );

        onBeforeUnmount(clear);

        function isVisible(index: number): boolean {
            return vVisible.has(index);
        }

        return {
            viewSize,
            width,
            height,
            vPoints,
            transitionDuration,
            isVisible,
        };
    },
});
</script>

<template>
    <div class="flex items-center justify-center h-full bg-black">
        <svg :viewbox="viewSize" :width="width" :height="height">
            <polyline
                v-for="(points, i) in vPoints"
                :key="i"
                :style="{ transitionDuration }"
                :class="{ 'faded-out': !isVisible(i) }"
                :points="points"
            />
        </svg>
    </div>
</template>

<style lang="sass" scoped>
svg
    margin: 0
    display: block
    cursor: none

    polyline
        stroke: #3D5AFE
        stroke-width: 10px
        stroke-linecap: round
        stroke-linejoin: round
        fill: none
        transition: opacity .3s ease-in-out

        &.faded-out
            opacity: 0.1
</style>
