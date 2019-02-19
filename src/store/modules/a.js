export default {
  namespaced:true,
  state:{
    a:1
  },
  getters:{

    isA(state,getters,rootState,rootGetters){

      console.log(getters);
      console.log(rootGetters);
      return state.a+rootState.count
    }

  },
  actions:{

    inA(context){

      console.log(context);
      context.commit('inA')
    }
  },
  mutations: {
    inA(state){

      state.a++
    }

  }



}
