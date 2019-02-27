<template>
    <div>
        <mu-load-more :refreshing="refreshing" :loading="loading" @load="load">
            <mu-grid-list>
                <mu-sub-header>全部商品</mu-sub-header>
                <mu-grid-tile v-for="(tile, index) in showList" :key="index">
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
    export default {
        name: "GoodsList",
        props:{
            showList:{
                type:Array,
                required:true,
            },
            addList:{
                type: Function,
            }
        },
        data(){
            return{
                refreshing: false,
                loading: false,
            }
        },
        methods:{
            load () {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;

                    let a= {
                        image: image,
                        title: 'water',
                        author: 'TDDyyyyyyy'
                    }
                    for (let i = 0; i <10 ; i++) {
                        this.addList(a)
                    }

                }, 2000)
            },
            goDetails(index){

            }
        }
    }
</script>

<style scoped>

</style>