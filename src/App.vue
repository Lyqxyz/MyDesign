<template>
    <div id="app">
        <router-view name="header"></router-view>
        <router-view name="center"></router-view>
        <router-view name="footer"></router-view>
    </div>
</template>

<script>
    import Header from "./components/index/Header";
    import Cen from './components/index/Center'
    import Goods from './components/index/Goods'

    import isMobile from '../src/assets/utils/IsMobile'

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

            if(!isMobile){
                this.$router.replace({name:'notMobile'})
                console.log('请用手机访问')
            }else{
                console.log('是手机访问')
            }

        },
        methods: {
            change() {

            },
            get() {

            },

        },
        computed: {}
    }
</script>

<style scoped>
</style>
