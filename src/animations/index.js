import ThreeFirst from './three/first'
import ThreeHexagon from './three/hexagon-experiment'
import ThreeSpace from './three/space'
import ThreeTriangles from './three/triangles-n-floor'
import ThreeGalaxy from './three/galaxy'

import CanvasGalaxyV2 from './canvas/galaxy-v2'

import CompNEF from '../views/NeverEndingFun'
import CompSticks from '../views/Sticks'
import CompGalaxyV2 from '../views/GalaxyV2'

import CompThreeSimple from '../views/SimpleThree'

export default {
  three: [
    {
      name: 'Galaxy',
      path: '/three-galaxy',
      component: CompThreeSimple,
      props: {
        AnimationClass: ThreeGalaxy
      }
    },
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
  other: [
    {
      name: 'Galaxy v2',
      path: '/galaxy-v2',
      component: CompGalaxyV2,
      props: {
        SceneClass: CanvasGalaxyV2
      }
    },
    {
      name: 'Sticks',
      path: '/sticks',
      component: CompSticks
    },
    {
      name: 'Never ending fun',
      path: '/never-ending-fun',
      component: CompNEF
    }
  ]
}
