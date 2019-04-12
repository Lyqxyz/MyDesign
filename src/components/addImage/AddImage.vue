<template>
    <mu-container>
        <CommonHeader title="添加图片"></CommonHeader>
        <FileUpload url="http://xxxx/api/upload" :upload="uploadFile"></FileUpload>
    </mu-container>
</template>

<script>
    import CommonHeader from '../common/Header'
    import FileUpload from '../common/FileUpload'
    import Message from 'muse-ui-message/dist/muse-ui-message'
    import http from '../../api'

    import storage from '../../assets/utils/StorageUtils'
    export default {
        name: "AddImage",

        created(){

            let {isBook}=this.$route.query

            let {id} = this.$route.params

            console.log(id)

            if(isBook){
                this.bookId=id;
                this.url = '/book/addPic/'+this.bookId;
            }else{
                this.goodsId=id;
                this.url = '/goodsDes/addPic/'+this.goodsId;
            }
        },
        data(){
            return {

                bookId:'',

                goodsId:'',

                okBook:'',

                url:'',
            }
        },
        components: {FileUpload, CommonHeader},


        methods:{

            uploadFile(files){


                if(files.length<=0){
                    Message.alert('请选择图片','消息提示')
                    return;
                }
                let fd = new FormData();

                for(let i = 0 ; i<files.length;i++){

                    fd.append('files',files[i])
                }
                http.post(this.url,fd,{

                    headers:{
                        'Content-Type':'multipart/form-data'
                    }

                }).then(res=>{

                    let {code,message,info} = res.data;
                    if(code==='-1'){

                        Message.alert(message+' 请检查大小','消息提示')
                    }else{

                        let user = storage.getStorage('user',true)

                        let {userId} =user;

                        this.$router.replace({name:'MyPublish',query:{id:userId}})

                    }

                }).catch(err=>{

                    Message.alert('服务器繁忙,请稍后再试！！！','消息提示')

                });

                console.log(files)

            }

        }
    }
</script>

<style scoped>

</style>