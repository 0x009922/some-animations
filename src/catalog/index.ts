import { RouteRecordRaw } from 'vue-router';
import { AnimationDefinition } from './types';

const animationsImport = import.meta.globEager('./animations/*/index.(ts|js)');

const items: AnimationDefinition[] = Object.values(animationsImport).map(({ default: x }) => x);

export function animationNameToRouteName(v: string): string {
    return `item-${v}`;
}

const catalogRoutes: RouteRecordRaw[] = items.map(({ name, component }) => ({
    name: animationNameToRouteName(name),
    path: `/perf/${name}`,
    component: component,
}));

export { items, catalogRoutes };
