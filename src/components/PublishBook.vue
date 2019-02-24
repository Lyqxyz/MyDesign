<template>
    <mu-container>
        <CommonHeader title="发布书籍"></CommonHeader>
        <mu-row>
            <mu-form ref="form" :model="book" class="mu-demo-form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="name" label="名字" :rules="nameRules">
                    <mu-text-field v-model="book.name"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="ISBN" label="ISBN" :rules="ISBNRules">
                    <mu-text-field v-model="book.ISBN"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="author" label="作者">
                    <mu-text-field v-model="book.author"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="publish" label="出版商">
                    <mu-text-field v-model="book.publish"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="originalPrice" label="原价" :rules="originalPriceRules">
                    <mu-text-field v-model="book.originalPrice"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="sellingPrice" label="售价" :rules="sellingPriceRules">
                    <mu-text-field v-model="book.sellingPrice"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="cid" label="分类">
                    <mu-select v-model="book.cid">
                        <mu-option v-for="(option,index) in options" :key="option" :label="option" :value="option"></mu-option>
                    </mu-select>
                </mu-form-item>
                <mu-form-item prop="nao" label="新旧">
                    <mu-slider v-model="book.nao" :max="max" :min="min"></mu-slider>
                </mu-form-item>
                <mu-form-item prop="des" label="描述">
                    <mu-text-field multi-line :rows="3" :rows-max="6" v-model="book.des"></mu-text-field>
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
    import CommonHeader from './common/Header'
    export default {
        name: "PublishGoods",
        components:{CommonHeader},
        data(){
            return {
                nameRules:[
                    { validate: (val) => !!val, message: '必须填写书籍名'},
                    { validate: (val) => val.length <= 20&&val.length>=1, message: '书名长度大于1小于20'}
                ],
                ISBNRules:[
                    { validate: (val) => !!val, message: '必须填写ISBN'},
                    { validate: (val) => val.length <= 13&&val.length>=10, message: 'ISBN长度不合法'}
                ],
                originalPriceRules:[
                    { validate: (val) => !!val, message: '必须填写原价'},
                    { validate: (val) => parseInt(val)>0, message: '原价不合法'},
                ],
                sellingPriceRules:[
                    { validate: (val) => !!val, message: '必须填写售价'},
                    { validate: (val) => parseInt(val)>0, message: '售价不合法'},
                ],
                max:100,
                min:1,
                options: [
                    'Option 1', 'Option 2', 'Option 3', 'Option 4',
                    'Option 5', 'Option 6', 'Option 7', 'Option 8',
                    'Option 9', 'Option 10'
                ],
                labelPosition: 'top',
                book: {
                    name: '',
                    ISBN:'',
                    author: '',
                    publish: '',
                    des: '',
                    cid:'',
                    originalPrice:'',
                    sellingPrice:'',
                    nao:1,
                }
            }
        },
        methods:{
            submit () {
                this.$refs.form.validate().then((result) => {
                    console.log('form valid: ', result)
                    this.$router.push({name:'AddImage',params:{id:50},query:{isBook:true}})
                });
            },
            clear () {
                this.$refs.form.clear();
                this.book = {
                    name: '',
                    ISBN:'',
                    author: '',
                    publish: '',
                    des: '',
                    cid:'',
                    originalPrice:'',
                    sellingPrice:'',
                    nao:1,
                };
        }
        }
    }
</script>

<style scoped>

</style>