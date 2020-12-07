import { AnimationDefinition } from '../types';

const data: AnimationDefinition = {
    name: 'v',
    componentLoader: () => import('./V.vue'),
    summary: 'V',
};

export default data;
