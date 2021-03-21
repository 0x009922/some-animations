import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'v',
    componentLoader: () => import('./V.vue'),
    summary: 'V',
});
