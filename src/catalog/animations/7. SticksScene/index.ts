import { defineAnimation } from '~/catalog/types';
import { threeComponentFactory } from '../../three-component-factory';

export default defineAnimation({
    name: 'sticks-scene',
    component: threeComponentFactory(() => import('./create')),
    summary: 'Sticks scene',
    category: 'three',
});
