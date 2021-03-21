import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'galaxy',
    component: threeComponentFactory(() => import('./factory')),
    summary: 'Galaxy',
    category: 'three',
});
