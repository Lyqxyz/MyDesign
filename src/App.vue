<template>
    <div id="app">
        <router-view name="header"></router-view>
        <router-view name="center"></router-view>
        <router-view name="footer"></router-view>
    </div>
</template>

<script>
    import http from './api'
    import Header from "./components/index/Header";
    import Cen from './components/index/Center'
    import Goods from './components/index/Goods'
    export default {
        name: 'app',
        components: {Goods,Header,Cen},
        data() {
            return {
                fluid: true,
                images: {},
                num: 10,
                text: 'List',
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

        },
        computed: {}
    }
</script>

<style scoped>
</style>
