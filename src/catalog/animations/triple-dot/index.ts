import { defineAnimation } from '~/catalog/types';

export default defineAnimation({
    name: '...',
    componentLoader: () => import('./....vue'),
    summary: '...',
    category: 'other',
});
