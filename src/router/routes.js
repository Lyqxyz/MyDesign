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
import Reg from '../components/reg/Reg'
import Login from '../components/login/Login'
import OrderDetails from '../components/details/OrderDetails'
import Sent from '../components/sent/Sent'
import UpdateBook from '../components/update/UpdateBook'
import UpdateGoods from '../components/update/UpdateGoods'
import UpdatePic from '../components/updatePic/UpdatePic'
import UpdatePhoto from '../components/updatePhoto/UpdatePhoto'
import Find from '../components/find/Find'

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
    {path:'/ShopCar',components:{'header':ShopCar},name:'ShopCar',meta:{isLogin:true}},
    {path:'/MyPushlish',components:{'header':MyPublish},name:'MyPublish',meta:{isLogin:true}},
    {path:'/search/:id',components:{'header':Search},name:'Search'},
    {path:'/showDetails/:id',components:{'header':Details},name:'Details'},
    {path:'/PublishBook/',components:{'header':PublishBook},name:'PublishBook',meta:{isLogin:true}},
    {path:'/PublishGoods/',components:{'header':PublishGoods},name:'PublishGoods',meta:{isLogin:true}},
    {path:'/AddImage/:id',components:{'header':AddImage},name:'AddImage',meta:{isLogin:true}},
    {path:'/allClass',components:{'header':AllClass},name:'AllClass'},
    {path:'/order',components:{'header':Order},name:'Order',meta:{isLogin:true}},
    {path:'/orderDetails/:id',components:{'header':OrderDetails},name:'OrderDetails',meta:{isLogin:true}},
    {path:'/login',components:{'center':Login},name:'Login'},
    {path:'/reg',components:{'center':Reg},name:'Reg'},
    {path:'/sent',components:{'center':Sent},name:'Sent',meta:{isLogin:true}},
    {path:'/updateBook/:id',components:{'header':UpdateBook},name:'updateBook',meta:{isLogin:true}},
    {path:'/updateGoods/:id',components:{'header':UpdateGoods},name:'updateGoods',meta:{isLogin:true}},
    {path:'/updatePic/:id',components:{'header':UpdatePic},name:'updatePic',meta:{isLogin:true}},
    {path:'/updatePhoto',components:{'header':UpdatePhoto},name:'updatePhoto',meta:{isLogin:true}},
    {path:'/find',components:{'header':Find},name:'find'},
    {path :'*',redirect:'/'}

]
