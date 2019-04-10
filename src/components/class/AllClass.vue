<template>
    <div>
        <CommonHeader title="分类"></CommonHeader>
        <mu-paper :z-depth="1" class="demo-list-wrap">
            <mu-list>
                <mu-sub-header>所有分类</mu-sub-header>
                <mu-list-item @click="go(item)" :key="item.id" avatar button :ripple="false" v-for="item in classInfo">
                    <!--<mu-list-item-action>-->
                        <!--<mu-avatar>-->
                            <!--<img :src="item.img">-->
                        <!--</mu-avatar>-->
                    <!--</mu-list-item-action>-->
                    <mu-list-item-title>{{item.className}}</mu-list-item-title>
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
    export default {

        name: "AllClass",
        components: {CommonHeader},
        created(){

            http.get('/class/withParentClass').then(res=>{

                this.classInfo=res.data.info.data;
                console.log(res)

            }).catch(err=>{


            })

        },
        mounted(){

        },
        data(){
            return {
                classInfo:[],
            }
        },
        methods:{
            go({className,classId}){


                this.$router.push({name:'Search',params:{id:classId},query:{className}})
            }
        }
    }
</script>

<style scoped>

</style>