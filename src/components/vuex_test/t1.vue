<template>
    <h1>简单store测试</h1>
    <div>v1Content: {{v1Content}} v2Content: {{v2Content}} v3Content: {{v3Content}}</div>

    <h1>mapState测试</h1>
    <div>v1: {{v1}} v2: {{v2}} v3local:{{v3local}}</div>

    <h1>getter测试</h1>
    <div>get1: {{get1}} get2: {{get2}}</div>
    <p>getter处理的必须是列表/对象这种复合数据，不能是基础数值，不然会无限迭代</p>
    <div>get3: {{get3}}</div>
    <div>get4: {{get4}}</div>
    <div>get1opt2: {{get1opt2}}</div>
    <div>'a/get1opt2' {{this.$store.getters['a/get1opt2']}}</div>

    <h1>mutation测试</h1>
    <el-button @click="this.$store.commit('a/change1')">无参数</el-button>
    <el-button @click="this.$store.commit('a/change2',10)">有参数</el-button>
    <el-button @click="this.$store.commit({type:'a/change4',n:10})">有参数(对象)</el-button>
    <el-button @click="this.$store.commit('a/change7',{a:1,b:'2',c:[1,2,3]})">对象参数</el-button>

    <h1>mapMutation测试</h1>
    <el-button @click="op1">无参数</el-button>
    <el-button @click="op2(10)">有参数</el-button>
    <el-button @click="op3({n1:'1',n2:true,n3:13})">多参数</el-button>
    <p>多参数必须写到一个对象里面，其实只能有一个参数</p>

    <h1>action测试</h1>
    <el-button @click="this.$store.dispatch('a/change1')">change1</el-button>
    <el-button @click="this.$store.dispatch('a/change1async')">异步change1</el-button>
    <el-button @click="this.$store.dispatch('a/change4',{n:20})">change4</el-button>
    <h1>mapActions测试</h1>
    <el-button @click="c2(10)">c2</el-button>
    <el-button @click="c4({n:20})">c4</el-button>
    <h1>action响应</h1>
    <el-button @click="c5(6)">响应{{result}}</el-button>

    <h1>module测试</h1>
    <p>一旦开启了模块就不能有非模块的内容了，开启命名空间也不行</p>

    <h1>复合响应测试</h1>
    <div>get2: {{get2}}</div>
    <div>get3: {{get3}}</div>
    <el-button @click="this.$store.commit('a/change5',5)">修改1</el-button>
    <el-button @click="this.$store.commit('a/change6',10)">修改2</el-button>

    <h1>store中使用elementui的message测试</h1>
    <el-button @click="c6('弹窗消息')">message弹窗</el-button>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data:()=>({
        local:100,
        result:'',
    }),
    computed:{
        v1Content(){
            return this.$store.state.a.v1
            //只能这么写，不能写成this.$store.state['a/v1']
        },
        v2Content(){
            return this.$store.state.a.v2
        },
        v3Content(){
            return this.$store.state.a.v3
        },
        ...mapState({
            v1:state=>state.a.v1,
            v3local(state){
                return state.a.v3+this.local
            }
        }),
        //上面的简写
        ...mapState('a',{
            v2:state=>state.v2
        }),
        //alias只能这么单独写，模块下不可用
        // ...mapState([
        //     'a/v2'
        // ]),
        get1(){
            return this.$store.getters['a/get1opt1']
            // return this.$store.getters.a.get1op1//不能这么写
        },
        get2(){
            return this.$store.getters['a/get1opt2']
        },
        //getter带参数
        get3(){
            return this.$store.getters['a/get1opt3'](2)
        },
        //名字不同用法
        ...mapGetters({
            get4:'a/get1opt1'
        }),
        //上面的简写
        ...mapGetters('a',{
            get1opt2:'get1opt2'
        }),
        //名字相同用法
        // ...mapGetters([
        //     'a/get1opt2'
        // ]),
        //上面的简写
        ...mapGetters('a',[
            'get1opt2'
        ])
    },
    methods:{
        ...mapMutations({op1:'a/change1',op2:'a/change2'}),
        ...mapMutations('a',{op3:'change3'}),
        //这种同名简写，带的参数只能是基础值不能是对象，子模块里不能用
        // ...mapMutations([
        //     'a/change2'
        // ]),
        //带的参数可以是基本类型
        ...mapActions({
            c2:'a/change2'
        }),
        //带的参数可以是对象，上面的简写
        ...mapActions('a',{
            c4:'change4'
        }),
        c5(n){
            this.$store.dispatch('a/change1promise',n).then((res)=>this.result=res).catch((err)=>this.result=err)
        },
        c6(msg){
            this.$store.commit('a/change11',msg)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>