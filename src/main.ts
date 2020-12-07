import './style/index.sass';
import '@mdi/font/scss/materialdesignicons.scss';
import 'equal-vue/dist/equal.css';

import { createApp } from 'vue';
import { Button } from 'equal-vue';
import App from './App.vue';
import router from './router';
import ThreeAnimation from './modules/simple-three-setup/ThreeAnimation.vue';
// import store from './store';
// import Sparks from './directives/Sparks';
// import {}

// import setupTicks from './animations/setup-ticks';
// import './assets/sass/style.sass';

// setupTicks(store);

createApp(App).use(router).use(Button).component(ThreeAnimation.name, ThreeAnimation).mount('#app');

// Vue.directive('sparks', Sparks);

// Vue.config.productionTip = false;

// new Vue({
//     router,
//     store,
//     render: (h) => h(App),
// }).$mount('#app');
