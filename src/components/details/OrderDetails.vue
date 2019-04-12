<template>
    <common-header title="订单详情"/>
</template>

<script>
    import CommonHeader from '../common/Header'

    export default {
        name: "OrderDetails",
        components: {CommonHeader},
        created(){

          let {id}=  this.$route.params
            console.log(id)
        },
        data(){

            return {}
        }
    }
</script>

<style scoped>

</style>