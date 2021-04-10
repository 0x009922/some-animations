import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'sticks',
    component: () => import('./Sticks.vue'),
    summary: 'Палочки',
    category: 'other',
});
