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
                    <mu-list-item button :ripple="ripple">
                        <mu-list-item-action>
                            <mu-icon value="grade"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>分享</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="ripple">
                        <mu-list-item-action>
                            <mu-icon value="send"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>消息</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="ripple" :to="{name:'AllClass'}">
                        <mu-list-item-action>
                            <mu-icon value="drafts"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>分类</mu-list-item-title>
                    </mu-list-item>
                </mu-list>
            </mu-menu>
        </mu-appbar>
        <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
            <mu-list>
                <mu-list-item button>
                    <mu-avatar color="indigo">
                        <mu-icon value="account_circle"></mu-icon>
                    </mu-avatar>
                </mu-list-item>
                <mu-list-item button :to="{name:'index'}">
                    <mu-list-item-action>
                        <mu-icon value="home"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>首页</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-button icon>
                            <mu-icon value="info"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>

                <mu-list-item button>
                    <mu-list-item-action>
                        <mu-icon value="grade"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>我的资料</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-button icon>
                            <mu-icon value="info"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>

                <mu-list-item button :to="{name:'MyPublish'}">
                    <mu-list-item-action>
                        <mu-icon value="grade"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>我发布的</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :to="{name:'ShopCar'}">
                    <mu-list-item-action>
                        <mu-icon value="send"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>购物车</mu-list-item-title>
                </mu-list-item>

                <mu-list-item button :to="{name:'AllClass'}">
                    <mu-list-item-action>
                        <mu-icon value="grade"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>分类</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :to="{name:'Order'}">
                    <mu-list-item-action>
                        <mu-icon value="drafts"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>订单</mu-list-item-title>
                </mu-list-item>
                <mu-list-item @click="open = false" button>
                    <mu-list-item-title>关闭</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
    </mu-row>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                isActive: true,
                docked: false,
                open: false,
                position: 'left',
                ripple:true,
            }
        },
        methods:{
            scroll(){
                if(window.scrollY>=500){
                    this.isActive=true
                }else{
                    this.isActive=false
                }
            }
        }
    }
</script>

<style scoped>
    .top{
        position: fixed;
    }
</style>