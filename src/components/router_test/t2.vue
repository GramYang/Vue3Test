<template>

    <h1>导航参数测试</h1>
    <div>{{this.$route.params}}</div>
    <p>route参数全是字符串，即便你传入的是数字或者其他类型，都会转换为字符串</p>

    <h1>方法中取导航参数和data测试</h1>
    <p>op1 {{op1()}} op2 {{op2()}}</p>
    <p>两种方式都可以正确获取</p>

    <el-button @click="op3">修改参数触发update</el-button>
    <h1>生命钩子测试结果2</h1>
    <p>a {{a}}</p>
    <p>从其他路由切换到本路由时，同样会调用beforecreate——created——beforeMount——mounted，前一路由则会调用beforeUnmount——unmounted</p>
</template>

<script>
import bag from '@/net/bag.js'
export default {
    data(){
        return{
            params:this.$route.params,
            a:1,
        }
    },
    mounted(){
        bag.a+=4
        console.log('t2 mounted',bag)//bag.a=19，说明路由跳转链会共享变量
        this.bag.a+=100
        console.log('t2 mounted globalproperties:',this.bag)
        console.log('mounted t2')
    },
    beforeMount(){
        console.log('beforeMount t2')
    },
    unmounted(){
        console.log('unmounted t2')
    },
    beforeUnmount(){
        console.log('beforeUnmount t2')
    },
    created(){
        bag.a+=3
        console.log('created t2')
    },
    beforeCreate(){
        console.log('beforeCreate t2')
    },
    updated(){
        console.log('updated t2')
    },
    beforeUpdate(){
        console.log('beforeUpdate t2')
    },
    methods:{
        op1(){
            return this.params
        },
        op2(){
            return this.$route.params
        },
        op3(){
            this.a+=10
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>