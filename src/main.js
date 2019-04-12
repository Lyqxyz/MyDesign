import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import MuseUI from 'muse-ui';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/zh-cn'
import 'muse-ui/dist/muse-ui.css';

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
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

Vue.filter('day',(value)=>{


    return  dayjs().to(dayjs(value))

})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
