import View from '~/components/ThreeSceneView';
import Animation from './Animation';

export default {
    route: {
        name: 'do-you-want-to-talk',
        path: '/do-you-want-to-talk',
        component: View,
        props: {
            AnimationClass: Animation,
        },
    },
    tile: 'Do you want to talk?',
    category: 'three',
};
