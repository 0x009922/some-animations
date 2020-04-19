import View from '@/components/ThreeSceneView';
import Animation from './Animation';

export default {
  route: {
    name: 'concentric-cubes',
    path: '/concentric-cubes',
    component: View,
    props: {
      AnimationClass: Animation,
    },
  },
  tile: 'Концентрические кубики',
};
