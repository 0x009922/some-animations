import View from '~/components/ThreeSceneView';
import Animation from './Animation';

export default {
    route: {
        name: 'asymptotic',
        path: '/asymptotic',
        component: View,
        props: {
            AnimationClass: Animation,
        },
    },
    tile: 'Асимптотическая',
    category: 'three',
};
