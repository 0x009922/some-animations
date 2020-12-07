<script lang="ts">
import { Vector2 } from 'three';
import Pair from './Pair.tsx';
import { useMainStore } from '@/state/main-store';
import { computed, onMounted, reactive, toRefs, watch } from 'vue';

export default {
    name: 'Pairs',
    components: { Pair },
    setup() {
        const { isPaused } = useMainStore();

        const data = reactive({
            num: 0,
            dotsCount: 28,
            radius: 200,
            doneCount: 0,
        });

        const dots = computed<number[]>(() => {
            const deltaAngle = (Math.PI * 2) / data.dotsCount;
            return new Array(data.dotsCount).fill(0).map((m, i) => (i - 0.5) * deltaAngle - Math.PI / 2);
        });

        const pairs = computed<[number, number][]>(() => {
            const items: [number, number][] = [];
            let dot = 0;
            const count = dots.value.length;
            while (dot < count) {
                const d1 = dots.value[dot];
                const d2 = dots.value[(dot + 3) % count];
                items.push([d1, d2]);
                dot += 2;
            }
            return items;
        });

        const pairsData = computed(() => {
            return pairs.value.map((angles, i) => {
                const v = angles.map((a) => new Vector2(Math.cos(a) * data.radius, Math.sin(a) * data.radius));
                const origin = new Vector2().addVectors(v[0], v[1]).divideScalar(2);
                const sub = new Vector2().subVectors(v[0], v[1]);
                return {
                    translate: `translate(${origin.x}px, ${origin.y}px)`,
                    rotate: `rotate(${origin.angle() + Math.PI / 2}rad)`,
                    distance: sub.length(),
                    delay: i * 0.24,
                };
            });
        });

        function tick() {
            if (isPaused.value) return;
            data.doneCount = 0;
            setTimeout(() => {
                data.num += 1;
            }, 1000);
        }

        watch(
            () => data.doneCount,
            (val) => {
                if (val === pairs.value.length) tick();
            },
        );

        watch(
            () => isPaused.value,
            (val) => !val && tick(),
        );

        onMounted(tick);

        return {
            ...toRefs(data),
            pairsData,
        };
    },
};
</script>

<template>
    <div class="pairs-layout">
        <svg>
            <g class="center">
                <g v-for="(data, i) in pairsData" :key="i" :style="{ transform: `${data.translate} ${data.rotate}` }">
                    <Pair :num="num" :delay="data.delay" :distance="data.distance" :size="12" @done="doneCount += 1" />
                </g>
            </g>
        </svg>
    </div>
</template>

<style lang="sass" scoped>
@use './const'

.pairs-layout
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  background: const.$pairs-back
  svg
    width: 600px
    height: 600px
    // border: 2px dashed gray
    g.center
      transform: translate(50%, 50%)
</style>
