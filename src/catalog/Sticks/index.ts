import { AnimationDefinition } from '../types';

const data: AnimationDefinition = {
    name: 'sticks',
    componentLoader: () => import('./Sticks.vue'),
    summary: 'Палочки',
    category: 'other',
};

export default data;
