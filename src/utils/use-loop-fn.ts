import { ref, Ref, watch, watchEffect } from 'vue';
import { MaybeRef, normalizeMaybeRef } from './maybe-ref';

export type LoopFn = (dt: number, elapsed: number) => void;

function perfNow(): number {
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

    let lastFrame = perfNow();
    let elapsed = 0;
    let request: number | null = null;

    // запуск
    function go() {
        requestTick();
    }

    // остановка
    function stop() {
        if (request) {
            cancelAnimationFrame(request);
        }
    }

    function requestTick() {
        request = requestAnimationFrame(tick);
    }

    // тикающая функция
    function tick() {
        const now = perfNow();
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

        requestTick();
    }

    // остановка или запуск в зависимости от состояния
    watch(
        () => !!loopFn.value && loopActive.value,
        (isLoopShouldPlaying) => {
            isLoopShouldPlaying ? go() : stop();
        },
    );

    return {
        error,
    };
}
