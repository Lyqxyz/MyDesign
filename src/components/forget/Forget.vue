<template>
    <div>
        <p class="head">修改密码</p>
        <mu-form ref="form" :model="forget" class="mu-demo-form">
            <mu-form-item prop="email" :rules="emailRules" icon="mail">
                <mu-text-field v-model="forget.email"  label-float prop="email"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="pwd" :rules="pwdRules" icon="locked">
                <mu-text-field type="password" label-float   v-model="forget.pwd" prop="pwd" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field>
            </mu-form-item>

            <mu-form-item prop="code" :rules="codeRules" icon="code">
                <mu-text-field v-model="forget.code"  label-float prop="code"></mu-text-field>
            </mu-form-item>

            <mu-form-item>
                <span class="r" @click="toLogin">[登录]</span>
                <span>&nbsp;</span>
                <span class="r" @click="toReg">[注册]</span>
            </mu-form-item>
            <mu-form-item>
                <mu-button color="primary" @click="sendEmail" :disabled="disabled">{{text}}</mu-button>
                <mu-button color="primary" @click="submit">提交</mu-button>
                <mu-button @click="clear" color="warning">重置</mu-button>
            </mu-form-item>
        </mu-form>
    </div>
</template>
<script>


    import Message from 'muse-ui-message/dist/muse-ui-message'

    import http from '../../api'
    export default {
        name: "Forget",
        data(){

            return {
                emailRules: [
                    { validate: (val) => !!val, message: '必须填写邮箱'},
                    { validate: (val)=>{
                            let isEmail =/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                            if(isEmail.test(val)){
                                return true;
                            }else{
                                return false
                            }
                            },message:'邮箱格式不对'}                ],
                pwdRules: [
                    { validate: (val) => !!val, message: '必须填写新密码'},
                ],
                codeRules: [{ validate: (val) => !!val, message: '必须填写验证码'}],
                forget:{
                    email:'',
                    pwd:'',
                    code:''
                },
                visibility:true,
                text:'发送验证码至邮箱',
                disabled:false,
            }
        },
        methods:{
            toReg(){
                this.$router.push({name:'Reg'})
            },
            toLogin(){
                this.$router.replace({name:'Login'})
            },
            clear () {
                this.$refs.form.clear();
                this.user = {
                    username: '',
                    pwd: '',
                    isAgree: false
                };
            },
            submit(){
                this.$refs.form.validate().then(res=>{
                    console.log(res)
                    if(res){

                        let postData=`email=${this.forget.email}
                        &code=${this.forget.code}
                        &pwd=${this.forget.pwd}`
                        http.post('/email/forget',postData).then(res=>{
                            let {code,message}=res.data
                            Message.alert(message)
                            if(code==='1'){
                                this.$router.replace({name:'Login'})
                            }
                        }).catch(err=>{
                            console.log(err)
                        })

                    }
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
                    }

                },1000)
            },
            sendEmail(){
                http.get(`/email/sendCodeForget/${this.forget.email}`).then(res=>{

                    console.log(res.data)

                    let {code,message} = res.data


                    if(code==='1'){

                        this.intiEmail()
                    }

                    Message.alert(message)

                }).catch(err=>{

                    console.log(err)

                    this.intiEmail()
                })

            }

        }
    }
</script>

<style scoped>
    .head{
        text-align: center;
        color: black;
        font-size: 20px;
        margin: 20px;
    }
    .r{

        color: red;

        margin-left: 5px;

    }
</style>