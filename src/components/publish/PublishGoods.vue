<template>
    <mu-container>
        <common-header title="发布闲置"></common-header>

        <mu-form ref="goods" :model="goods" class="mu-demo-form" :label-position="labelPosition" label-width="100">
            <mu-form-item labelWidth="100%" prop="input" label="标题 品类品牌型都是买家喜欢搜索的" help-text="">
                <mu-text-field v-model="goods.input"></mu-text-field>
            </mu-form-item>

            <mu-form-item labelWidth="100%" prop="textarea" label="描述宝贝的转手原因 入手渠道和使用感受">
                <mu-text-field multi-line :rows="4" :rows-max="6" v-model="goods.textarea"></mu-text-field>
            </mu-form-item>

            <mu-form-item prop="select" label="分类">
                <mu-select v-model="goods.select">
                    <mu-option v-for="option,index in options" :key="option" :label="option" :value="option"></mu-option>
                </mu-select>
            </mu-form-item>

            <mu-form-item prop="slider" label="新旧">
                <mu-slider v-model="goods.slider" :max="max" :min="min"></mu-slider>
            </mu-form-item>

            <mu-form-item labelWidth="100%" prop="input" label="价格" help-text="">
                <mu-text-field v-model="goods.input"></mu-text-field>
            </mu-form-item>

            <mu-form-item>
                <mu-button color="primary" @click="submit">确认发布</mu-button>
            </mu-form-item>
        </mu-form>

    </mu-container>

</template>

<script>

    import CommonHeader from '../common/Header'
    export default {
        name: "PublishGoods",
        data(){
            return {
                max:100,
                min:1,
                options: [
                    'Option 1', 'Option 2', 'Option 3', 'Option 4',
                    'Option 5', 'Option 6', 'Option 7', 'Option 8',
                    'Option 9', 'Option 10'
                ],
                labelPosition: 'top',
                goods: {
                    title: '',
                    select: '',
                    slider: 1,
                    textarea: ''
                }
            }
        },
        methods:{
            submit(){
                this.$refs.goods.validate().then((result) => {
                    console.log('form valid: ', result)
                });
            }
        },
        components:{CommonHeader}
    }
</script>

<style scoped>

</style>