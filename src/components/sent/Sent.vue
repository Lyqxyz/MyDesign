<template>
    <div>
        <common-header title="待发货"></common-header>
        <p v-if="has" class="sent">没有待发货</p>
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
                        <span v-if="item.goState===1">已发货</span>
                        <mu-button icon v-if="item.goState===0" @click="send(item)">
                            <mu-icon color="red" value="send"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>

<!--    =====================-->
                <mu-list-item v-if="item.goIsBook===0" avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon value="favorite" color="red"></mu-icon>
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
                        <mu-button icon @click="show(item)">
                            <mu-icon color="red" value="send"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
        </mu-paper>

        <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
            <mu-appbar color="primary" title="发货详情">
                <mu-button slot="left" icon @click="closeFullscreenDialog">
                    <mu-icon value="close"></mu-icon>
                </mu-button>
                <mu-button slot="right" flat  @click="closeFullscreenDialog">
                    关闭
                </mu-button>
            </mu-appbar>
            <div style="padding: 24px;">

                <mu-list>
                    <mu-list-item button :ripple="false">
                        <mu-list-item-title>
                            订单号:{{orderInfo.orderNum}}
                        </mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="false">
                        <mu-list-item-title>
                            订单创建时间:{{orderInfo.orderCreationTime | day}}
                        </mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="false">
                        <mu-list-item-title>
                            订单地址：{{orderInfo.orderAddress}}
                        </mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="false">
                        <mu-list-item-title>
                            订单是否付款:{{orderInfo.orderIsPay===1?'已付款':'未付款'}}
                        </mu-list-item-title>
                    </mu-list-item>

                    <mu-list-item button :ripple="false">
                        <mu-list-item-title>
                            订单人:{{orderUid.userName===undefined?'匿名':orderInfo.orderUid.userName}}
                        </mu-list-item-title>
                    </mu-list-item>

                    <mu-list-item button :ripple="false">
                        <mu-list-item-title>
                            订单电话:{{orderUid.userPhone}}
                        </mu-list-item-title>
                    </mu-list-item>

                    <mu-list-item button :ripple="false">
                        <mu-list-item-title>
                            发货状态:{{item.goState | state}}
                        </mu-list-item-title>
                    </mu-list-item>

                    <mu-list-item button :ripple="false" v-if="item.goState===-1">
                        <mu-list-item-title>
                            未发货原因:{{item.goRes}}
                        </mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="false" v-if="item.goState===0">
                        <mu-button color="primary" textColor="black" @click="send">发货</mu-button>
                        <mu-button color="warning" textColor="black" @click="reset">取消发货</mu-button>
                    </mu-list-item>
                </mu-list>
            </div>
        </mu-dialog>
    </div>
</template>

<script>
    import CommonHeader from '../common/Header'

    import http from '../../api'

    import storage from '../../assets/utils/StorageUtils'

    import Message from 'muse-ui-message/dist/muse-ui-message'

    import toast from 'muse-ui-toast/dist/muse-ui-toast'

    export default {
        name: "Sent",
        components: {CommonHeader},
        created(){

            let user = storage.getStorage('user',true)

            let userId= user.userId;

            http.get(`/GoodsOrder/User/${userId}`).then(res=>{

                this.orders = res.data.info.data
                console.log(this.orders)

            }).catch(err=>{

                console.log(err)
                Message.alert('网络连接失败请重试','消息提示')
            })

        },
        data(){

            return {

                orders:[],
                openFullscreen:false,
                orderInfo:{},
                orderUid:{},
                item:{}
            }
        },
        methods:{
            openFullscreenDialog () {
                this.openFullscreen = true;
            },
            closeFullscreenDialog () {
                this.openFullscreen = false;
            },
            send(){
                this.closeFullscreenDialog()

                let info = orderInfo.orderIsPay===1?'对方已付款':'对方未付款'

                Message.confirm('确认发货,'+info,'消息提示').then(res=>{
                    let {result}=res
                    if(result){
                        let url = `/GoodsOrder/update/${this.item.goId}`
                        http.get(url).then(res=>{

                            let {code,message} = res.data
                            if(code==='1'){
                                this.item.goState=1;
                                toast.success({
                                    message:'发货成功',
                                    position:'top',
                                    close:true,
                                })
                            }else{
                                toast.warning({
                                    message:'发货失败，网络连接失败',
                                    position:'top',
                                    close:true,
                                })
                            }
                        }).catch(err=>{

                            toast.warning({
                                message:'网络繁忙,请稍后再试',
                                position:'top',
                                close:true,
                            })
                            console.log(err)
                        })


                    }

                    console.log(result)
                }).catch(err=>{

                    console.log(err)
                })
            },
            show(item){
                this.item=item
                http.get(`/order/select/${item.goOid.orderId}`).then(res=>{

                    this.orderInfo=res.data.info.data
                    console.log(this.orderInfo)

                    this.orderUid=this.orderInfo.orderUid
                }).catch(err=>{

                    console.log(err)

                    Message.alert('当前访问人数过多')
                })
                console.log(item.goOid.orderId)
                this.openFullscreenDialog();

            },
            reset(){
                Message.prompt('请输入取消原因').then(res=>{

                    let {result,value} =res
                    let a= value===undefined?'':value.trim()
                    if(a.length<30&&a.length>0){
                        let postData = `id=${this.item.goId}&res=${a}`;
                        http.post(`/GoodsOrder/reset`,postData).then(res=>{

                            let {code,message}=res.data
                            console.log(res.data)
                            if(code==='1'){
                                this.item.goState=-1;

                                this.item.goRes=a;
                            }
                            Message.alert(message)
                        }).catch(err=>{
                            console.log(err)
                            Message.alert("当前访问人数太多了，请稍后再试！")
                        })
                    }else{

                        Message.alert('0到30字之内')

                    }
                    console.log(res)
                })
            }
        },
        computed :{

            has(){

                return this.orders.length===0;
            }
        },
        filters:{
            state(value){
                let v= parseInt(value)

                switch (v) {
                    case 0:
                        return '待发货'
                    case 1:
                        return '已发货'
                    case -1:
                        return '取消发货'
                    default:
                        return '未知'
                }

            }
        }
    }
</script>

<style scoped>

    .sent{
        text-align: center;
        font-size: 15px;
        color: red;
    }
</style>