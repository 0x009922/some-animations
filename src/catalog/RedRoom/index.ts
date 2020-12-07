import { AnimationDefinition } from '../types';

const def: AnimationDefinition = {
    name: 'red-room',
    componentLoader: () => import('./RedRoom.vue'),
    summary: 'Red Room',
    category: 'three',
};

export default def;
