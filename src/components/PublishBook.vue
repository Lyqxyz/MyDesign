<template>
    <mu-container :fluid="fluid">
       <CommonHeader title="发布书籍"></CommonHeader>
        <mu-row>
            <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="input" label="Input">
                    <mu-text-field v-model="form.input"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="select" label="Select">
                    <mu-select v-model="form.select">
                        <mu-option v-for="(option,index) in options" :key="option" :label="option" :value="option"></mu-option>
                    </mu-select>
                </mu-form-item>
                <mu-form-item prop="date" label="Date Time">
                    <mu-date-input v-model="form.date" type="dateTime" actions></mu-date-input>
                </mu-form-item>
                <mu-form-item prop="radio" label="Radio">
                    <mu-radio v-model="form.radio" value="male" label="Male"></mu-radio>
                    <mu-radio v-model="form.radio" value="female" label="Female"></mu-radio>
                </mu-form-item>
                <mu-form-item prop="checkbox" label="Checkbox">
                    <mu-checkbox v-model="form.checkbox" value="eat" label="Eat"></mu-checkbox>
                    <mu-checkbox v-model="form.checkbox" value="sleep" label="Sleep"></mu-checkbox>
                    <mu-checkbox v-model="form.checkbox" value="run" label="Run"></mu-checkbox>
                    <mu-checkbox v-model="form.checkbox" value="movie" label="Movie"></mu-checkbox>
                </mu-form-item>
                <mu-form-item prop="switch" label="Switch">
                    <mu-switch v-model="form.switch"></mu-switch>
                </mu-form-item>
                <mu-form-item prop="slider" label="Slider">
                    <mu-slider v-model="form.slider"></mu-slider>
                </mu-form-item>
                <mu-form-item prop="textarea" label="Textarea">
                    <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.textarea"></mu-text-field>
                </mu-form-item>
            </mu-form>
            <mu-button>发布</mu-button>
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
                fluid:true,
                options: [
                    'Option 1', 'Option 2', 'Option 3', 'Option 4',
                    'Option 5', 'Option 6', 'Option 7', 'Option 8',
                    'Option 9', 'Option 10'
                ],
                labelPosition: 'top',
                form: {
                    input: '',
                    select: '',
                    date: '',
                    radio: '',
                    checkbox: [],
                    switch: false,
                    slider: 30,
                    textarea: ''
                }
            }
        },
        methods:{
            goback(){
                console.log(this.$router);
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>