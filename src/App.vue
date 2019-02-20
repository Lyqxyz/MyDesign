<template>
    <div id="app">
        <mu-container class="button-wrapper" :fluid="fluid">
            <Header></Header>
            <mu-row>

            </mu-row>
        </mu-container>
    </div>
</template>

<script>
    import http from './api'
    import Header from "./components/Header";

    export default {
        name: 'app',
        components: {Header},
        data() {
            return {
                fluid: true,
                images: {}
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
            get1() {
                http.get('/api/c').then(res => {

                    console.log(res)
                })

            }

        },
        computed: {}
    }
</script>

<style scoped>
</style>
