import Vue from 'vue'

import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const router=  new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {

    console.log(to)
    console.log(savedPosition);
    return { x: 0, y: 800 }
  }

})

router.beforeEach((to,from,next)=>{


  console.log('ccccccccccccccccccccc')

  // console.log(to)

  to.matched.some(record => {record.meta.a

    console.log(record.meta.a);
  }


)

  next()

})
router.beforeResolve((to,from,next)=>{

  console.log('aaaaaaaaaaaaaaaa')



  next()
})

router.afterEach((to, from) => {

  console.log('bbbbbbbbbbbbbbbbbbbbbbb')
})
export default router
