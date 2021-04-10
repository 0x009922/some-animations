import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'asymptotic',
    component: threeComponentFactory(() => import('./factory')),
    category: 'three',
    summary: 'Asymptotic',
});
