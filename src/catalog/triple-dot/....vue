<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import { useMainStore } from '@/state/main-store';

type DotState = 'appearing' | 'leaving';
type AnimationPlayState = 'paused' | 'running';

export default defineComponent({
    name: 'DotDotDot',
    setup() {
        const { isPaused } = useMainStore();

        const states = reactive<DotState[]>(['appearing', 'appearing', 'appearing']);

        const animationPlayState = computed<AnimationPlayState>(() => (isPaused.value ? 'paused' : 'running'));

        function toggleDotState(index: number): void {
            states[index] = states[index] === 'appearing' ? 'leaving' : 'appearing';
        }

        return {
            states,
            toggleDotState,
            animationPlayState,
        };
    },
});
</script>

<template>
    <div class="bg-black flex items-center justify-center h-full space-x-4">
        <div
            v-for="(state, i) in states"
            :key="i"
            class="triple-dot__dot"
            :class="`triple-dot__dot--${state}`"
            :style="{ animationPlayState }"
            @animationend="toggleDotState(i)"
        />
    </div>
</template>

<style lang="sass" scoped>
@keyframes dotAppearAnimation
    0%
        opacity: 0
        transform: translateY(20px)
    100%
        opacity: 1
        transform: none

@keyframes dotLeaveAnimation
    0%
        opacity: 1
    100%
        opacity: 0

$ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1)
$ease-in-quart: cubic-bezier(0.5, 0, 0.75, 0)

.triple-dot
    &__dot
        width: 20px
        height: 20px
        background: white

        // & + .triple-dot__dot
        //     margin-left: 16px

        &--appearing
            animation-name: dotAppearAnimation
            animation-duration: 1s
            animation-fill-mode: backwards
            animation-timing-function: $ease-out-quart
            @for $i from 1 through 3
                &:nth-child(#{$i})
                    animation-delay: .5s + $i * .6s

        &--leaving
            animation-name: dotLeaveAnimation
            animation-duration: .8s
            animation-fill-mode: backwards
            animation-timing-function: $ease-in-quart
            @for $i from 1 through 3
                &:nth-child(#{$i})
                    animation-delay: (4 - $i) * .6s
</style>
