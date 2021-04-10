import { RouteRecordRaw } from 'vue-router';
import { AnimationDefinition } from './types';

const animationsImport = import.meta.globEager('./animations/*/index.ts');

interface OrderedAnimationDefinition extends AnimationDefinition {
    order: number;
}

const items = Object.entries(animationsImport)
    .reduce<OrderedAnimationDefinition[]>((prev, [path, { default: x }]) => {
        const match = path.match(/animations\/(\d+).*\/index.ts$/);
        if (!match) throw new Error(`Invalid animation path: ${path}`);
        const order = Number(match[1]);
        prev.push({ ...x, order });
        return prev;
    }, [])
    .sort((a, b) => a.order - b.order);

export function animationNameToRouteName(v: string): string {
    return `item-${v}`;
}

const catalogRoutes: RouteRecordRaw[] = items.map(({ name, component }, index) => ({
    name: animationNameToRouteName(name),
    path: `/perf/${index + 1}-${name}`,
    component: component,
}));

export { items, catalogRoutes };
