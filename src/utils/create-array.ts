export function createArrayFrom<T>(count: number, factory: (index: number) => T): T[] {
    return Array.from(new Array(count), (v, k) => factory(k));
}
