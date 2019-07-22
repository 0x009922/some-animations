import Vue from 'vue'
import Router from 'vue-router'
// import ViewFirst from './views/First'
import ViewNEF from './views/NeverEndingFun'
import SimpleThree from './views/SimpleThree'
// import Home from './views/Home.vue'
import ThreeFirst from './animations/three/first'
import ThreeHexagon from './animations/three/hexagon-experiment'
import ThreeSpace from './animations/three/space'
import ThreeTrianglesAndFloor from './animations/three/triangles-n-floor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/first',
      component: SimpleThree,
      props: {
        animationClass: ThreeFirst
      }
    },
    {
      path: '/hexagon-experiment',
      component: SimpleThree,
      props: {
        animationClass: ThreeHexagon
      }
    },
    {
      path: '/space',
      component: SimpleThree,
      props: {
        animationClass: ThreeSpace
      }
    },
    {
      path: '/triangles-and-floor',
      component: SimpleThree,
      props: {
        animationClass: ThreeTrianglesAndFloor
      }
    },
    {
      path: '/never-ending-fun',
      component: ViewNEF
    }
  ]
})
