<template>
    <div class="triple-dot d-flex align-center justify-center fill-height">
        <div
            v-for="(state, i) in states"
            :key="i"
            class="triple-dot__dot"
            :class="`triple-dot__dot--${state}`"
            :style="{ animationPlayState }"
            @animationend="onAnimationEnd(i)"
        />
    </div>
</template>

<script>
export default {
    name: 'DotDotDot',
    data: () => ({
        states: ['appearing', 'appearing', 'appearing'],
    }),
    computed: {
        animationPlayState() {
            return this.$store.getters.isPaused ? 'paused' : 'running';
        },
    },
    methods: {
        onAnimationEnd(num) {
            const current = this.states[num];
            const next = current === 'appearing' ? 'leaving' : 'appearing';
            this.states.splice(num, 1, next);
        },
    },
};
</script>

<style lang="sass" scoped>
@use '@/assets/sass/easings'

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

.triple-dot
  &__dot
    width: 20px
    height: 20px
    background: white

    & + .triple-dot__dot
      margin-left: 16px

    &--appearing
      animation-name: dotAppearAnimation
      animation-duration: 1s
      animation-fill-mode: backwards
      animation-timing-function: easings.$ease-out-quart
      @for $i from 1 through 3
        &:nth-child(#{$i})
          animation-delay: .5s + $i * .6s

    &--leaving
      animation-name: dotLeaveAnimation
      animation-duration: .8s
      animation-fill-mode: backwards
      animation-timing-function: easings.$ease-in-quart
      @for $i from 1 through 3
        &:nth-child(#{$i})
          animation-delay: (4 - $i) * .6s
</style>
