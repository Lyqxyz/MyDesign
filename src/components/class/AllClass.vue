<template>
    <div>
        <CommonHeader title="分类"></CommonHeader>
        <mu-paper :z-depth="1" class="demo-list-wrap">
            <mu-list>
                <mu-sub-header>所有分类</mu-sub-header>
                <mu-list-item @click="go(item.id)" :key="item.id" avatar button :ripple="false" v-for="item in classInfo">
                    <mu-list-item-action>
                        <mu-avatar>
                            <img :src="item.img">
                        </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-title>{{item.name}}</mu-list-item-title>
                    <mu-list-item-action>
                        <mu-icon value="chat_bubble"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
            </mu-list>
            <mu-divider></mu-divider>
        </mu-paper>
    </div>
</template>

<script>
    import CommonHeader from '../common/Header'
    import http from '../../api'

    import {Mock,Random} from '../../mock'
    export default {

        name: "AllClass",
        components: {CommonHeader},
        created(){

            for (let i = 1 ;i<5;i++){

                let Class = {
                    id:Mock.mock('@integer()'),
                    name:Mock.mock('@string'),
                    img:Random.image('50x50', '#894FC4', '#FFF', 'png', 'T')
                }

                this.classInfo.push(Class)

            }
           console.log(this.classInfo)


        },
        mounted(){


        },
        data(){
            return {
                classInfo:[],
            }
        },
        methods:{
            go(id){
                console.log(id)
            }
        }
    }
</script>

<style scoped>

</style>