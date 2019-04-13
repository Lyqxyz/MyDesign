<template>
    <div>

        <common-header title="订单详情"/>
        <mu-paper :z-depth="1" class="demo-list-wrap">
            <mu-list v-for="item in orders" :key="item.goId" textline="two-line">
                <mu-list-item v-if="item.goIsBook===1" avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon color="primary" value="book"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>{{item.goBid.bookName}}</mu-list-item-title>
                        <mu-list-item-sub-title>
                            数量:{{item.goCount}}=>
                            单价:{{item.goBid.bookSellingPrice}}=>
                            {{item.goCreationTime | day }}
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon >
                            <mu-icon color="red" value="delete"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item v-if="item.goIsBook===0" avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon value="folder"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>{{item.goGid.goodsTitle}}</mu-list-item-title>
                        <mu-list-item-sub-title>
                            数量:{{item.goCount}}=>
                            单价:{{item.goGid.goodsSellingPrice}}=>
                            {{item.goCreationTime | day }}
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon >
                            <mu-icon color="red" value="delete"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
            <p class="price">总价:{{price}}元</p>
        </mu-paper>

        <mu-row>
            <mu-button round full-width color="primary" @click="pay">付款</mu-button>
        </mu-row>

        <mu-row class="mg">
            <mu-button v-if="Receipt===1" round full-width color="primary" @click="ok">已经送达</mu-button>
            <mu-button v-else round full-width color="primary" @click="ok">确认收货</mu-button>
        </mu-row>

        <mu-row class="mg">
            <mu-button round full-width color="warning" @click="ok">取消订单</mu-button>
        </mu-row>
    </div>

</template>

<script>
    import CommonHeader from '../common/Header'

    import http from '../../api'
    import Message from 'muse-ui-message/dist/muse-ui-message'
    export default {
        name: "OrderDetails",
        components: {CommonHeader},
        created(){

            let {id}=  this.$route.params

            let {isPay,Receipt,address} =this.$route.query

            this.isPay=isPay

            this.Receipt= Receipt

            this.address=address

            let url =`/GoodsOrder/order/${id}`

            http.get(url).then(res=>{

                this.orders=res.data.info.data

            }).catch(err=>{

                Message.alert('网络请求错误，请稍后再试','消息提示')

            })

        },
        data(){

            return {

                isPay:0,
                Receipt:0,
                address:'',
                orders:[],

            }
        },
        methods:{

            ok(){

                this.Receipt=1
            },
            pay(){

                Message.prompt('请输入金额，次为模拟付款','请输入金额').then(res=>{

                    console.log(res)

                }).catch(err=>{


                })

            }
        },
        computed:{

            has(){
                return this.orders.length===0
            },
            price(){
                if(this.orders.length===0){
                    return 0;
                }else{
                    let num=0;
                    this.orders.forEach(item=>{

                        if(item.goIsBook===1){

                            num+=parseFloat(item.goCount) * parseFloat(item.goBid.bookSellingPrice)
                        }else {

                            num+=parseFloat(item.goCount) * parseFloat(item.goGid.goodsSellingPrice)
                        }
                    })
                    return num;
                }


            }
        }
    }
</script>

<style scoped>

    .price{

        text-align: center;

        font-size: 24px;

        color: aqua;
    }
    .mg{

        margin-top: 10px;
    }
</style>