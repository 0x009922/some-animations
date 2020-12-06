<template>
    <div class="v-animation fill-height d-flex align-center justify-center">
        <svg :viewbox="viewSize" :width="width + padding * 2" :height="height + padding * 2">
            <polyline
                v-for="(points, i) in vPoints"
                :key="i"
                ref="v"
                class="v"
                :style="{ transitionDuration }"
                :class="{ 'faded-out': !(i in vVisible) }"
                :points="points"
            />
        </svg>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'VAnimation',
    data: () => ({
        fadeInDelay: 200,
        fadeOutDelay: 200,
        fadeInStart: 400,
        fadeOutStart: 800,
        fadeDuration: 400,

        padding: 50,
        width: 430,
        height: 300,
        vCount: 4,
        vVisible: {},

        hovered: false,
        timeout: null,
    }),
    computed: {
        ...mapGetters(['isPaused']),
        transitionDuration() {
            return `${this.fadeDuration / 1000}s`;
        },
        viewSize() {
            const ext = this.padding * 2;
            return `0, 0, ${this.width + ext}, ${this.height + ext}`;
        },
        xStep() {
            return this.width / 2 / this.vCount;
        },
        yStep() {
            return this.height / this.vCount;
        },
        vPoints() {
            const cx = this.width / 2 + this.padding;
            const lx = (i) => i * this.xStep + this.padding;
            const rx = (i) => this.width - i * this.xStep + this.padding;
            const y = (i) => this.height - i * this.yStep + this.padding;
            return new Array(this.vCount)
                .fill(0)
                .map((x, i) => `${lx(i)},${this.padding} ${cx},${y(i)} ${rx(i)},${this.padding}`)
                .reverse();
        },
    },
    mounted() {
        this.$watch(
            () => this.isPaused,
            (val) => {
                if (val) this.clearTimeouts();
                else this.start();
            },
            { immediate: true },
        );
    },
    beforeDestroy() {
        this.clearTimeouts();
    },
    methods: {
        clearTimeouts() {
            clearTimeout(this.timeout);
        },
        start() {
            if (Object.keys(this.vVisible).length > 0) {
                this.fadeOut();
            } else {
                this.fadeIn();
            }
        },

        fadeOut() {
            const toggle = (index) => {
                this.$delete(this.vVisible, index);
            };

            toggle(0);
            for (let i = 1; i < this.vCount; i++) {
                setTimeout(() => toggle(i), this.fadeOutDelay * i);
            }

            const fadeInTimeout = this.fadeOutDelay * (this.vCount - 1) + this.fadeDuration + this.fadeInStart;

            this.timeout = setTimeout(this.fadeIn, fadeInTimeout);
        },
        fadeIn() {
            const toggle = (index) => {
                this.$set(this.vVisible, index, 0);
            };

            toggle(0);
            for (let i = 1; i < this.vCount; i++) {
                setTimeout(() => toggle(i), this.fadeInDelay * i);
            }

            const fadeOutTimeout = this.fadeInDelay * (this.vCount - 1) + this.fadeDuration + this.fadeOutStart;

            this.timeout = setTimeout(this.fadeOut, fadeOutTimeout);
        },
    },
};
</script>

<style lang="sass" scoped>
.v-animation
  svg
    margin: 0
    display: block
    cursor: none
    transition: transform 1.3s ease-in-out

  polyline.v
    stroke: #3D5AFE
    stroke-width: 10px
    stroke-linecap: round
    stroke-linejoin: round
    fill: none
    transition: opacity ease

  polyline.v.faded-out
    opacity: 0.1
</style>
