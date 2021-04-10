import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'do-you-want-to-talk',
    component: threeComponentFactory(() => import('./factory')),
    summary: 'Do you want to talk?',
    category: 'three',
});
