import PublishBook from '../components/publish/PublishBook'
import GoodsList from '../components/index/Goods'
import Header from '../components/index/Header'
import Center from '../components/index/Center'
import AddImage from '../components/addImage/AddImage'
import PublishGoods from '../components/publish/PublishGoods'
import Details from '../components/details/Details'
import AllClass from '../components/class/AllClass'
import Search from '../components/search/Search'
import MyPublish from '../components/myPublish/MyPublish'
import ShopCar from '../components/shopcar/ShopCar'
import Order from '../components/order/order'

import OrderDetails from '../components/details/OrderDetails'

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
    {path:'/ShopCar',components:{'header':ShopCar},name:'ShopCar'},
    {path:'/MyPushlish',components:{'header':MyPublish},name:'MyPublish'},
    {path:'/search/:id',components:{'header':Search},name:'Search'},
    {path:'/showDetails/:id',components:{'header':Details},name:'Details'},
    {path:'/PublishBook/',components:{'header':PublishBook},name:'PublishBook'},
    {path:'/PublishGoods/',components:{'header':PublishGoods},name:'PublishGoods'},
    {path:'/AddImage/:id',components:{'header':AddImage},name:'AddImage'},
    {path:'/allClass',components:{'header':AllClass},name:'AllClass'},
    {path:'/order',components:{'header':Order},name:'Order'},
    {path:'/orderDetails/:id',components:{'header':OrderDetails},name:'OrderDetails'},
    {path :'*',redirect:'/'}

]
