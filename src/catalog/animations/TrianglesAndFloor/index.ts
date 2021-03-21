import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'triangles',
    componentLoader: () => import('./Animation.vue'),
    summary: 'Triangles and Floor',
    category: 'three',
});
