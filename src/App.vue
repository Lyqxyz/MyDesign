<template>
    <div id="app">
        <mu-container class="button-wrapper">
            <Header></Header>
            <mu-row>
                <mu-col>
                    <mu-paper z-depth="5">
                        <mu-list textline="two-line">
                            <mu-list-item avatar button="true" ripple="true">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <mu-icon value="folder"></mu-icon>
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title>发布闲置</mu-list-item-title>
                                    <mu-list-item-sub-title>30秒发布</mu-list-item-sub-title>
                                </mu-list-item-content>
                            </mu-list-item>
                            <mu-list-item avatar button="true" ripple="true">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <mu-icon value="folder"></mu-icon>
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title>淘宝转卖</mu-list-item-title>
                                    <mu-list-item-sub-title>网购宝贝一键发布</mu-list-item-sub-title>
                                </mu-list-item-content>

                            </mu-list-item>
                            <mu-list-item avatar button="true" ripple="true">
                                <mu-list-item-action>
                                    <mu-avatar>
                                        <mu-icon value="folder"></mu-icon>
                                    </mu-avatar>
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title>信用回收</mu-list-item-title>
                                    <mu-list-item-sub-title>57类上门回收</mu-list-item-sub-title>
                                </mu-list-item-content>

                            </mu-list-item>
                        </mu-list>
                    </mu-paper>
                </mu-col>
            </mu-row>
            <mu-row>
                <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                        <mu-grid-list>
                            <mu-sub-header>全部商品</mu-sub-header>
                            <mu-grid-tile v-for="(tile, index) in list1" :key="index">
                                <img :src="tile.image" >
                                <span slot="title">{{tile.title}}</span>
                                <span slot="subTitle">by <b>{{tile.author}}</b></span>
                                <mu-button slot="action" icon>
                                    <mu-icon value="star_border"></mu-icon>
                                </mu-button>
                            </mu-grid-tile>
                        </mu-grid-list>
                    </mu-load-more>
            </mu-row>

        </mu-container>
    </div>
</template>

<script>
    import http from './api'
    import Header from "./components/Header";

    import image from './assets/images/carousel1.jpg'
    import image2 from './assets/images/carousel2.jpg'
    export default {
        name: 'app',
        components: {Header},
        data() {
            return {
                fluid: true,
                images: {},
                num: 10,
                refreshing: false,
                loading: false,
                text: 'List',
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
        created() {
            http.get('/api/c').then(res => {
                this.images = res.data.images
                console.log(res.data.images)
            })
        },
        methods: {
            change() {

            },
            get() {
                http.get('/api/a').then(res => {

                    console.log(res)
                })
            },

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
            }

        },
        computed: {}
    }
</script>

<style scoped>
</style>
