<template>
    <div id="con">
        <img v-if="isShow" src="http://dummyimage.com/170x200/ffcc33/FFF.png&text=!" alt="式样">

        <img width="170" height="200" v-for="(item,index) in images" :src="item" alt="" :key="index">

        <label for="upload">
            <mu-icon value="add" size="100"></mu-icon>
        </label>
        <mu-button color="primary" small @click="uploadFile">上传</mu-button>
        <mu-button color="warning" small @click="del">删除</mu-button>
        <input multiple @change="fileChange" id="upload" type="file" accept="image/*" title="上传图片">
        <mu-snackbar :position="normal.position" :open.sync="normal.open">
            {{normal.message}}
            <mu-button flat slot="action" color="secondary" @click="normal.open = false">关闭</mu-button>
        </mu-snackbar>
    </div>
</template>

<script>

    export default {
        name: "FileUpload",
        data(){
            return {
                normal: {
                    position: 'top',
                    message: '文件最多4张',
                    open: false,
                    timeout: 3000
                },
                images:[],
                files:[]
            }
        },
        props: {
            url:{
                type:String,
                required:true
            },
        },
        computed:{
            isShow(){
                return !this.images.length>0
            }
        },
        methods:{
            fileChange(e){
                let files= e.target.files;

                this.files=files

                if(files.length>4){
                    this.openNormalSnackbar()
                }else{
                    this.del()

                    for (let i = 0;i<files.length;i++){
                        let filereader =new FileReader()
                        let DataURL = filereader.readAsDataURL(files[i])
                        filereader.onload=(res)=>{
                            this.images.push(res.target.result)
                        }
                    }
                }

            },
            openNormalSnackbar () {
                if (this.normal.timer) clearTimeout(this.normal.timer);
                this.normal.open = true;
                this.normal.timer = setTimeout(() => {
                    this.normal.open = false;
                }, this.normal.timeout);
            },
            uploadFile(e){

                console.log(this.files)

            },
            del(){
                this.images=[]
            }
        }
    }
</script>

<style scoped>
    #con{
        width: 100%;
    }
    input[type='file']{
        display: none;
    }
    img{

        box-shadow: aqua;

    }

</style>