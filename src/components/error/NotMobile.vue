<template>
    <div id="no">
        请使用手机访问
    </div>
</template>

<script>
    import isMobile from '../../assets/utils/IsMobile'

    export default {
        name: "NotMobile",
        created() {
            if(isMobile) {
                this.$router.replace({name:'index'})
            }
        }
    }
</script>

<style scoped>
    #no{
        color: red;

        font-size: 50px;

        text-align: center;
    }
</style>