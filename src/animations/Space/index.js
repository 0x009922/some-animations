import View from '@/components/ThreeSceneView';
import Animation from './Animation';

export default {
    route: {
        name: 'space',
        path: '/space',
        component: View,
        props: {
            AnimationClass: Animation,
        },
    },
    tile: 'Space',
    category: 'three',
};
