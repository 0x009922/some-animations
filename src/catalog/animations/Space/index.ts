import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'space',
    componentLoader: () => import('./Space.vue'),
    summary: 'Space',
});
