import View from '@/components/ThreeSceneView';
import Animation from './Animation';

export default {
    route: {
        name: 'galaxy',
        path: '/galaxy',
        component: View,
        props: {
            AnimationClass: Animation,
        },
    },
    tile: 'Galaxy',
    category: 'three',
};
