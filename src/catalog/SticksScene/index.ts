import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'sticks-scene',
    component: () => import('./Animation.vue'),
    summary: 'Sticks scene',
    category: 'three',
};

export default def;
