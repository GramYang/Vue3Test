<template>
    <h1>动态路由测试</h1>
    <div>路由参数 {{this.$route.params}}</div>

    <h1>导航参数测试</h1>
    <el-button @click="this.$router.push({name:'RouterTest2',params:{a:1,b:'c'}})">跳转t2</el-button>

    <el-button type="primary" @click="op1">修改参数触发update钩子</el-button>
    <p>a {{a}}</p>
    <h1>生命钩子测试结果1</h1>
    <p>开始依次调用beforecreate——created——beforeMount——mounted，update必须在data数据显示在template时才会触发</p>
</template>

<script>
import bag from '@/net/bag.js'
export default {
    data(){
        return{
            a:1
        }
    },
    beforeUpdate(){
        console.log('beforeUpdate t1')
    },
    updated(){
        console.log('updated t1')
    },
    beforeMount(){
        console.log('beforeMount t1')
    },
    mounted(){
        bag.a+=2
        console.log('mounted t1')
    },
    unmounted(){
        console.log('unmounted t1')
    },
    beforeUnmount(){
        console.log('beforeUnmount t1')
    },
    created(){
        bag.a=10
        console.log('created t1')
    },
    beforeCreate(){
        console.log('beforecreate t1')
    },
    methods:{
        op1(){
            this.a+=10
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>