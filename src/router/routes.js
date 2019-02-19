import Home from '../components/home.vue'

import New from '../components/new.vue'
export default [
  {path:'/home/:id',name:'home',component:Home,alias: '/m/:id',props:true,

    beforeEnter: (to, from, next) => {
        console.log(to)
        next()
    },
    meta:{a:true,c:'ok'},
    children: [
      // 当 /user/:id 匹配成功，
      // UserHome 会被渲染在 User 的 <router-view> 中
      { path: 'new', component: New },

      // ...其他子路由
    ]
  },

  {path:'/new',name:'new',component:New,alias:['/b/:id','/n'], meta:{b:true},},


  {path :'/a',redirect:'/home'},

]
