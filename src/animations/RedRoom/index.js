import View from '@/components/ThreeSceneView';
import Animation from './Animation';

export default {
  route: {
    name: 'red-room',
    path: '/red-room',
    component: View,
    props: {
      AnimationClass: Animation,
    },
  },
  tile: 'Red Room',
};
