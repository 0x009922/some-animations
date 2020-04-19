import View from '@/components/ThreeSceneView';
import Animation from './Animation';

export default {
  route: {
    name: 'triangles',
    path: '/triangles',
    component: View,
    props: {
      AnimationClass: Animation,
    },
  },
  tile: 'Triangles and floor',
};
