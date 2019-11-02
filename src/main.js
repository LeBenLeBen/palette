import Vue from 'vue';
import Clipboard from 'v-clipboard';

import App from './App.vue';
import Icon from '@/components/Icon';
import Btn from '@/components/Btn';

import '@/assets/postcss/main.css';

Vue.config.productionTip = false;

Vue.use(Clipboard);

Vue.component('Icon', Icon);
Vue.component('Btn', Btn);

new Vue({
  render: h => h(App),
}).$mount('#app');
