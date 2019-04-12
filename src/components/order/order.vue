<template>
    <div>
        <common-header title="我的订单"></common-header>
        <p class="order" v-if="has">你还没有订单</p>
        <mu-paper :z-depth="1" class="demo-list-wrap">
            <mu-list textline="two-line">
                <mu-list-item  avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon color="primary" value="book"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>111</mu-list-item-title>
                        <mu-list-item-sub-title>
                           1111
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon>
                            <mu-icon color="red" value="info"></mu-icon>
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

    import http from '../../api'
    export default {
        name: "order",
        components: {CommonHeader},
        created(){

            let user = storage.getStorage('user',true)

            let userId= user.userId;

            http.get(`/order/user/${userId}`).then(res=>{

                this.orders = res.data.info.data
                console.log(res.data)

            }).catch(err=>{



            })

        },
        data(){

            return {
                orders:[]
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