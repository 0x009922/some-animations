import { AnimationDefinition } from '../types';

const data: AnimationDefinition = {
    name: 'triangles',
    componentLoader: () => import('./Animation.vue'),
    summary: 'Triangles and Floor',
    category: 'three',
};

export default data;
