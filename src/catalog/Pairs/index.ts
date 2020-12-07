import { AnimationDefinition } from '../types';

const def: AnimationDefinition = {
    name: 'pairs',
    componentLoader: () => import('./Pairs.vue'),
    summary: 'Pairs',
    category: 'other',
};

export default def;
