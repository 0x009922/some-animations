import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'v',
    component: () => import('./V.vue'),
    summary: 'V',
});
