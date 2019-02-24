<template>
    <mu-container>
        <CommonHeader title="添加图片"></CommonHeader>
        <v-uploader @done="uploadDone" :previewHeight="previewHeight" :multiple="multiple"></v-uploader>
    </mu-container>
</template>

<script>
    import CommonHeader from '../common/Header'
    export default {
        name: "AddImage",
        data(){

            return {
                previewHeight:1000,
                multiple:true,
            }
        },
        components: {CommonHeader},
        methods:{
            //receive uploaded files info
            //@type Array
            uploadDone(files){
                console.log('===============')
                console.log(files)
                if(files && Array.isArray(files) && files.length){
                    console.log("aaaaaa")
                }
            }
        }
    }
</script>

<style scoped>

</style>