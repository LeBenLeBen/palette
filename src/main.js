import Vue from 'vue';
import Clipboard from 'v-clipboard';

import App from './App.vue';
import Icon from '@/components/Icon';

import '@/assets/scss/main.scss';

Vue.config.productionTip = false;
Vue.use(Clipboard);
Vue.component('Icon', Icon);

new Vue({
  render: h => h(App),
}).$mount('#app');
