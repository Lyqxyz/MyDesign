import Vue from 'vue'

import VueRouter from 'vue-router'

import routes from './routes'

import storage from '../assets/utils/StorageUtils'

import Message from 'muse-ui-message/dist/muse-ui-message'
Vue.use(VueRouter)

const router=  new VueRouter({
  routes,
})

router.beforeEach((to,from,next)=>{

  let {isLogin} =to.meta

  let user= storage.getStorage('user',true)

  if(isLogin){

    if(user.length===0){

      Message.alert('亲,你还没有登录哟','登录').then(res=>{

        let {result} = res;

        if(result){

          router.replace({name:'Login'})
        }
      })

    }else{

      next()
    }

  }else{

    next()

  }


})
router.beforeResolve((to,from,next)=>{

  next()
})

router.afterEach((to, from) => {

})
export default router
