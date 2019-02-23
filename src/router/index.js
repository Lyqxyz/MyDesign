import Vue from 'vue'

import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const router=  new VueRouter({
  routes,
})

router.beforeEach((to,from,next)=>{

  next()

})
router.beforeResolve((to,from,next)=>{

  next()
})

router.afterEach((to, from) => {

})
export default router
