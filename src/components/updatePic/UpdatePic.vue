<template>


    <div>
        <common-header title="更新图片"></common-header>
        <label for="file">选择图片</label>
        <input @change="uploadFile" type="file" id="file" accept="image/*">
        <img :src="src" alt="" width="100%" height="300">
        <mu-button color="primary" @click="upload">上传</mu-button>
    </div>
</template>

<script>
    import CommonHeader from '../common/Header'
    import FileUpload from '../common/FileUpload'
    import Message from 'muse-ui-message/dist/muse-ui-message'
    import http from '../../api'
    import storage from '../../assets/utils/StorageUtils'
    export default {
        name: "UpdatePic",
        created(){
            let {isBook}=this.$route.query
            let {id} = this.$route.params

            this.id=id;
            if(isBook){
                this.url = '/bookDes/updatePic'
            }else{
                this.url = '/goodsDes/updatePic'
            }
        },
        components: {FileUpload, CommonHeader},
        data(){
            return {

                src:'',
                bookId:'',
                goodsId:'',
                okBook:'',
                url:'',
                id:'',
                file:null
            }
        },
        methods:{
            uploadFile(e){

                this.file = e.target.files

                console.log(file)

                let fr=   new FileReader()

                fr.readAsDataURL(this.file[0])

                fr.onload=(e)=>{

                    this.src=e.target.result
                    console.log()

                }

            },
            upload(){
                if(this.file===null){
                    Message.alert('请选择一张图片')
                }else{
                    let fd = new FormData()
                    fd.append('file',this.file[0])
                    fd.append('id', this.id)
                    http.post(this.url,fd,{
                        headers:{
                            'Content-Type':'multipart/form-data'
                        }
                    }).then(res=>{
                        let {message} = res.data
                        Message.alert(message)
                        console.log(res.data)

                    }).catch(err=>{

                        Message.alert('当前访问人数太多，请售后再试!')
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>