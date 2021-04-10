import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'hexagons',
    component: threeComponentFactory(() => import('./factory')),
    summary: 'Hexagon experiment',
    category: 'three',
});
