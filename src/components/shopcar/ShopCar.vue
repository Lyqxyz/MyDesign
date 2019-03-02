<template>
    <div>
        <common-header title="购物车"></common-header>
        <mu-paper :z-depth="1" class="demo-list-wrap">
            <mu-list textline="two-line">
                <mu-sub-header inset>Folders</mu-sub-header>
                <mu-list-item avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon value="folder"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>Photos</mu-list-item-title>
                        <mu-list-item-sub-title>Jan 9, 2014</mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon>
                            <mu-icon value="info"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon value="folder"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>Recipes</mu-list-item-title>
                        <mu-list-item-sub-title>Jan 17, 2014</mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon>
                            <mu-icon value="info"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar>
                            <mu-icon value="folder"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>Work</mu-list-item-title>
                        <mu-list-item-sub-title>Jan 28, 2014</mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon>
                            <mu-icon value="info"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
            <mu-divider inset></mu-divider>
            <mu-list textline="two-line">
                <mu-sub-header inset>Files</mu-sub-header>
                <mu-list-item avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar color="blue">
                            <mu-icon value="assignment"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>Vacation itinerary</mu-list-item-title>
                        <mu-list-item-sub-title>Jan 20, 2014</mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon>
                            <mu-icon value="info"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item avatar button :ripple="false">
                    <mu-list-item-action>
                        <mu-avatar color="yellow600">
                            <mu-icon value="insert_chart"></mu-icon>
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                        <mu-list-item-title>Kitchen remodel</mu-list-item-title>
                        <mu-list-item-sub-title>Jan 10, 2014</mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action>
                        <mu-button icon>
                            <mu-icon value="info"></mu-icon>
                        </mu-button>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
        </mu-paper>
        <mu-row>
            <mu-button color="primary">收入口袋</mu-button>
        </mu-row>
    </div>
</template>

<script>
    import CommonHeader from '../common/Header'
    export default {
        name: "shopcar",
        components: {CommonHeader}
    }
</script>

<style scoped>

</style>