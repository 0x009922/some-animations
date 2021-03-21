import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: 'red-room',
    componentLoader: () => import('./RedRoom.vue'),
    summary: 'Red Room',
    category: 'three',
});
