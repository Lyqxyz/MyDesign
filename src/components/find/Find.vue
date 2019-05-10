<template>
    <mu-container>
        <mu-row gutter>
            <mu-col span="2">
                <mu-button icon color="black" @click="goBack">
                    <mu-icon value="keyboard_backspace"></mu-icon>
                </mu-button>
            </mu-col>
            <mu-col span="10">
                <mu-auto-complete @change="nameChange" :action-click="search" prefix="关键字" action-icon="search" :data="items" underline-color="info" :full-width="full_width" :max-search-results="max_search_results" v-model="searchName">
                </mu-auto-complete>
            </mu-col>
        </mu-row>

        <mu-row gutter v-for="(item,index) in book" :key="item.bookId" @click="goDetail(item)" class="mt">
            <mu-col span="12" v-html=" '书名:'+item.bookName +'  '+'作者:'+item.bookAuthor+'  '+ '出版商:'+item.bookPublish">
            </mu-col>
            <mu-col span="12" v-html=" 'ISBN号:'+item.bookIsbn">


            </mu-col>
            <mu-col class="pk" v-html="'描述:'+
                item.bookDes">
            </mu-col>

            <mu-divider shallow-inset></mu-divider>
        </mu-row>
        <mu-row gutter v-for="(item,index) in goods" :key="item.goodsId" @click="goDetail(item)" class="mt">
            <mu-col span="12" v-html="'商品标题:'+item.goodsTitle">
            </mu-col>
            <mu-col class="pk" v-html="'商品描述'+item.goodsDes">
            </mu-col>
            <mu-divider shallow-inset></mu-divider>
        </mu-row>
<!--        <mu-row v-if="hasSearch">-->
<!--            <mu-col span="8">-->
<!--                <p class="t">最近搜索</p>-->
<!--            </mu-col>-->
<!--            <mu-col span="2" offset="2">-->
<!--                <p class="clear t" @click="clear">清空</p>-->
<!--            </mu-col>-->

<!--        </mu-row>-->
<!--        <mu-row gutter>-->
<!--            <mu-chip class="demo-chip" v-if="index<5" v-for="(chip,index) in chips" :key="index" color="success">{{chip}}</mu-chip>-->
<!--        </mu-row>-->
    </mu-container>
</template>

<script>

    import http from '../../api'
    import Message from 'muse-ui-message/dist/muse-ui-message'

    import Progress from 'muse-ui-progress/dist/muse-ui-progress'
    export default {
        name: "Find",
        created(){
            // let info = '本搜索引擎还未完善，搜索书籍，提供名字,ISBN,作者。' +
            //     '搜索闲置，提供标题和描述'
            // Message.alert(info,'提示')
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
                book:[],
                goods:[],
            }
        },
        methods:{
            search(){

                if(this.searchName===''){
                    Message.alert('请输入关键字','消息提示')
                    return;
                }
                Progress.start();
                http.get(`/search/${this.searchName}`).then(res=>{
                    console.log(res.data)

                    let {code,message,info} =res.data

                    if(code==='-1'){

                        Message.alert(message,'消息提示')
                    }else{

                        this.book=info.book;
                        this.goods=info.goods;

                        if(info.book.length===0&&info.goods.length===0){

                            Message.alert("亲，没有查到哟,换一个词试试!",'搜索建议')
                        }
                    }
                    Progress.done();
                }).catch(err=>{
                    console.log(err)
                    Message.alert('当前搜索人数过多','消息提示')
                })

                let search = JSON.parse(localStorage.getItem('search'))
                if(search===null){
                    localStorage.setItem('search',JSON.stringify([this.searchName]));
                }else {
                    if(this.searchName!==''){
                        if(!search.includes(this.searchName)){
                            search.push(this.searchName)
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
            },
            goDetail(item){

                if(item.okBook===1){
                    this.$router.push({name:'Details',params:{id:item.bookId},query:{okBook:1,img:false}})
                }else{
                    this.$router.push({name:'Details',params:{id:item.goodsId},query:{okBook:0,img:false}})

                }

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
    .mt{

        margin: 5px;
    }
    .pk{
        word-break: break-word;
    }
</style>