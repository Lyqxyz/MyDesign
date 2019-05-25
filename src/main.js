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

    if(value===null||value===''||value===undefined||value==='undefined'){
        return 'http://localhost:8080/img/no.jpg'
    }
    return 'http://localhost:8080'+value;

})
Vue.filter('handleNull',(value)=>{
    if(value===undefined){
        return '匿名'
    }
    return value ==null?'匿名' :value;
})

Vue.filter('pass',(value)=>{
    let v= parseInt(value)
    switch (v) {
        case 1:
            return '通过'
        case 0:
            return '待审核'
        case -1:
            return '未通过'
        default:
            return '未知'
    }
})

Vue.filter('day',(value)=>{

    return  dayjs().to(dayjs(value))
})

Vue.filter('userPhoto',(value)=>{

    if(value===null||value===''||value===undefined||value==='undefined'){
        return 'http://localhost:8080/img/timg.jpg'
    }
    return 'http://localhost:8080'+value;
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
