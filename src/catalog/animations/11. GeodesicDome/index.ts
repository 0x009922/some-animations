import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'geodesic-dome',
    component: threeComponentFactory(() => import('./factory')),
    summary: 'Geodesic Dome',
    category: 'three',
});
