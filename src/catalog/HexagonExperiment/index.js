import View from '~/components/ThreeSceneView';
import Animation from './Animation';

export default {
    route: {
        name: 'hexagons',
        path: '/hexagons',
        component: View,
        props: {
            AnimationClass: Animation,
        },
    },
    tile: 'Hexagon experiment',
    category: 'three',
};
