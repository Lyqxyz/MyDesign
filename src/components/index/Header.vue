<template>
    <mu-row v-scroll="scroll">
        <mu-appbar style="width: 100%" :class="{top:isActive}" color="primary">
            <mu-button icon slot="left" @click="open = !open">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            首页
            <mu-menu slot="right">
                <mu-button icon>
                    <mu-icon value="more_vert"></mu-icon>
                </mu-button>
                <mu-list slot="content">
                    <mu-list-item  button :ripple="ripple" :to="{name:'Login'}">
                        <mu-list-item-action>
                            <mu-icon value="person"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>登录</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="ripple" @click="logout">
                        <mu-list-item-action>
                            <mu-icon value="close"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>注销</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="ripple" :to="{name:'Sent'}">
                        <mu-list-item-action>
                            <mu-icon value="send"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>
                            待发货
                        </mu-list-item-title>
                    </mu-list-item>
                </mu-list>
            </mu-menu>
        </mu-appbar>
        <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
            <mu-list>
                <mu-list-item button>
                    <mu-avatar color="indigo">
                        <img v-if="src!==null" :src="src | url" alt="用户头像">
                        <mu-icon v-else value="account_circle"></mu-icon>
                    </mu-avatar>
                    {{info.userName===undefined?'未登录':'昵称：'+info.userName}}
                </mu-list-item>
                <mu-list-item button :to="{name:'index'}">
                    <mu-list-item-action>
                        <mu-icon value="home"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>首页</mu-list-item-title>
<!--                    <mu-list-item-action>-->
<!--                        <mu-button icon>-->
<!--                            <mu-icon value="info"></mu-icon>-->
<!--                        </mu-button>-->
<!--                    </mu-list-item-action>-->
                </mu-list-item>

                <mu-list-item button :to="{name:'updatePhoto'}">
                    <mu-list-item-action>
                        <mu-icon value="camera_alt"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>修改头像</mu-list-item-title>
<!--                    <mu-list-item-action>-->
<!--                        <mu-button icon>-->
<!--                            <mu-icon value=""></mu-icon>-->
<!--                        </mu-button>-->
<!--                    </mu-list-item-action>-->
                </mu-list-item>

                <mu-list-item button :to="{name:'MyPublish'}">
                    <mu-list-item-action>
                        <mu-icon value="arrow_forward"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>我发布的</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :to="{name:'ShopCar'}">
                    <mu-list-item-action>
                        <mu-icon value="local_grocery_store"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>购物车</mu-list-item-title>
                </mu-list-item>

                <mu-list-item button :to="{name:'AllClass'}">
                    <mu-list-item-action>
                        <mu-icon value="class"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>分类</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :to="{name:'Order'}">
                    <mu-list-item-action>
                        <mu-icon value="inbox"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>订单</mu-list-item-title>
                </mu-list-item>

                <mu-list-item button :to="{name:'find'}">
                    <mu-list-item-action>
                        <mu-icon value="search"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>搜索</mu-list-item-title>
                </mu-list-item>

                <mu-list-item @click="open = false" button>
                    <mu-list-item-action>
                        <mu-icon value="close"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>关闭</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
    </mu-row>
</template>

<script>
    import Message from 'muse-ui-message/dist/muse-ui-message'

    import storage from '../../assets/utils/StorageUtils'
    export default {
        name: "Header",
        created(){
            let user = storage.getStorage('user',true)
            this.info=user;
            this.src=user.userPhoto
        },
        data() {
            return {
                isActive: true,
                docked: false,
                open: false,
                position: 'left',
                ripple:true,
                user:[],
                info:{},
                src:''
            }
        },
        filters:{
            userPhoto(val){
                if(val.includes('base64')){
                    return val
                }else if(val.includes('/upload')){
                    return 'http://localhost:8080'+val;
                }
            }

        },
        methods:{
            scroll(){
                if(window.scrollY>=500){
                    this.isActive=true
                }else{
                    this.isActive=false
                }
            },
            logout(){

                let user = storage.getStorage('user',true)
                if(user.length===0){

                    Message.alert("请先登录","消息提示")

                }else{

                    Message.confirm('是否注销','消息提示').then(res=>{

                        let {result}=res;
                        if(result){
                            storage.removeStorage('user',true)
                            this.info={}
                            this.src =null;
                        }
                    })

                }

            }
        },
        computed:{

            okLogin(){




            }

        }
    }
</script>

<style scoped>
    .top{
        position: fixed;
    }
</style>