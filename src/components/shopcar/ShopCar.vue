<template>
    <div>
        <common-header title="购物车"></common-header>
        <p class="shopCar" v-if="has">购物车空空如也！！！</p>
        <mu-paper :z-depth="1" class="demo-list-wrap">
            <mu-list v-for="item in info" :key="item.shopCarId" textline="two-line">
                <mu-list-item v-if="item.shopCarOkBook===1" avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon color="primary" value="book"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title @click="go(item)">{{item.shBook.bookName}}</mu-list-item-title>
                        <mu-list-item-sub-title>
                            数量:{{item.shopCarCount}}=>
                            单价:{{item.shBook.bookSellingPrice}}=>
                            {{item.shopCarCreationTime | day}}
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon @click="deleteShopCar(item)">
                            <mu-icon color="red" value="delete"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>

                <mu-list-item v-if="item.shopCarOkBook===0" avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon value="folder"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>{{item.shGoods.goodsTitle}}</mu-list-item-title>
                        <mu-list-item-sub-title>
                            数量:{{item.shopCarCount}}=>
                            单价:{{item.shGoods.goodsSellingPrice}}=>
                            {{item.shopCarCreationTime | day}}
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon @click="deleteShopCar(item)">
                            <mu-icon color="red" value="delete"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
        </mu-paper>
        <mu-row  v-if="!has">
            <p class="shopCar">总价：{{price}}元</p>
        </mu-row>
        <mu-row v-if="!has">
            <mu-button round :disabled="disabled" full-width color="primary" @click="order">{{text}}</mu-button>
        </mu-row>
    </div>
</template>

<script>
    import CommonHeader from '../common/Header'

    import storage from '../../assets/utils/StorageUtils'

    import http from '../../api'

    import Message from 'muse-ui-message/dist/muse-ui-message'

    import toast from 'muse-ui-toast/dist/muse-ui-toast'

    import Qs from 'qs'

    export default {
        name: "shopcar",
        components: {CommonHeader},
        created() {

            let user = storage.getStorage("user",true)

            let userId= user.userId;

            let url = `/shopcar/user/${userId}`

            http.get(url).then(res=>{
                this.info = res.data.info.data
                console.log(res)
            }).catch(err=>{

                Message.alert('网络错误请稍后再试!!!','消息提示')

            })
        },
        data(){

            return {
                info:[],
                disabled:false,
                text:'收入口袋'
            }
        },
        methods:{
            deleteShopCar(item){

                let num;
                this.info.find((a,index)=>{
                    if(a===item){
                        num=index
                    }
                })

                Message.confirm('确认删除!','提示',{
                    warningIcon:'priority_high'
                }).then(res=>{
                    let {result}=res
                    if(result){

                        http.get('/shopcar/delete/'+item.shopCarId).then(res=>{

                            let {code} = res.data

                            if(code==='1'){
                                this.info.splice(num,1)
                                toast.success({
                                    message:'删除成功',
                                    position:'top',
                                    close:true,
                                })
                            }else{

                                toast.success({
                                    message:'删除失败',
                                    position:'top',
                                    close:true,
                                })
                            }
                        }).catch(err=>{
                            toast.success({
                                message:'网络请求失败',
                                position:'top',
                                close:true,
                            })
                        })



                    }
                })


            },
            order(){


                Message.prompt('请输入收货地址','消息提示').then(res=>{

                    let {result,value} = res

                    if(result){

                        if(value==='undefined'||value===undefined){

                            toast.success({
                                message:'请输入地址',
                                position:'top',
                                close:true,
                            })

                        }else{

                            let orderUid=storage.getStorage('user',true).userId

                            let orderPrice =this.price

                            let orderAddress=value

                            let shopcars = JSON.stringify(this.info)

                            let data ={

                                orderUid,
                                orderPrice,
                                orderAddress,
                                shopcars,
                            }

                            let postData= Qs.stringify(data)

                            this.disabled=true;
                            this.text='正在创建订单,请耐心等待...'

                            http.post('/order/add',postData).then(res=>{

                                let {code} = res.data

                                if(code==='1'){

                                    this.disabled=false;
                                    this.text='收入口袋'
                                    this.$router.replace({name:'Order'})
                                }else{

                                    Message.alert('请求失败','消息提示')
                                }

                            }).catch(err=>{

                                Message.alert('服务器错误，请稍后再试','消息提示')

                            })

                        }
                    }


                }).catch(err=>{

                    Message.alert('服务器错误，请稍后再试','消息提示')

                })

            },
            go(item){
                this.$router.push({name:'Details',params:{id:item.shBook.bookId},query:{okBook:1,img:false}})
                console.log(item)
            }

        },
        computed:{

            has(){

                return this.info.length===0;
            },
            price(){
                if(this.info.length===0){
                    return 0;
                }else{
                    let num=0;
                    this.info.forEach(item=>{

                        if(item.shopCarOkBook===1){

                            num+=parseFloat(item.shopCarCount) * parseFloat(item.shBook.bookSellingPrice)
                        }else {

                            num+=parseFloat(item.shopCarCount) * parseFloat(item.shGoods.goodsSellingPrice)
                        }
                    })
                    return num;
                }
            }

        }
    }
</script>

<style scoped>

    .shopCar{

        text-align: center;
        font-size: 20px;
        color: red;
    }

</style>