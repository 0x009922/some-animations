import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'sticks',
    componentLoader: () => import('./Sticks.vue'),
    summary: 'Палочки',
    category: 'other',
});
