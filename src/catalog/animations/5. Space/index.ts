import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'space',
    component: threeComponentFactory(() => import('./factory')),
    summary: 'Space',
});
