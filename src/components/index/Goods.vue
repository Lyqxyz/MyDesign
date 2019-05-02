<template>
    <mu-row>
        <mu-load-more  :refreshing="refreshing" :loading="loading" @load="load">
            <mu-grid-list>
                <mu-sub-header>全部商品</mu-sub-header>
                <mu-grid-tile v-for="(tile, index) in list1" :key="index">
                    <img :src="tile.xsImage | url" @click="goDetails(tile)">
                    <span slot="title">商品名:{{tile.name}}</span>
                    <span slot="subTitle">商品价格<b>{{tile.price}}</b></span>
                    <mu-button slot="action" icon @click="goDetails(tile)">
                        <mu-icon value="star_border"></mu-icon>
                    </mu-button>
                </mu-grid-tile>
            </mu-grid-list>
        </mu-load-more>
    </mu-row>
</template>

<script>

    import api from '../../api'

    export default {
        name: "Goods",
        created(){
            api.get('/index/list/1/5').then(res=>{

                let {list} = res.data.info.data;
                this.list1=list;
                console.log(list)

            }).catch(err=>{


            })


        },
        data(){
            return{
                refreshing: false,
                loading: false,
                list1: [],
                index:1,
            }
        },
        methods:{
            load () {

                let i = 2;
                this.loading = true;

                api.get(`/index/list/${this.index}/5`).then(res=>{

                    let {list} = res.data.info.data;

                    list.forEach(item =>{
                        this.list1.push(item)
                    })
                    this.loading = false;
                    this.index++;

                }).catch(err=>{
                })

            },
            goDetails(item){
                this.$router.push({name:'Details',params:{id:item.id},query:{okBook:item.okBook,img:item.xsImage}})

            }
        }
    }
</script>

<style scoped>

</style>