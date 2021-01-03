import { AnimationDefinition } from '../types';

const data: AnimationDefinition = {
    name: 'space',
    componentLoader: () => import('./Space.vue'),
    summary: 'Space',
};

export default data;
