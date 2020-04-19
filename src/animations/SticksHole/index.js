import View from '@/components/ThreeSceneView';
import Animation from './Animation';

export default {
  route: {
    name: 'sticks-hole',
    path: '/sticks-hole',
    component: View,
    props: {
      AnimationClass: Animation,
    },
  },
  tile: 'Sticks hole',
  category: 'three',
};
