import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'galaxy-v2',
    componentLoader: () => import('./GalaxyV2.vue'),
    summary: 'Galaxy v2',
    category: 'canvas',
});
