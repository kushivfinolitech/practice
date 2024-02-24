

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';
import { i18n } from './i18n/index.js';
import ToastService from 'primevue/toastservice';

const app = createApp(App)
app.use(ToastService);
app.use(i18n);
app.use(PrimeVue);
app.mount('#app');
