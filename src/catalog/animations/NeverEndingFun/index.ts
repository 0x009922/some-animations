import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'never-ending-fun',
    component: () => import('./nef.vue'),
    summary: 'Never Ending Fun',
    category: 'canvas',
});
