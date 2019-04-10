import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import MuseUI from 'muse-ui';

import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI)

Vue.filter('url',(value)=>{

    return 'http://localhost:8080'+value;

})
Vue.filter('handleNull',(value)=>{

    if(value===undefined){
        return '匿名'
    }

    return value ==null?'匿名' :value;

})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
