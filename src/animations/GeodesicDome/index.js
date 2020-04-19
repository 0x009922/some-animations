import View from '@/components/ThreeSceneView';
import Animation from './Animation';

export default {
  route: {
    name: 'geo',
    path: '/geodesic-dome',
    component: View,
    props: {
      AnimationClass: Animation,
    },
  },
  tile: 'Геодезический купол',
  category: 'three',
};
