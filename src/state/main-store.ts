import { computed, readonly, ref } from 'vue';
import { syncRef } from '@vueuse/core';
import createProvidableState from '~/utils/create-providable-state';
import { mapState } from '~/utils/map-reactive-state';
import useLoopFn, { LoopFn } from '~/utils/use-loop-fn';
import useViewport from '~/utils/use-viewport';

export const { inject: useMainStore, ...tools } = createProvidableState({
    symbolDescription: 'Main store',
    stateFactory: () => {
        const isNavigationOpened = ref(false);
        function setNavigationOpenedState(flag: boolean) {
            isNavigationOpened.value = flag;
        }

        // Флаг ручной паузы
        const isExplicitlyPaused = ref(false);

        const { width, height, isResizing } = useViewport();
        const viewport = readonly({ width, height });

        const loopError = ref<Error | null>(null);

        const isPaused = computed<boolean>(
            () => !!loopError.value || isExplicitlyPaused.value || isResizing.value || isNavigationOpened.value,
        );

        // основная тикающая функция
        const loopFn = ref<LoopFn | null>(null);
        const { error: loopErrorSource } = useLoopFn({
            loop: loopFn,
            active: computed(() => !isPaused.value),
        });

        syncRef(loopErrorSource, loopError);

        function setLoop(fn: LoopFn) {
            loopFn.value = fn;
        }
        function dropLoop() {
            loopFn.value = null;
        }

        function run() {
            if (!isResizing.value) {
                isExplicitlyPaused.value = false;
                loopError.value = null;
            }
        }

        function pause() {
            if (!isResizing.value) {
                isExplicitlyPaused.value = true;
            }
        }

        return {
            ...mapState(
                readonly({
                    isPaused,
                    isExplicitlyPaused,
                    isResizing,
                    isNavigationOpened,
                    // viewport,
                    loopError,
                }),
            ),
            viewport,
            run,
            pause,
            setLoop,
            dropLoop,
            setNavigationOpenedState,
        };
    },
});
