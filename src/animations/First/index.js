import View from '@/components/ThreeSceneView';
import Animation from './Animation';

export default {
  route: {
    name: 'first',
    path: '/first',
    component: View,
    props: {
      AnimationClass: Animation,
    },
  },
  tile: 'First',
  // category: 'three.js',
};
