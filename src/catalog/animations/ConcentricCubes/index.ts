import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'concentric-cubes',
    componentLoader: () => import('./Cubes.vue'),
    summary: 'Концентрические кубики',
    category: 'three',
});
