import Vue from 'vue'

import Vuex from 'vuex'

import state from './state'
import actions from './actions'

import getters from './getter'

import mutations from './mutations'

import A from './modules/a'

import B from './modules/b'
Vue.use(Vuex)

const store = new Vuex.Store({

    state,
    actions,
    getters,
    mutations,
    modules:{
      a:A,
      b:B,
    },
    // strict: true,

})

export default store
