<template>
    <mu-container>
        <CommonHeader title="修改书籍"></CommonHeader>
        <mu-row>
            <mu-form ref="form" :model="book" class="mu-demo-form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="bookName" label="书名" :rules="bookNameRules">
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

                <mu-form-item prop="bookNao" label="数量">
                    <mu-slider v-model="book.bookCount" :max="countMax" :min="countMin"></mu-slider>
                </mu-form-item>
                <mu-form-item prop="bookDes" label="描述">
                    <mu-text-field multi-line :rows="3" :rows-max="6" v-model="book.bookDes"></mu-text-field>
                </mu-form-item>
                <mu-form-item>
                    <mu-button color="primary" @click="submit" textColor="black">提交</mu-button>
                    <mu-button @click="updatePic" color="warning" textColor="black">修改图片</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-row>
    </mu-container>
</template>

<script>

    import CommonHeader from '../common/Header'

    import http from '../../api'

    import storage from '../../assets/utils/StorageUtils'

    import Qs from 'qs'

    import Message from 'muse-ui-message/dist/muse-ui-message'

    export default {
        name: "UpdateBook",
        components: {CommonHeader},
        created(){

            http.get('/class/withParentClass').then(res=>{

                this.options=res.data.info.data;

            }).catch(err=>{

                Message.alert('服务器错误','消息提示')
            })
            let {id} =  this.$route.params

            http.get('/book/arg/'+id).then(res=>{

                this.book=res.data.info.data
                console.log(res.data.info.data)

            }).catch(err=>{

                Message.alert('消息提示','当前访问人数过多，请稍后再试!')
                console.log(err)
            })
            console.log(id)

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
                countMax:999,
                countMin:1,
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
                    bookCount:1,
                    bookNao:1,
                    bookSellingPrice:'',
                    bookOriginalPrice:'',
                    bookPublish:'',
                    uid:'',
                }
            }
        },
        methods:{

            updatePic(){

                this.$router.push({name:'updatePic',params:{id:this.book.bookId},query:{isBook:true}})
            },
            submit(){
                let nao = Math.round(this.book.bookNao)
                let count = Math.floor(this.book.bookCount)
                let postData = `bookId=${this.book.bookId}
                                &bookName=${this.book.bookName}
                                &bookIsbn=${this.book.bookIsbn}
                                &bookAuthor=${this.book.bookAuthor}
                                &bookPublish=${this.book.bookPublish}
                                &bookOriginalPrice=${this.book.bookOriginalPrice}
                                &bookSellingPrice=${this.book.bookSellingPrice}
                                &bookNao=${nao}
                                &bookCount=${count}
                                &bookDes=${this.book.bookDes}
                                &bookCid=${this.book.bookCid}`

                http.post('/book/updateBook/'+this.book.bookId,postData).then(res=>{

                    let {code,message} = res.data

                    Message.alert(message)


                }).catch(err=>{

                    console.log(err)
                    Message.alert('当前访问人数过多，请稍后再试!','消息提示')
                })

            }
        }
    }
</script>

<style scoped>

</style>