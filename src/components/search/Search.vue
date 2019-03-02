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

    import {Mock,Random} from '../../mock'


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

            let {name} =this.$route.query
            this.title = name;
            for (let i = 1 ;i<10;i++){

                let list = {
                    id:Mock.mock('@integer()'),
                    title:Mock.mock('@string'),
                    author: Mock.mock('@first'),
                    image:Random.image('50x50', '#894FC4', '#FFF', 'png', 'T')
                }
                this.lists.push(list)
            }
        },
        methods:{
            load () {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    for (let i = 1 ;i<5;i++){

                        let list = {
                            id:Mock.mock('@integer()'),
                            title:Mock.mock('@string'),
                            author: Mock.mock('@first'),
                            image:Random.image('50x50', '#894FC4', '#FFF', 'png', 'T')
                        }
                        this.lists.push(list)
                    }

                }, 2000)
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