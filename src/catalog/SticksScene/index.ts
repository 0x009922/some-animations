import asyncComponentFactory from '../async-component-factory';
import { AnimationDefinition } from '../types';

const def: AnimationDefinition = {
    name: 'sticks-scene',
    componentLoader: () => import('./Animation.vue'),
    summary: 'Sticks scene',
    category: 'three',
};

export default def;
