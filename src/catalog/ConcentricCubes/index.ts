import { AnimationDefinition } from '../types';

const def: AnimationDefinition = {
    name: 'concentric-cubes',
    componentLoader: () => import('./Cubes.vue'),
    summary: 'Концентрические кубики',
    category: 'three',
};

export default def;
