<template>
    <mu-container>
        <common-header title="发布闲置"></common-header>

        <mu-form ref="goods" :model="goods" class="mu-demo-form" :label-position="labelPosition" label-width="100">
            <mu-form-item labelWidth="100%" prop="goodsTitle" label="标题 品类品牌型都是买家喜欢搜索的" help-text="" :rules="goodsTitleRules">
                <mu-text-field v-model="goods.goodsTitle"></mu-text-field>
            </mu-form-item>

            <mu-form-item labelWidth="100%" prop="goodsDes" label="描述宝贝的转手原因 入手渠道和使用感受" :rules="goodsDesRules">
                <mu-text-field multi-line :rows="4" :rows-max="6" v-model="goods.goodsDes"></mu-text-field>
            </mu-form-item>

            <mu-form-item prop="goodsCid1" label="分类">
                <mu-select v-model="goods.goodsCid1">
                    <mu-option v-for="(item,index) in options" :key="item.classId" :label="item.className" :value="item.classId"></mu-option>
                </mu-select>
            </mu-form-item>

            <mu-form-item prop="goodsNao" label="新旧">
                <mu-slider v-model="goods.goodsNao" :max="max" :min="min"></mu-slider>
            </mu-form-item>

            <mu-form-item labelWidth="100%" prop="goodsOriginalPrice" label="原价" help-text="" :rules="goodsOriginalPriceRules">
                <mu-text-field v-model="goods.goodsOriginalPrice"></mu-text-field>
            </mu-form-item>

            <mu-form-item labelWidth="100%" prop="goodsSellingPrice" label="售价" help-text="" :rules="goodsSellingPriceRules">
                <mu-text-field v-model="goods.goodsSellingPrice"></mu-text-field>
            </mu-form-item>

            <mu-form-item>
                <mu-button color="primary" @click="submit">确认发布</mu-button>
                <mu-button color="warning" @click="reset">重新填写</mu-button>
            </mu-form-item>
        </mu-form>

    </mu-container>

</template>

<script>

    import CommonHeader from '../common/Header'

    import Message from 'muse-ui-message/dist/muse-ui-message'

    import http from '../../api'

    import storage from  '../../assets/utils/StorageUtils'

    import Qs from 'qs'

    export default {
        name: "PublishGoods",

        created(){

            http.get('/class/withParentClass').then(res=>{

                this.options=res.data.info.data;

            }).catch(err=>{

                Message.alert('服务器错误','消息提示')
            })

        },
        data(){
            return {

                goodsTitleRules:[
                    { validate: (val) => !!val, message: '必须填写标题'},
                    { validate: (val) => val.length <= 50&&val.length>=5, message: '书名长度大于5小于50'}
                ],

                goodsDesRules:[
                    { validate: (val) => !!val, message: '必须填写描述'},
                    { validate: (val) => val.length <= 200&&val.length>=5, message: '书名长度大于5小于200'}
                ],

                goodsOriginalPriceRules:[
                    { validate: (val) => !!val, message: '必须填写原价'},
                    { validate: (val) => parseInt(val)>0, message: '原价不合法'},
                ],
                goodsSellingPriceRules:[
                    { validate: (val) => !!val, message: '必须填写售价'},
                    { validate: (val) => parseInt(val)>0, message: '售价不合法'},
                ],

                max:10,
                min:1,
                options: [],
                labelPosition: 'top',
                goods: {
                    goodsId:'',
                    goodsTitle:'',
                    goodsOriginalPrice:'',
                    goodsSellingPrice:'',
                    goodsNao:1,
                    goodsDes:'',
                    goodsCount:'',
                    goodsCid1:'',
                    uid:'',
                }
            }
        },
        methods:{
            submit(){


                this.$refs.goods.validate().then((result) => {

                    this.goods.goodsNao= Math.round(this.goods.goodsNao)

                    let user = storage.getStorage('user',true)

                    let userId= user.userId;

                    this.goods.uid =userId

                    let a =Qs.stringify(this.goods)

                    if(result){

                        http.post('/goods/add',a).then(res=>{

                            let {code,message,info} = res.data
                            if(code==='-1'){

                                Message.alert(message,'消息提示')
                            }else{

                                let goodsId=info.goods.goodsId
                                this.$router.push({name:'AddImage',params:{id:goodsId},query:{isBook:false}})

                            }


                            console.log(res.data)
                        }).catch(err=>{

                            Message.alert('请检查网络是否连接','消息提示')
                        })


                    }else{

                        Message.alert('请检查参数','消息提示')

                    }

                });
            },
            reset(){

                this.$refs.goods.clear();
            }
        },
        components:{CommonHeader}
    }
</script>

<style scoped>

</style>