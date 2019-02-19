export default {
  namespaced:true,
  state:{
    b:1
  },
  getters:{
    isB(state){

      return state.b%2===0
    }

  },
  actions:{
    inB(context){
      context.commit('inB')
    }
  },
  mutations: {
    inB(state){

      state.b++
    }

  }

}
