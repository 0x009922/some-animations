import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'fade',
    componentLoader: () => import('./Fade.vue'),
    summary: 'Fade',
    category: 'canvas',
});
