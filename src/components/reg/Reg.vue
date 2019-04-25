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
            <mu-form-item>
               <span class="lo" @click="toLogin">[登录]</span>
            </mu-form-item>
            <mu-form-item>
                <mu-button color="primary" @click="submit">注册</mu-button>
                <mu-button @click="clear">重置</mu-button>
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
                ],

                phoneRules: [
                    { validate: (val) => !!val, message: '必须填写电话'},

                    { validate: (val) => val.length >= 11, message: '请填写正确电话号码'}

                ],
                reg:{
                    num:'',
                    name:'',
                    password:'',
                    email:'',
                    phone:'',

                },
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

            }
        }
    }
</script>

<style scoped>

    .reg{
        text-align: center;

        color: aquamarine;

        margin: 20px;

        font-size: 24px;

    }
    .lo{
        color: red;
        font-size: 16px;
        margin: 5px;
    }
</style>