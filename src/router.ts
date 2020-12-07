import { createRouter, createWebHashHistory } from 'vue-router';
import { catalogRoutes } from './catalog';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./components/TheHome.vue'),
        },
        ...catalogRoutes,
        {
            path: '/:catchAll(.*)',
            redirect: { name: 'home' },
        },
    ],
});

export default router;
