import {SOME_MUTATION,DECREMENT} from './mutation-types'

export default {

  increment (context,n) {
    context.commit(SOME_MUTATION,n)
    // console.log(context);
    // context.commit(SOME_MUTATION)
  },
  decrement(context){
    console.log(context);
    context.commit(DECREMENT)

  }

}
