<template>
    <mu-container>
        <CommonHeader title="添加图片"></CommonHeader>
        <FileUpload url="http://xxxx/api/upload"></FileUpload>
    </mu-container>
</template>

<script>
    import CommonHeader from '../common/Header'
    import FileUpload from '../common/FileUpload'
    export default {
        name: "AddImage",
        data(){
            return {

            }
        },
        components: {FileUpload, CommonHeader},
        methods:{

        }
    }
</script>

<style scoped>

</style>