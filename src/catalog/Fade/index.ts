import { AnimationDefinition } from '../types';

const def: AnimationDefinition = {
    name: 'fade',
    componentLoader: () => import('./Fade.vue'),
    summary: 'Fade',
    category: 'canvas',
};

export default def;
