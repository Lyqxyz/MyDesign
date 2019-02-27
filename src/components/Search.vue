<template>
    <div>
        <CommonHeader :title="title"></CommonHeader>
        <mu-load-more  :refreshing="refreshing" :loading="loading" @load="load">
            <mu-grid-list>
                <mu-sub-header>全部商品</mu-sub-header>
                <mu-grid-tile v-for="(tile, index) in list1" :key="index">
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
    import CommonHeader from './common/Header'
    export default {
        name: "Search",
        components: {CommonHeader},
        data(){
            return {

                title:'默认',
                refreshing: false,
                loading: false,
                list1: [{
                    image: image,
                    title: 'Breakfast',
                    author: 'Myron',
                    featured: true
                }, {
                    image: image,
                    title: 'Burger',
                    author: 'Linyu'
                }, {
                    image: image,
                    title: 'Camera',
                    author: 'ruolin'
                }, {
                    image: image2,
                    title: 'Hats',
                    author: 'kakali'
                }, {
                    image: image2,
                    title: 'Honey',
                    author: 'yuyang'
                }, {
                    image: image,
                    title: 'Morning',
                    author: 'mokayi',
                    featured: true
                }, {
                    image: image,
                    title: 'Vegetables',
                    author: 'NUyyyyyyy'
                }, {
                    image: image2,
                    title: 'water',
                    author: 'TDDyyyyyyy'
                }]

            }
        },
        created(){


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
                        this.list1.push(a)
                    }

                }, 2000)
        },
        computed:{


        }
    }
</script>

<style scoped>

</style>