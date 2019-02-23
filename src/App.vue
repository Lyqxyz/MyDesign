<template>
    <div id="app">
        <mu-container class="button-wrapper">
            <Header></Header>
            <Cen></Cen>
            <router-view name="foot"></router-view>
        </mu-container>
    </div>
</template>

<script>
    import http from './api'
    import Header from "./components/Header";
    import Cen from './components/Center'
    import Goods from './components/Goods'
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
