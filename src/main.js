import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import MuseUI from 'muse-ui';
import Mock from './mock'

import MuseUiToast from 'muse-ui-toast'
import 'muse-ui/dist/muse-ui.css';

Mock();

Vue.use(MuseUI)

Vue.use(MuseUiToast);


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
