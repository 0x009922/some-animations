import asyncComponentFactory from '../async-component-factory';
import { AnimationDefinition } from '../types';

const def: AnimationDefinition = {
    name: 'galaxy-v2',
    componentLoader: () => import('./GalaxyV2.vue'),
    summary: 'Galaxy v2',
    category: 'canvas',
};

export default def;
