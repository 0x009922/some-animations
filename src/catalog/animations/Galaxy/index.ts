import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'galaxy',
    componentLoader: () => import('./Galaxy.vue'),
    summary: 'Galaxy',
    category: 'three',
});
