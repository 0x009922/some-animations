import ThreeFirst from './three/first'
import ThreeHexagon from './three/hexagon-experiment'
import ThreeSpace from './three/space'
import ThreeTriangles from './three/triangles-n-floor'

import CompNEF from '../views/NeverEndingFun'
import CompThreeSimple from '../views/SimpleThree'

export default {
  three: [
    {
      name: 'Triangles and Floor',
      path: '/triangles-and-floor',
      component: CompThreeSimple,
      props: {
        AnimationClass: ThreeTriangles
      }
    },
    {
      name: 'Space',
      path: '/space',
      component: CompThreeSimple,
      props: {
        AnimationClass: ThreeSpace
      }
    },
    {
      name: 'Hexagon Experiment',
      path: '/hexagon-experiment',
      component: CompThreeSimple,
      props: {
        AnimationClass: ThreeHexagon
      }
    },
    {
      name: 'First',
      path: '/first',
      component: CompThreeSimple,
      props: {
        AnimationClass: ThreeFirst
      }
    }
  ],
  canvas: [
    {
      name: 'Never ending fun',
      path: '/never-ending-fun',
      component: CompNEF
    }
  ]
}
