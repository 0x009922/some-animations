import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'triangles',
    component: threeComponentFactory(() => import('./create')),
    summary: 'Triangles and Floor',
    category: 'three',
});
