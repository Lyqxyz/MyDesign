<template>
    <div>
        <CommonHeader title="详情页"></CommonHeader>
        <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;" v-if="okBook===1">
            <mu-card-header :title="'昵称:'+user.userName" :sub-title="'电话:'+user.userPhone">
                <mu-avatar slot="avatar">
                    <img :src="user.userPhoto | url">
                </mu-avatar>
            </mu-card-header>
            <mu-card-media :title="'书名:'+info.bookName" :sub-title="'作者:'+info.bookAuthor">
                <img :src="info.img | url">
            </mu-card-media>
            <mu-card-title :title="'售价:'+info.bookSellingPrice" :sub-title="'原价:'+info.bookOriginalPrice"></mu-card-title>
            <mu-card-text>
                {{info.bookDes}}
            </mu-card-text>
            <mu-card-actions>
                <mu-button flat color="primary" @click="addShopCar">加入购物车</mu-button>
                <mu-button flat color="success">我想要</mu-button>
            </mu-card-actions>
        </mu-card>


        <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;" v-if="okBook===0">
            <mu-card-header :title="'昵称:'+user.userName" :sub-title="'电话:'+user.userPhone">
                <mu-avatar slot="avatar">
                    <img :src="user.userPhoto | url">
                </mu-avatar>
            </mu-card-header>
            <mu-card-media :title="'商品标题:'+info.goodsTitle" sub-title="">
                <img :src="info.img | url">
            </mu-card-media>
            <mu-card-title :title="'售价:'+info.goodsSellingPrice" :sub-title="'原价:'+info.goodsOriginalPrice"></mu-card-title>
            <mu-card-text>
                {{info.goodsDes}}
            </mu-card-text>
            <mu-card-actions>
                <mu-button flat color="primary" @click="addGoodsToShopCar">加入购物车</mu-button>
                <mu-button flat color="success">我想要</mu-button>
            </mu-card-actions>
        </mu-card>
    </div>
</template>

<script>
    import CommonHeader from '../common/Header'
    import api from '../../api'

    import stroage from '../../assets/utils/StorageUtils'

    import Message from 'muse-ui-message/dist/muse-ui-message'

    import Qs from 'qs'
    export default {
        name: "Details",
        components:{CommonHeader},
        created() {

        },
        mounted(){
            let id = this.$route.params.id;
            let {okBook,img} =this.$route.query;

            this.okBook=okBook;
            console.log(this.$route)
            if(okBook===1){
                api.get(`/book/${id}`).then(res=>{

                    this.info = res.data.info.data;
                    this.info.img= img;
                    this.user= this.info.shUser

                }).catch(err=>{


                })
            }else{

                api.get(`/goods/${id}`).then(res=>{

                    this.info = res.data.info.data;
                    this.info.img= img;
                    this.user= this.info.shUser

                }).catch(err=>{


                })


            }

            console.log(id,okBook)

        },
        data(){

            return {

                info:{},
                user:{},
                book:{},
                okBook:1,
            }
        },
        methods:{

            addShopCar(){
                let user = stroage.getStorage('user',true)
                let uid=user.userId;
                let gid = this.info.bookId
                let a ={
                    uid,
                    gid,
                    okBook:this.okBook,
                    count:1
                }

                api.post('/shopcar/add',Qs.stringify(a)).then(res=>{

                    let {code,message} = res.data

                    if(code==='-1'){

                        Message.alert('添加失败')
                    }else{

                        Message.alert('添加成功')
                    }


                }).catch(err=>{

                    Message.alert('网络请求失败','消息提示')

                })


            },
            addGoodsToShopCar(){
                let user = stroage.getStorage('user',true)
                let uid=user.userId;
                let gid = this.info.goodsId
                let a ={
                    uid,
                    gid,
                    okBook:this.okBook,
                    count:1
                }

                api.post('/shopcar/add',Qs.stringify(a)).then(res=>{

                    let {code,message} = res.data

                    if(code==='-1'){

                        Message.alert('添加失败')
                    }else{

                        Message.alert('添加成功')
                    }


                }).catch(err=>{

                    Message.alert('网络请求失败','消息提示')

                })



            }
        }
    }
</script>

<style scoped>

</style>