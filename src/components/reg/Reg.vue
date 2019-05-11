<template>
    <div>

        <p class="reg">注册</p>
        <mu-form ref="form" :model="reg" class="mu-demo-form">
            <mu-form-item label="用户名" prop="name" :rules="nameRules">
                <mu-text-field v-model="reg.name" prop="name"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password" :rules="pwdRules">
                <mu-text-field type="password" v-model="reg.password" prop="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="学号" prop="num" :rules="numRules">
                <mu-text-field v-model="reg.num" prop="num"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="电话" prop="phone" :rules="phoneRules">
                <mu-text-field type="text" v-model="reg.phone" prop="phone"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="邮箱" prop="email" :rules="emailRules">
                <mu-text-field v-model="reg.email" prop="email"></mu-text-field>
            </mu-form-item>

            <mu-form-item label="验证码" prop="code" :rules="codeRules">
                <mu-text-field v-model="reg.code" prop="email"></mu-text-field>
            </mu-form-item>
            <mu-form-item>
               <span class="lo" @click="toLogin">[登录]</span>
            </mu-form-item>
            <mu-form-item>
                <mu-button color="primary" @click="sendMail" :disabled="disabled">{{text}}</mu-button>
                <mu-button color="primary" @click="submit">注册</mu-button>
                <mu-button color="warning" @click="clear">重置</mu-button>
            </mu-form-item>
        </mu-form>


    </div>
</template>

<script>

    import Qs from 'qs'

    import Message from 'muse-ui-message/dist/muse-ui-message'

    import http from '../../api'

    export default {

        data () {
            return {

                nameRules: [
                    { validate: (val) => !!val, message: '必须填写用户名'},
                    { validate: (val) => val.length >= 4&&val.length<=8, message: '用户名长度4-8位'}
                ],
                pwdRules: [
                    { validate: (val) => !!val, message: '必须填写密码'},
                ],
                numRules: [
                    { validate: (val) => !!val, message: '必须填写密码'},
                ],
                emailRules: [
                    { validate: (val) => !!val, message: '必须填写邮箱'},
                    { validate: (val)=>{
                            let isEmail =/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                            if(isEmail.test(val)){
                                return true;
                            }else{
                                return false
                            }
                        },message:'邮箱格式不对'}
                ],
                phoneRules: [
                    { validate: (val) => !!val, message: '必须填写电话'},

                    { validate: (val) => {

                                let isPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                                if(isPhone.test(val)){
                                    return true;
                                }else{
                                    return false
                                }

                            }, message: '电话号码格式不对'
                    }

                ],
                codeRules:[

                    { validate: (val) => !!val, message: '必须填写密码'},
                ],
                reg:{
                    num:'',
                    name:'',
                    password:'',
                    email:'',
                    phone:'',
                    code:'',
                },
                text:'发送验证码至邮箱',
                disabled:false,

            }
        },
        name: "Reg",
        methods: {
            submit () {
                this.$refs.form.validate().then(res=>{


                    if(res){

                        http.post('/registered', Qs.stringify(this.reg))

                            .then(res=>{

                            if(res.data.code==='1'){

                                Message.alert('注册成功').then(res=>{

                                    this.$router.replace({name:'Login'})
                                })

                            }else {

                                let Result = res.data.errors.AllError

                                let r = res.data.errors.attrsErrors.join(' ')

                                console.log(Result)

                                console.log(r)

                                Message.alert(r,'消息提示')
                            }

                        }).catch(err=>{


                            console.log(err)
                          Message.alert('网络错误请稍后再试','消息提示')

                        })
                    }

                })
            },
            clear () {
                this.$refs.form.clear();
                this.reg = {
                    num:'',
                    name:'',
                    password:'',
                    email:'',
                    phone:'',
                };
            },
            toLogin(){

                this.$router.replace({name:'Login'})

            },
            sendMail(){

                if(this.reg.email===''){
                    Message.alert('请输入邮箱')
                    return;
                }
                let isEmail =/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                if(!isEmail.test(this.reg.email)) {
                    Message.alert('邮箱格式不正确')
                    return;
                }
                http.get(`/email/sendCode/${this.reg.email}`).then(res=>{
                    let {code,message} = res.data
                    if(code==='1'){

                        Message.alert(message)
                        this.intiEmail();

                    }else{
                        Message.alert(message)
                    }

                }).catch(err=>{
                    console.log(err)
                    Message.alert('邮箱不存在')
                })

            },
            intiEmail(){
                let second=60
                this.disabled=true
                this.tid = setInterval(()=>{
                    if(second<=0){
                        this.disabled=false
                        this.text='发送验证码至邮箱'
                        clearInterval(this.tid)
                    }else{
                        this.text = second+'s'
                        second = second-1;
                        console.log(second)
                    }

                },1000)
            }
        }
    }
</script>

<style scoped>

    .reg{
        text-align: center;

        color: black;

        margin: 20px;

        font-size: 24px;

    }
    label{

       font-weight: bold;
    }
    .lo{
        color: red;
        font-size: 16px;
        margin: 5px;
    }
</style>