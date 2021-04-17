import { useRafFn } from '@vueuse/core';
import { ref, Ref, watch } from 'vue';
import { MaybeRef, normalizeMaybeRef } from './maybe-ref';

export type LoopFn = (dt: number, elapsed: number) => void;

function performanceNow(): number {
    return window.performance.now();
}

export default function useLoopFn(params: {
    loop: MaybeRef<LoopFn | null>;
    active: MaybeRef<boolean>;
}): {
    error: Ref<Error | null>;
} {
    // нормализация параметров
    const loopFn = normalizeMaybeRef(params.loop);
    const loopActive = normalizeMaybeRef(params.active);

    // хранение ошибки
    const error = ref<Error | null>(null);

    let lastFrame = performanceNow();
    let elapsed = 0;

    const { pause, resume } = useRafFn(
        () => {
            const now = performanceNow();
            const delta = now - lastFrame;
            lastFrame = now;

            if (delta < 300) {
                try {
                    elapsed += delta;
                    loopFn.value?.(delta, elapsed);
                } catch (err) {
                    console.error('[loop error]', err);
                    error.value = err;
                }
            }
        },
        { immediate: false },
    );

    watch(
        [loopFn, loopActive],
        ([fn, act], [oldFn, oldAct]) => {
            if (fn !== oldFn) {
                elapsed = 0;
            }

            if (fn && !oldFn) {
                lastFrame = performanceNow();
            }

            if (fn && act) {
                resume();
            } else {
                pause();
            }
        },
        { immediate: true, flush: 'post' },
    );

    return {
        error,
    };
}
