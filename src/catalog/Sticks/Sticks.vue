<script lang="ts">
import { useMainStore } from '@/state/main-store';
import { LoopFn } from '@/utils/use-loop-fn';
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

function createSticks(rows: number, columns: number): { row: number; col: number }[] {
    const arr = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            arr.push({ row, col });
        }
    }
    return arr;
}

const DELTAS = [
    [405, 45, 45, 45, -45, 135, 45, -135],
    [-45, -45, 405, -495, -45, -45, -45, -45],
    [45, 45, 45, 45, 45, 45, -405, 315],
    [-45, -45, -45, -45, 45, -135, 405, -315],
    [45, -315, 225, 45, 45, 45, 45, 45],
];

const INTERVAL = 450;
const ROWS = DELTAS.length;
const COLUMNS = 5;

const STICKS = createSticks(ROWS, COLUMNS);

export default defineComponent({
    name: 'Sticks',
    setup() {
        // номер итерации
        const iteration = ref(-1);

        // Текущие ротации, по строкам
        const rotations: number[] = reactive(new Array(ROWS).fill(0));

        // Текущие дельты - зависят от итерации
        const currentDeltas = computed<number[]>(() => DELTAS.map((list) => list[iteration.value % list.length]));

        // Обновление ротаций, когда меняются текущие дельты
        watch(iteration, (val) => {
            for (let i = 0; i < ROWS; i++) {
                rotations[i] += currentDeltas.value[i];
            }
        });

        // Обновление счётчика итераций
        let elapsed = 0;
        const loop: LoopFn = (dt) => {
            elapsed += dt;
            while (elapsed >= INTERVAL) {
                elapsed %= INTERVAL;
                iteration.value += 1;
            }
        };

        // Настройка обновления через глобальный стор
        const store = useMainStore();
        onMounted(() => {
            store.setLoop(loop);
        });
        onBeforeUnmount(() => {
            store.dropLoop();
        });

        // PROFIT

        return {
            STICKS,
            ROWS,
            COLUMNS,

            rotations,
        };
    },
});
</script>

<template>
    <div class="flex items-center justify-center bg-black h-full">
        <div
            class="grid"
            :style="{
                gridTemplateRows: `repeat(${ROWS}, auto)`,
                gridTemplateColumns: `repeat(${COLUMNS}, auto)`,
            }"
        >
            <div
                v-for="{ row, col } in STICKS"
                :key="`${row} ${col}`"
                class="stick-wrapper d-flex align-center justify-center"
                :style="{
                    gridRow: row + 1,
                    gridColumn: col + 1,
                }"
            >
                <div class="stick" :style="{ transform: `rotate(${rotations[row]}deg)` }" />
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.stick-wrapper
    width: 100px
    height: 100px
    // @include center-box
.stick
    width: 65px
    border: 4px solid white
    background: white
    transition: all 0.45s cubic-bezier(.64,-0.04,.25,1.04)
    transform-origin: center
</style>
