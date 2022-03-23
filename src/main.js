import { createApp } from 'vue';
import Chusho, {
  $chusho,
  mergeDeep,
  CBtn,
  CFormGroup,
  CIcon,
  CLabel,
  CTextField,
  CSelect,
  CSelectBtn,
  CSelectOptions,
  CSelectOption,
} from 'chusho';

import App from './App.vue';
import chushoConfig from '../chusho.config.js';

import '@/assets/postcss/main.css';

const app = createApp(App);

app.use(Chusho, chushoConfig);

app.component('CBtn', CBtn);
app.component('CFormGroup', CFormGroup);
app.component('CIcon', CIcon);
app.component('CLabel', CLabel);
app.component('CTextField', CTextField);
app.component('CSelect', CSelect);
app.component('CSelectBtn', CSelectBtn);
app.component('CSelectOptions', CSelectOptions);
app.component('CSelectOption', CSelectOption);

app.mount('#app');

if (import.meta.hot) {
  import.meta.hot.accept('../chusho.config.js', (newConfig) => {
    mergeDeep($chusho.options, newConfig.default);
  });
}
