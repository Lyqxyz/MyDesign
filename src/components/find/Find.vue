<template>
    <mu-container>
        <mu-row gutter>
            <mu-col span="2">
                <mu-button icon color="black" @click="goBack">
                    <mu-icon value="keyboard_backspace"></mu-icon>
                </mu-button>
            </mu-col>
            <mu-col span="10">
                <mu-auto-complete @change="nameChange" :action-click="search" prefix="搜索" action-icon="search" :data="items" underline-color="info" :full-width="full_width" :max-search-results="max_search_results" v-model="searchName">
                </mu-auto-complete>
            </mu-col>
        </mu-row>
        <mu-row v-if="hasSearch">
            <mu-col span="8">
                <p class="t">最近搜索</p>
            </mu-col>
            <mu-col span="2" offset="2">
                <p class="clear t" @click="clear">清空</p>
            </mu-col>

        </mu-row>
        <mu-row gutter>
            <mu-chip class="demo-chip" v-if="index<5" v-for="(chip,index) in chips" :key="index" color="success">{{chip}}</mu-chip>
        </mu-row>
    </mu-container>
</template>

<script>
    import Message from 'muse-ui-message/dist/muse-ui-message'
    export default {
        name: "Find",
        created(){
            let info = '本搜索引擎还未完善，搜索书籍，提供名字,ISBN,作者。' +
                '示例:1-xxx-xxx-xxx。' +
                '搜索闲置，提供标题和描述' +
                '。示例：0-xxx-xxx。1和0分别代表书籍和闲置。更多搜索规则还在完善，敬请期待'
            Message.alert(info,'搜索规则')
            let search =JSON.parse(localStorage.getItem('search'))
            if(search===null){
                localStorage.setItem('search',JSON.stringify([]));
            }else{

                this.chips=search.reverse()
                this.items=search
                this.hasSearch=true
            }
        },
        data(){
            return {
                searchName:'',
                full_width:true,
                max_search_results:5,
                items:[],
                chips: [],
                hasSearch:false,
            }
        },
        methods:{
            search(){
                let search = JSON.parse(localStorage.getItem('search'))
                if(search===null){

                    localStorage.setItem('search',JSON.stringify([this.searchName]));
                }else {

                    if(this.searchName!==''){
                        if(!search.includes(this.searchName)){

                            search.push(this.searchName)

                            // this.items.push(this.searchName)
                        }
                        localStorage.setItem('search',JSON.stringify(search))
                    }
                }

            },
            nameChange(){},
            goBack(){

                this.$router.go(-1)
            },
            clear(){

                localStorage.removeItem('search')
                this.hasSearch=false
                this.chips=[]
            }


        }
    }
</script>

<style scoped>
.t{

    text-align: center;
    font-weight: bold;
}
.clear{
    color: red;
}
</style>