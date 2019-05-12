<template>
    <div>
        <h1 class="head">辽科大二手交易平台</h1>

        <p class="login">登录</p>

        <mu-form ref="form" :model="user" class="mu-demo-form">
            <mu-form-item prop="username" :rules="usernameRules" icon="account_circle">
                <mu-text-field v-model="user.username"  label-float prop="username"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="pwd" :rules="pwdRules" icon="locked">
                <mu-text-field type="password" label-float   v-model="user.pwd" prop="pwd" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="isAgree" :rules="argeeRules" icon="agree">
                <mu-checkbox label="同意用户协议" v-model="user.isAgree"></mu-checkbox>
                <span class="r" @click="toReg">[注册]</span>
                <span>&nbsp;</span>
                <span class="r" @click="forget">[忘记密码]</span>
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

                usernameRules: [
                    { validate: (val) => !!val, message: '必须填写学号'},
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
                },
                visibility:true
            }
        },
        created () {

        },
        methods: {
            submit () {
                this.$refs.form.validate().then((result) => {

                    if(result){
                        let postData=Qs.stringify(this.user)
                        console.log(postData)
                        http.post('/indexLogin',postData).then(res=>{

                            let {code,message} = res.data

                            if(code==='-1'){
                                Message.alert(message)
                            }else{

                                let {user}=res.data.info

                                storage.setStorage('user',user,true)

                                this.$router.replace({name:'index'})
                            }

                        }).catch(err=>{

                            console.log(err)

                            Message.alert('当前访问人数太多','消息提示')
                        })
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
            },
            forget(){
                this.$router.push({name:'forget'})
            }
        }
    }
</script>

<style scoped>

    .head{
        text-align: center;
        color: black;
        margin: 20px;
    }
    .login{

        text-align: center;
        font-size: 24px;
        color: black;

    }
    .r{

        color: red;

    }
</style>