
import PublishBook from '../components/PublishBook'
import GoodsList from '../components/index/Goods'

import Header from '../components/index/Header'

import Center from '../components/index/Center'

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
    {path:'/PublishBook',components:{'header':PublishBook},name:'PublishBook'},
    {path :'*',redirect:'/'}

]
