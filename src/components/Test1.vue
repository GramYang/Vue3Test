<template>
    <div class="t1">
        <p>主页</p>
        <span>测试1</span>
    </div>
    <h1>computed属性</h1>
    <div @click="op1">a {{a}} b{{b}}</div>
    <div>b1 {{b1}}</div>
    <el-button @click="op3">修改b1</el-button>
    <p>computed属性也是响应式的</p>

    <h1>@click动态绑定方法</h1>
    <p>不行做不到</p>
    
    <h1>@click匿名函数</h1>
    <el-button @click="a+=1;c+=1;op2(a,c)">修改</el-button>
    <p>@click中匿名函数只能是this内定义的，不能使用全局变量</p>

    <h1>模板使用测试</h1>
    <p>模板+三元表达式 {{d+(e>0?e:0)}}</p>
    
    <h1>data里面使用方法赋值，方法里面也引用了data参数会如何？会报错</h1>

    <h1>watch测试</h1>
    <el-button @click="op4">op4</el-button>
    <p>f2 {{f2}}</p>

    <h1>watch store测试:数组</h1>
    <p>f3 {{f3}} f4 {{f4}}</p>
    <el-button @click="op5">op5</el-button>
    <p>watch store中的数组可以直接watch，不需要像map那样深度监控</p>

</template>

<script>
import bag from '@/net/bag.js'
import modeClass from '@/net/mode_class.js'
export default {
    created(){
        console.log(bag)//在route_test中赋值的bag在这里是空的，说明js的模块不能持有变量
        console.log('globalproperties:',this.bag)//怪事，即便是全局变量，不同路由链的赋值仍然无效
        console.log('created: ',this.a,this.d)
    },
    mounted(){
        console.log('mounted: ',this.a,this.d)
        modeClass.op2()
    },
    data:()=>({
        a:1,
        c:'',
        d:'20',
        e:11,
        f:{x:1},
        f1:{x:2},

    }),
    computed:{
        b(){
            return this.a+1
        },
        b1(){
            return{
                x:1,
                y:'a',
                z:true
            }
        },
        f2(){
            return this.f1
        },
        f3(){
            return this.$store.state.a.get1
        },
        f4(){
            return this.$store.state.a.get2
        },

    },
    watch:{
        f:{
            handler(v){
                console.log('watch f.x ',v.x)
            },
            deep:true
        },
        'f2.x'(v){
            console.log('watch f2.x ',v)
        },

    },
    methods:{
        op1(){
            //computed值可以用this访问
            console.log(this.a,this.b)
        },
        op2(v1,v2,v3){
            console.log(v1,v2,v3)
        },
        op3(){
            this.b1.x+=20
            this.b1.y+='a'
            console.log(this.b1)
        },
        op4(){
            this.f.x+=1
            this.f1.x+=2
            console.log('op4 f.x ',this.f.x)
            console.log('op4 f1.x ',this.f1.x)
        },
        op5(){
            this.$store.commit('a/change10',5)
        },

    }
}
</script>
<style lang="stylus" scoped>
    .t1
        font-size $test2
        span
            color red
            font-size $test1
</style>
