import {SOME_MUTATION,DECREMENT} from './mutation-types'


export default {


  [SOME_MUTATION] (state,{a}) {
    console.log(state);
    console.log(a);
    state.count+=a+1
  },
  [DECREMENT](state){

    state.count--;
  }


}
