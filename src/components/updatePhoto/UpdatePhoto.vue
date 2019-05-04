<template>
    <div>
        <common-header title="修改头像"></common-header>
        <label for="photo" v-if="pic===null" class="pic"><img src="../../assets/images/photo.jpg" width="100" height="100" alt="用户头像"></label>
        <label for="photo" class="pic" v-else><img :src="pic | userPhoto" alt="用户头像"  width="100" height="100"></label>
        <input type="file" id="photo" @change="fileChange" accept="image/*">
        <mu-button color="primary" class="pic" @click="update">上传</mu-button>

    </div>
</template>

<script>
    import CommonHeader from '../common/Header'

    import http from '../../api'

    import Message from 'muse-ui-message/dist/muse-ui-message'
    export default {
        name: "UpdatePhoto",
        filters:{
            userPhoto(val){

                if(val.includes('base64')){
                    return val
                }else if(val.includes('/upload')){
                    return 'http://localhost:8080'+val;
                }

            }

        },
        created(){
            let user = JSON.parse(sessionStorage.getItem('user'))
            console.log(user.userPhoto);
            this.pic= user.userPhoto;
            this.uid= user.userId
        },
        data(){
          return {
              pic:'',
              file:'',
              uid:'',
          }
        },
        methods:{

            fileChange(e){

                this.file = e.target.files[0]

                let fr= new FileReader()

                fr.readAsDataURL(e.target.files[0])

                fr.onload =(ev)=>{

                    this.pic = ev.target.result

                }
            },
            update(){

                if(this.file===''){
                    Message.alert('请点击头像，选择照片')
                    return;
                }
                let fd = new FormData()

                fd.append('uid',this.uid)
                fd.append('file',this.file)

                http.post('/user/updatePhoto',fd,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }).then(res=>{
                    let {code,message,info} = res.data

                    if(code==='-1'){
                        Message.alert(message)
                    }else{

                        let {path} =info
                        let user = JSON.parse(sessionStorage.getItem('user'))
                        user.userPhoto=path;
                        sessionStorage.setItem('user',JSON.stringify(user))
                        Message.alert(message)
                    }

                }).catch(err=>{

                    Message.alert('当前访问人数过多,请稍后再试')
                })


            }
        },
        components: {CommonHeader}
    }
</script>

<style scoped>

    input[type='file']{

        display: none;
    }
    .pic{
        display: block;
        margin: 35px 40%;
    }
</style>