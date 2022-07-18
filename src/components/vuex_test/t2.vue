<template>
    <h1>一个store复杂映射的测试</h1>
    <div>state1 {{state1}} state2 {{state2}} state1.d.y{{state1.d.y}}</div>
    <div>s1 {{s1}} s2{{s2}}</div>
    <div>state3 {{state3}}</div>
    <div>s3 {{s3}}</div>
    <p>不能用data里的变量再去映射computed属性，data属性之间赋值也不行，即便是基本类型也不行</p>

    <h1>方法中获取store值然后赋值data测试</h1>
    <div>state4 {{state4}}</div>
    <el-button @click="op3">修改</el-button>
    <p>用method取store的值赋给data变量是可行的，对data变量的修改不会影响store</p>
</template>

<script>
export default {
    data(){
        return{
            switch:false,
            state2:this.state1,//data属性之间不能赋值
            state3:this.$store.state.a.obj1,//可以用store赋值
            s1:'1',
            s2:this.s1,
            s3:'a'+this.s1,
            state4:{
                a:this.op1(),
                d:this.op2(),
            }
        }
    },
    computed:{
        state1(){
            if(this.switch){
                return this.$store.state.a.obj1
            }else{
                return {d:{y:1}}//这个地方不能返回{}，必须有一个默认值
            }
        }
    },
    methods:{
        op1(){
            return this.$store.state.a.obj1.b
        },
        op2(){
            return this.$store.state.a.obj1.d
        },
        op3(){
            this.state4.a+=1
            this.state4.d={}
            console.log(this.$store.state.a.obj1)//不会修改store
        }
    }
}
</script>