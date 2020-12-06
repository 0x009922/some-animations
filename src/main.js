import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Sparks from './directives/Sparks';
import setupTicks from './animations/setup-ticks';
import './assets/sass/style.sass';

setupTicks(store);

Vue.directive('sparks', Sparks);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
