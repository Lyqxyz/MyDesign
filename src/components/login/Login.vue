<template>
    <div>
        <mu-linear-progress :value="linear" mode="determinate" color="green"></mu-linear-progress>

        <h1 class="head">辽科大二手交易平台</h1>

        <p class="login">登录</p>

        <mu-form ref="form" :model="user" class="mu-demo-form">
            <mu-form-item label="用户名" prop="username" :rules="usernameRules">
                <mu-text-field v-model="user.username" prop="username"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="pwd" :rules="pwdRules">
                <mu-text-field type="password" v-model="user.pwd" prop="pwd"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="isAgree" :rules="argeeRules">
                <mu-checkbox label="同意用户协议" v-model="user.isAgree"></mu-checkbox>
                <span class="r" @click="toReg">[注册]</span>
            </mu-form-item>
            <mu-form-item>
                <mu-button color="primary" @click="submit">提交</mu-button>
                <mu-button @click="clear">重置</mu-button>
            </mu-form-item>
        </mu-form>
    </div>
</template>

<script>

    import Qs from 'qs'

    import Message from 'muse-ui-message/dist/muse-ui-message'

    import http from '../../api'

    import storage from '../../assets/utils/StorageUtils'
    export default {
        name: "Login",
        data () {
            return {
                linear: 0,
                usernameRules: [
                    { validate: (val) => !!val, message: '必须填写用户名'},
                    { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
                ],
                pwdRules: [
                    { validate: (val) => !!val, message: '必须填写密码'},
                ],
                argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
                user: {
                    username: '',
                    pwd: '',
                    isAgree: false,
                    token:'123145'
                }
            }
        },
        created () {

        },
        methods: {
            submit () {
                this.$refs.form.validate().then((result) => {
                    console.log('form valid: ', result)

                    if(result){

                        this.timer = setInterval(() => {
                            this.linear += 30;
                            if (this.linear > 90){
                                this.linear = 90
                                clearInterval(this.timer)
                            }
                        }, 1000)

                        let postData=Qs.stringify(this.user)
                        http.post('/indexLogin',postData).then(res=>{

                            let {code,message} = res.data

                            if(code==='-1'){

                                Message.alert(message,'消息提示')

                                this.linear = 0

                            }else{

                                let {user}=res.data.info

                                storage.setStorage('user',user,true)

                                this.$router.replace({name:'index'})
                            }

                        }).catch(err=>{

                            Message.alert('网络请求失败','消息提示')
                        })



                        console.log(postData)
                    }

                });
            },
            clear () {
                this.$refs.form.clear();
                this.user = {
                    username: '',
                    pwd: '',
                    isAgree: false
                };
            },
            toReg(){

                this.$router.push({name:'Reg'})

            }
        }
    }
</script>

<style scoped>

    .head{

        text-align: center;
        color: aqua;
        margin: 20px;


    }
    .login{

        text-align: center;

        font-size: 24px;
        color: aquamarine;

    }
    .r{

        color: red;

    }
</style>