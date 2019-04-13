<template>
    <div>
        <common-header title="我的订单"></common-header>
        <p class="order" v-if="has">你还没有订单</p>
        <mu-paper :z-depth="1" class="demo-list-wrap">
            <mu-list textline="two-line">
                <mu-list-item v-for="item in orders" :key="item.orderId"  avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon color="primary" value="book"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>订单号:{{item.orderNum}}</mu-list-item-title>
                        <mu-list-item-sub-title>
                           总价:{{item.orderPrice}}
                            {{item.orderIsPay===1?'已付款':'未付款'}}
                            创建时间:{{item.orderCreationTime | day}}
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon @click="goOrder(item)">
                            <mu-icon color="primary" value="keyboard_backspace"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
        </mu-paper>
    </div>
</template>
<script>
    import CommonHeader from '../common/Header'

    import storage from '../../assets/utils/StorageUtils'

    import Message from 'muse-ui-message/dist/muse-ui-message'
    import http from '../../api'
    export default {
        name: "order",
        components: {CommonHeader},

        created(){

            let user = storage.getStorage('user',true)

            let userId= user.userId;

            http.get(`/order/user/${userId}`).then(res=>{

                this.orders = res.data.info.data

                console.log(this.orders)

            }).catch(err=>{

                Message.alert('网络连接失败请重试','消息提示')

            })

        },
        data(){

            return {
                orders:[]
            }
        },
        methods:{
            goOrder(item){
                this.$router.push({name:'OrderDetails',
                    params:{id:item.orderId},query:{isPay:item.orderIsPay,Receipt:item.orderReceipt,address:item.orderAddress}})
            }

        },
        computed:{

            has(){

                return this.orders.length===0;
            }

        }

    }
</script>

<style scoped>
    .order{

        text-align: center;
        font-size: 20px;
        color: red;

    }
</style>