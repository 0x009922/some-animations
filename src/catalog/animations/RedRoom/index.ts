import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'red-room',
    component: threeComponentFactory(() => import('./factory')),
    summary: 'Red Room',
    category: 'three',
});
