import { RouteRecordRaw } from 'vue-router';
import { AnimationDefinition } from './types';
import asyncComponentFactory from './async-component-factory';

import V from './V';
import TripleDot from './triple-dot';
import TrianglesAndFloor from './TrianglesAndFloor';
import SticksScene from './SticksScene';
import Fade from './Fade';
import NEF from './NeverEndingFun';
import Pairs from './Pairs';
import RedRoom from './RedRoom';
import GalaxyV2 from './GalaxyV2';
import Galaxy from './Galaxy';
import Cubes from './ConcentricCubes';

const items: AnimationDefinition[] = [
    V,
    TripleDot,
    TrianglesAndFloor,
    SticksScene,
    Fade,
    NEF,
    Pairs,
    RedRoom,
    Galaxy,
    GalaxyV2,
    Cubes,
];

export function animationNameToRouteName(v: string): string {
    return `item-${v}`;
}

const catalogRoutes: RouteRecordRaw[] = items.map((x) => ({
    name: animationNameToRouteName(x.name),
    path: `/item/${x.name}`,
    component: asyncComponentFactory(x.componentLoader),
}));

export { items, catalogRoutes };
