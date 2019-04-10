<template>
    <mu-container>
        <CommonHeader title="发布书籍"></CommonHeader>
        <mu-row>
            <mu-form ref="form" :model="book" class="mu-demo-form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="bookName" label="名字" :rules="bookNameRules">
                    <mu-text-field v-model="book.bookName"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="bookIsbn" label="ISBN" :rules="bookIsbnRules">
                    <mu-text-field v-model="book.bookIsbn"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="bookAuthor" label="作者">
                    <mu-text-field v-model="book.bookAuthor"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="bookPublish" label="出版商">
                    <mu-text-field v-model="book.bookPublish"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="bookOriginalPrice" label="原价" :rules="bookOriginalPriceRules">
                    <mu-text-field v-model="book.bookOriginalPrice"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="bookSellingPrice" label="售价" :rules="bookSellingPriceRules">
                    <mu-text-field v-model="book.bookSellingPrice"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="bookCid" label="分类">
                    <mu-select v-model="book.bookCid">
                        <mu-option v-for="(item,index) in options" :key="item.classId" :label="item.className" :value="item.classId"></mu-option>
                    </mu-select>
                </mu-form-item>
                <mu-form-item prop="bookNao" label="新旧">
                    <mu-slider v-model="book.bookNao" :max="max" :min="min"></mu-slider>
                </mu-form-item>
                <mu-form-item prop="bookDes" label="描述">
                    <mu-text-field multi-line :rows="3" :rows-max="6" v-model="book.bookDes"></mu-text-field>
                </mu-form-item>
                <mu-form-item>
                    <mu-button color="primary" @click="submit" textColor="black">提交</mu-button>
                    <mu-button @click="clear" color="warning" textColor="black">重置</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-row>
    </mu-container>
</template>

<script>
    import CommonHeader from '../common/Header'
    import http from '../../api'
    export default {
        name: "PublishGoods",
        components:{CommonHeader},
        created(){

            http.get('/class/withParentClass').then(res=>{

                this.options=res.data.info.data;

                console.log(this.options)

            }).catch(err=>{


            })

        },
        data(){
            return {
                bookNameRules:[
                    { validate: (val) => !!val, message: '必须填写书籍名'},
                    { validate: (val) => val.length <= 20&&val.length>=1, message: '书名长度大于1小于20'}
                ],
                bookIsbnRules:[
                    { validate: (val) => !!val, message: '必须填写ISBN'},
                    { validate: (val) => val.length <= 13&&val.length>=10, message: 'ISBN长度不合法'}
                ],
                bookOriginalPriceRules:[
                    { validate: (val) => !!val, message: '必须填写原价'},
                    { validate: (val) => parseInt(val)>0, message: '原价不合法'},
                ],
                bookSellingPriceRules:[
                    { validate: (val) => !!val, message: '必须填写售价'},
                    { validate: (val) => parseInt(val)>0, message: '售价不合法'},
                ],
                max:10,
                min:1,
                options: [

                ],
                labelPosition: 'top',
                book: {

                    bookName:'',
                    bookIsbn:'',
                    bookAuthor:'',
                    bookDes:'',
                    bookCid:'',
                    bookCount:'',
                    bookNao:1,
                    bookSellingPrice:'',
                    bookOriginalPrice:'',
                    bookPublish:'',
                    uid:'',
                }
            }
        },
        methods:{
            submit () {
                this.$refs.form.validate().then((result) => {
                    console.log('form valid: ', result)

                    if(result){

                    }else{


                    }

                    console.log(this.book)
                    //this.$router.push({name:'AddImage',params:{id:50},query:{isBook:true}})
                });
            },
            clear () {
                this.$refs.form.clear();

        }
        }
    }
</script>

<style scoped>

</style>