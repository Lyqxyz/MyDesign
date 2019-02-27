<template>
    <div>
        <CommonHeader :title="title"></CommonHeader>
        <GoodsList :showList="list" :addList=""></GoodsList>
    </div>
</template>

<script>
    import CommonHeader from './common/Header'
    import GoodList from './common/GoodsList'
    export default {
        name: "Search",
        components: {GoodsList, CommonHeader},
        data(){
            return {

                title:'默认',
                refreshing: false,
                loading: false,
                list:[]
            }
        },
        created(){


        },
        methods:{
            load () {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;

                    let a= {
                        image: image,
                        title: 'water',
                        author: 'TDDyyyyyyy'
                    }
                    for (let i = 0; i <10 ; i++) {
                        this.list1.push(a)
                    }

                }, 2000)
        },
            addList(){

            }
        },
        computed:{


        }
    }
</script>

<style scoped>

</style>