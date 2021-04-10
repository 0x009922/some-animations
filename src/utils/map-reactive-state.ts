import { computed, ComputedRef } from 'vue';

type Mapped<T, K extends keyof T> = {
    [prop in K]: ComputedRef<T[prop]>;
};

export function mapStatePartial<T, K extends keyof T>(state: T, keys: K[]): Mapped<T, K> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const target = {} as Mapped<T, K>;

    for (const key of keys) {
        target[key] = computed(() => state[key]);
    }

    return target;
}

// type Test = Mapped<
//     {
//         name: string;
//         age: number;
//     },
//     'age' | 'name'
// >;

export function mapState<T>(state: T): Mapped<T, keyof T> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const target = {} as Mapped<T, keyof T>;

    (Object.keys(state) as (keyof T)[]).forEach((key) => {
        target[key] = computed(() => state[key]);
    });

    return target;
}

// const {
//     name,
//     age
// } = mapState({ name: 'asdf', age: 412 })
