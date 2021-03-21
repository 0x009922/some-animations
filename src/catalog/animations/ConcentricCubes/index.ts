import { threeComponentFactory } from '~/catalog/three-component-factory';
import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'concentric-cubes',
    component: threeComponentFactory(() => import('./factory')),
    summary: 'Концентрические кубики',
    category: 'three',
});
