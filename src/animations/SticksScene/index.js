import View from '@/components/ThreeSceneView';
import Animation from './Animation';

export default {
  route: {
    name: 'sticks-scene',
    path: '/sticks-scene',
    component: View,
    props: {
      AnimationClass: Animation,
    },
  },
  tile: 'Sticks scene',
};
