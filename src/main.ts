import 'virtual:windi.css';
import './style/transitions.sass';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ThreeAnimation from './modules/simple-three-setup/ThreeAnimation.vue';

createApp(App).use(router).component(ThreeAnimation.name, ThreeAnimation).mount('#app');
