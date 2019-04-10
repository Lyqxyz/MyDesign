<template>
    <div>
        <CommonHeader :title="title"></CommonHeader>
        <mu-load-more :refreshing="refreshing" :loading="loading" @load="load" v-if="!has">
            <mu-grid-list>
                <mu-sub-header>全部商品</mu-sub-header>
                <mu-grid-tile v-for="(tile, index) in lists" :key="index">
                    <img :src="tile.xsImage | url" @click="goDetails(tile)">
                    <span slot="title">商品名:{{tile.name}}</span>
                    <span slot="subTitle">商品价格<b>{{tile.price}}</b></span>
                    <mu-button slot="action" icon @click="goDetails(tile)">
                        <mu-icon value="star_border"></mu-icon>
                    </mu-button>
                </mu-grid-tile>
            </mu-grid-list>
        </mu-load-more>

        <h3 v-if="has" class="no">暂时还没有商品</h3>
    </div>
</template>

<script>
    import CommonHeader from '../common/Header'

    import http from '../../api'

    export default {
        name: "Search",
        components: { CommonHeader},
        data(){
            return {
                title:'默认',
                refreshing: false,
                loading: false,
                lists:[]
            }
        },
        created(){

            let {className} =this.$route.query

            let {id}=this.$route.params

            this.title = className;

            http.get(`/index/class/${id}`).then(res=>{
                this.lists = res.data.info.data;

            }).catch(err=>{

            })

        },
        methods:{
            load () {

                this.loading = true;


            },
            goDetails(item){

                this.$router.push({name:'Details',params:{id:item.id},query:{okBook:item.okBook,img:item.xsImage}})
            }

        },
        computed:{

            has(){

                return this.lists.length===0;

            }

        }
    }
</script>

<style scoped>
    .no{
        color: red;
        text-align: center;
        font-size: 20px;
    }
</style>