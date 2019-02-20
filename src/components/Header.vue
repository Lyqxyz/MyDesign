<template>
    <mu-row>
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left" @click="open = !open">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            Title
            <mu-menu slot="right">
                <mu-button icon>
                    <mu-icon value="more_vert"></mu-icon>
                </mu-button>
                <mu-list slot="content">
                    <mu-list-item button :ripple="false">
                        <mu-list-item-action>
                            <mu-icon value="home"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>首页</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="false">
                        <mu-list-item-action>
                            <mu-icon value="grade"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>Stared</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="false">
                        <mu-list-item-action>
                            <mu-icon value="send"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>Sent mail</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button :ripple="false">
                        <mu-list-item-action>
                            <mu-icon value="drafts"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>Drafts</mu-list-item-title>
                    </mu-list-item>
                </mu-list>
            </mu-menu>
        </mu-appbar>
        <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
            <mu-list><mu-list-item button>
                <mu-list-item-action>
                    <mu-icon value="home"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>首页</mu-list-item-title>
            </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-action>
                        <mu-icon value="grade"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Stared</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-action>
                        <mu-icon value="send"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Sent mail</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                    <mu-list-item-action>
                        <mu-icon value="drafts"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>Drafts</mu-list-item-title>
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
                docked: false,
                open: false,
                position: 'left',
            }
        },
    }
</script>

<style scoped>

</style>