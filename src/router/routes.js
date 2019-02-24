import PublishBook from '../components/publish/PublishBook'
import GoodsList from '../components/index/Goods'
import Header from '../components/index/Header'
import Center from '../components/index/Center'
import AddImage from '../components/addImage/AddImage'
import PublishGoods from '../components/publish/PublishGoods'

import Details from '../components/details/Details'

export default [
    {
        path:'/',
        components: {
            'footer':GoodsList,
            'header':Header,
            'center':Center
        },
        name:'index'
    },
    {path:'/showDetails/:id',components:{'header':Details},name:'Details'},
    {path:'/PublishBook/',components:{'header':PublishBook},name:'PublishBook'},
    {path:'/PublishGoods/',components:{'header':PublishGoods},name:'PublishGoods'},
    {path:'/AddImage/:id',components:{'header':AddImage},name:'AddImage'},
    {path :'*',redirect:'/'}

]
