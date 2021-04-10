import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'fade',
    component: () => import('./Fade.vue'),
    summary: 'Fade',
    category: 'canvas',
});
