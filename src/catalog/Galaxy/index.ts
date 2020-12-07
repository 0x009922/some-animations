import { AnimationDefinition } from '../types';

const def: AnimationDefinition = {
    name: 'galaxy',
    componentLoader: () => import('./Galaxy.vue'),
    summary: 'Galaxy',
    category: 'three',
};

export default def;
