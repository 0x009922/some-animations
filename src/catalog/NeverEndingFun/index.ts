import { AnimationDefinition } from '../types';

const def: AnimationDefinition = {
    name: 'never-ending-fun',
    componentLoader: () => import('./nef.vue'),
    summary: 'Never Ending Fun',
    category: 'canvas',
};

export default def;
