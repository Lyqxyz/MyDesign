<template>
    <mu-row>
        <mu-appbar style="width: 100%;" color="#fafafa" textColor="black" z-depth="0">
            <mu-button icon slot="left" @click="goBack">
                <mu-icon value="keyboard_backspace"></mu-icon>
            </mu-button>
            {{title}}
        </mu-appbar>
    </mu-row>
</template>

<script>
    export default {
        name: "CommonHeader",
        data(){
            return {

            }
        },
        props:{
            title:{
                type: String,
                required: true
            },
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>