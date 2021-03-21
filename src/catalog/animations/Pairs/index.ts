import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'pairs',
    componentLoader: () => import('./Pairs.vue'),
    summary: 'Pairs',
    category: 'other',
});
