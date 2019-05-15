<template>
    <mu-row>
        <mu-col>
            <mu-paper :z-depth="zDepth">
                <mu-list textline="two-line" @change="change">
                    <mu-list-item value="publish" avatar button :ripple="ripple">
                        <mu-list-item-action>
                            <mu-avatar>
                                <mu-icon value="favorite" color="red"></mu-icon>
                            </mu-avatar>
                        </mu-list-item-action>
                        <mu-list-item-content>
                            <mu-list-item-title>发布闲置</mu-list-item-title>
                            <mu-list-item-sub-title>30秒发布</mu-list-item-sub-title>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-list-item value="change" avatar button :ripple="ripple" @click="no">
                        <mu-list-item-action>
                            <mu-avatar>
                                <mu-icon value="favorite" color="red"></mu-icon>
                            </mu-avatar>
                        </mu-list-item-action>
                        <mu-list-item-content>
                            <mu-list-item-title @click="no">淘宝转卖</mu-list-item-title>
                            <mu-list-item-sub-title>网购宝贝一键发布</mu-list-item-sub-title>
                        </mu-list-item-content>
                    </mu-list-item>
                    <mu-list-item avatar button :ripple="ripple" @click="no">
                        <mu-list-item-action>
                            <mu-avatar>
                                <mu-icon value="favorite" color="red"></mu-icon>
                            </mu-avatar>
                        </mu-list-item-action>
                        <mu-list-item-content>
                            <mu-list-item-title>信用回收</mu-list-item-title>
                            <mu-list-item-sub-title>57类上门回收</mu-list-item-sub-title>
                        </mu-list-item-content>
                    </mu-list-item>
                </mu-list>
            </mu-paper>
        </mu-col>
        <mu-bottom-sheet :open.sync="open">
            <mu-list @item-click="closeBottomSheet">
                <mu-sub-header>选择一个</mu-sub-header>
                <mu-list-item button :to="{name:'PublishBook'}">
                    <mu-list-item-action>
                        <mu-icon value="grade" color="orange"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>发布书籍</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :to="{name:'PublishGoods'}">
                    <mu-list-item-action>
                        <mu-icon value="inbox" color="blue"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>发布闲置</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
    </mu-row>
</template>

<script>

    import Message from 'muse-ui-message/dist/muse-ui-message'
    export default {
        name: "Center",

        data(){

            return {
                ripple:true,
                button:true,
                zDepth:5,
                open: false,
                openSimple: false
            }
        },
        methods:{
            change(e){
                if(e==='publish'){
                    this.openBotttomSheet();
                }else{

                }
            },
            no(){

                Message.alert('该功能后续会推出')
            },
            closeBottomSheet () {
                this.open = false;
            },
            openBotttomSheet () {
                this.open = true;
            }

        }
    }
</script>

<style scoped>

</style>