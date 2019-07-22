import Vue from 'vue'
import Router from 'vue-router'
// import ViewFirst from './views/First'
// import ViewNEF from './views/NeverEndingFun'
// import SimpleThree from './views/SimpleThree'
// import Home from './views/Home.vue'

import animations from './animations'

Vue.use(Router)

export default new Router({
  routes: [...animations.three, ...animations.canvas]
})
