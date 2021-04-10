import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'pairs',
    component: () => import('./Pairs.vue'),
    summary: 'Pairs',
    category: 'other',
});
