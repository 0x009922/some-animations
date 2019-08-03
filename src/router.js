import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import animations from './animations'

Vue.use(Router)

export default new Router({
  routes: [
    ...animations.three,
    ...animations.other,
    {
      path: '*',
      component: Home
    }
  ]
})
