import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/TheHome';

import animations from '@/animations';

Vue.use(Router);

export default new Router({
  routes: [
    ...animations.map((val) => val.route),
    // ...animations.three,
    // ...animations.other,
    {
      path: '*',
      name: 'home',
      component: Home,
    },
  ],
});
