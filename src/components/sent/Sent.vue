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
                        <span v-if="item.goState===1">已发货</span>
                        <mu-button icon v-if="item.goState===0">
                            <mu-icon color="red" value="send"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
        </mu-paper>
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
            }
        },
        methods:{

            send(item){

                Message.confirm('确认发货','消息提示').then(res=>{

                    let {result}=res

                    if(result){

                        let url = `/GoodsOrder/update/${item.goId}`

                        http.get(url).then(res=>{

                            let {code,message} = res.data
                            if(code==='1'){
                                item.goState=1;
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
            }
        },
        computed :{

            has(){

                return this.orders.length===0;
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