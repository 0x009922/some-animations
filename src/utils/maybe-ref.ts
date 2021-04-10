import { computed, ComputedRef, isRef, Ref } from 'vue';

export type MaybeRef<T> = T | Ref<T>;

export function normalizeMaybeRef<T>(v: MaybeRef<T>): ComputedRef<T> {
    return computed(() => (isRef(v) ? v.value : v));
}
