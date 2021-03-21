import { RouteRecordRaw } from 'vue-router';
import { AnimationDefinition } from './types';

const animationsImport = import.meta.globEager('./animations/*/index.(ts|js)');

// const animationsList: { name: string; def: AnimationDefinition }[] = Object.entries(animationsImport).map(
//     ([filename, { default: def }]) => {
//         const match = filename.match(/^\.\/animations\/(.+)\/index.(ts|js)$/);
//         if (!match) throw new Error(`No match for path ${filename}`);
//         const [, name] = match;
//         return { name, def };
//     },
// );
// console.log(animationsList);

const items: AnimationDefinition[] = Object.values(animationsImport).map(({ default: x }) => x);

console.log(items);

export function animationNameToRouteName(v: string): string {
    return `item-${v}`;
}

const catalogRoutes: RouteRecordRaw[] = items.map(({ name, component }) => ({
    name: animationNameToRouteName(name),
    path: `/perf/${name}`,
    component: component,
}));

export { items, catalogRoutes };
