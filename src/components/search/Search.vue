<template>
    <div>
        <CommonHeader :title="title"></CommonHeader>
        <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
            <mu-grid-list>
                <mu-sub-header>全部商品</mu-sub-header>
                <mu-grid-tile v-for="(tile, index) in lists" :key="index">
                    <img :src="tile.image" @click="goDetails(index)">
                    <span slot="title">{{tile.title}}</span>
                    <span slot="subTitle">by <b>{{tile.author}}</b></span>
                    <mu-button slot="action" icon @click="goDetails(index)">
                        <mu-icon value="star_border"></mu-icon>
                    </mu-button>
                </mu-grid-tile>
            </mu-grid-list>
        </mu-load-more>
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
                let {list} = res.data.info.data;
                this.lists=list;
            }).catch(err=>{



            })


            console.log(id)

        },
        methods:{
            load () {

                this.loading = true;


            },
            goDetails(index){

                this.$router.push({name:'Details',params:{id:index}})
            }

        },
        computed:{


        }
    }
</script>

<style scoped>

</style>