<template>
    <div>
        <CommonHeader title="我的发布"></CommonHeader>
        <mu-paper :z-depth="1" class="demo-list-wrap">
            <mu-list textline="two-line">
                <mu-sub-header inset>书籍</mu-sub-header>
                <mu-list-item :key="item.bookId" v-for="item in books" avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar @click="go(item)">
                            <mu-icon color="primary" value="book"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title @click="edit(item)">书名:{{item.bookName}}</mu-list-item-title>
                        <mu-list-item-sub-title>{{item.bookCreationTime | day}}==>审核:{{item.bookState | pass}}
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon @click="delBook(item)">
                            <mu-icon color="red" value="delete"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
            <p v-if="hasBook">你还没有发布书籍啦</p>
            <mu-divider inset></mu-divider>
            <mu-list textline="two-line">
                <mu-sub-header inset>日常用品</mu-sub-header>
                <mu-list-item :key="item.goodsId" v-for="item in goods" avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar color="blue" @click="goGoods(item)">
                            <mu-icon value="assignment"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title @click="GoodsEdit(item)">{{item.goodsTitle}}</mu-list-item-title>
                        <mu-list-item-sub-title>
                            {{item.goodsReleaseTime | day}}==>审核:{{item.goodsState | pass}}
                        </mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon @click="delGoods(item)">
                            <mu-icon color="red" value="delete"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
            <p v-if="hasGoods">你还没有发布商品啦</p>
        </mu-paper>
    </div>
</template>

<script>
    import CommonHeader from '../common/Header'

    import http from '../../api'

    import axios from 'axios'

    import Message from 'muse-ui-message/dist/muse-ui-message'

    import storage from '../../assets/utils/StorageUtils'

    import toast from 'muse-ui-toast/dist/muse-ui-toast'
    export default {
        name: "myPublish",
        components: {CommonHeader},

        created() {

            let user =storage.getStorage("user",true)

            let {userId} =user;

            let goodsurl =`/goods/user/${userId}`

            let bookurl=`/book/user/${userId}`

            axios.all([http.get(goodsurl),http.get(bookurl)])
                .then(axios.spread((res,res1)=>{

                    this.goods=res.data.info.data
                    this.books=res1.data.info.data

                    console.log(this.goods)

                    console.log(this.books)

                }))
                .catch(err=>{

                    Message.alert('请检查网络是否连接','消息提醒')

                })

            console.log(userId)

        },
        data(){

            return {

                goods:[],
                books:[],

            }
        },
        methods:{

            delBook(item){

                let num;
                this.books.find((a,index)=>{
                    if(item===a){

                        num=index;
                    }
                })
                Message.confirm('确认删除!','提示',{
                    warningIcon:'priority_high'
                }).then(res=>{
                    let {result}=res
                    if(result){

                        http.get(`/book/del/${item.bookId}`).then(res=>{

                            let {code} = res.data
                            if(code==='1'){

                                this.books.splice(num,1);
                                toast.success({
                                    message:'删除成功',
                                    position:'top',
                                    close:true,
                                })
                            }else {
                                toast.error({
                                    message:'删除失败',
                                    position:'top',
                                    close:true,
                                })

                            }

                        }).catch(err=>{

                            Message.alert('网络繁忙,请稍后再试','消息提示');
                        })


                    }

                })

            },
            delGoods(item){

                let num;
                this.goods.find((a,index)=>{
                    if(item===a){

                        num=index;
                    }
                })
                Message.confirm('确认删除!','提示',{
                    warningIcon:'priority_high'
                }).then(res=>{
                    let {result}=res
                    if(result){

                        http.get(`/goods/del/${item.goodsId}`).then(res=>{

                            let {code} = res.data
                            if(code==='1'){

                                this.goods.splice(num,1);
                                toast.success({
                                    message:'删除成功',
                                    position:'top',
                                    close:true,
                                })
                            }else {
                                toast.error({
                                    message:'删除失败',
                                    position:'top',
                                    close:true,
                                })

                            }

                        }).catch(err=>{

                            Message.alert('网络繁忙,请稍后再试','消息提示');
                        })


                    }

                })
            },
            edit(item){

                this.$router.push({name:'updateBook',params:{id:item.bookId}})
            },
            GoodsEdit(item){

                this.$router.push({name:'updateGoods',params:{id:item.goodsId}})

            },
            go(item){
                if(item.bookState===0){
                    Message.alert('等待审核')
                }else{
                  this.$router.push({name:'Details',params:{id:item.bookId},query:{okBook:1,img:false}})
                }
            },
            goGoods(item){

                if(item.goodsState===0){
                    Message.alert('等待审核')
                }else{
                    this.$router.push({name:'Details',params:{id:item.goodsId},query:{okBook:0,img:false}})
                }
            }
        },
        computed:{

            hasBook(){

                return this.books.length===0;
            },

            hasGoods(){

                return this.goods.length===0;
            }

        }


    }
</script>

<style scoped>
    p{

        text-align: center;
        color: red;
        font-size: 20px;
    }
</style>