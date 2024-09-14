import { createApp } from 'vue';
import './style.css';
import './icons.css';
import Root from './pages/root/index.vue';
import router from './router';

createApp(Root).use(router).mount('#app');
