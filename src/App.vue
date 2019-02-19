<template>
  <div id="app">
      <router-link to="/home/5">主页</router-link>
      <router-link to="/new">新闻页</router-link>
      <router-link :to="{name :'home',params:{id:10}}">主页1</router-link>
      <router-link :to="{path :'/new',query:{name:'jack'}}">新闻页1</router-link>
      <!--<a href="" @click.prevent="goHome">去主页</a>-->
      <!--<a href="">去去新闻页</a>-->
      <router-link to="/b">别名去新闻页</router-link>
      <button @click="add">点击add</button>
      <button @click="add1">点击add1</button>

      <router-view></router-view>
  </div>
</template>

<script>

  import {mapActions,mapState,mapMutations,mapGetters} from 'vuex'
  import axios from 'axios'
  import SockJs from 'sockjs-client'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      n:10,
    }
  },
  methods:{
   
    add(){

      // axios.get('http://localhost:8888/login',{}).then(res=>{
      //
      //   console.log(res.data)
      // }).catch(err=>{
      //
      //   console.log(err)
      // })
      axios.post("http://localhost:8888/tologin",'username=admin&pwd=1234',
        {

        headers:{
          'Content-type':'application/x-www-form-urlencoded'

        }
      }).then(res=>{

        console.log(res.data)
      }).catch(err=>{

        console.log(err)
      })

    },
    add1(){
      axios.get('http://localhost:8080/role/info/1/3',{}).then(res=>{

        console.log(res.data)
      }).catch(err=>{

        console.log(err)
      })

    },
    dev(){

      this.dev1();

    },
    mutation(){

     this.dev2()
    }
  },
  computed:{
    ...mapState({

      countAlias:'count',
      count1(state){

        return state.count+this.n
      },
      froma:'a',

    }),
    ...mapGetters({
      double:'d',
      isB:'b/isB',
      isA1:'a/isA',

    })

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
