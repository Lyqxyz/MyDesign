
import PublishGoods from '../components/PublishGoods'
import Goods from '../components/Goods'
export default [

    {path:'/',components: {'foot': Goods},name:'index'},
    {path:'/publicGoods',components:{'foot':PublishGoods},name:'PublishGoods'},
    {path :'*',redirect:'/'}

]
