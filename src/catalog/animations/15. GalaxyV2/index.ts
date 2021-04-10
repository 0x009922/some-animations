import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'galaxy-v2',
    component: () => import('./GalaxyV2.vue'),
    summary: 'Galaxy v2',
    category: 'canvas',
});
