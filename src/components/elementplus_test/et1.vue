<template>
    <h1>select测试</h1>
    <el-select v-model="selectValue1" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
    <el-select v-model="selectValue2.a" placeholder="Select" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
    </el-select>
    <el-select v-model="selectValue3().a" placeholder="Select" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
    </el-select>
    <el-select v-model="selectValue4.a" placeholder="Select" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
    </el-select>
    <p>select的v-model可以绑定data、method、computed，但是要保持响应式根本上还是得绑定data，然后method和compted只是操纵data</p>
    <h1>数字输入框测试</h1>
    <el-input-number v-model="numValue1" :min="1" :max="10"/>
    <el-input-number v-model="numValue2.a" :min="1" :max="10"/>
    <el-input-number v-model="numValue3().a" :min="1" :max="10"/>
    <el-input-number v-model="numValue4.a" :min="1" :max="10"/>
    <p>同上</p>
    <el-input-number v-model="numValue5.a" :min="1" :max="10"/>
    <el-button @click="debug1()">debug1</el-button>
    <p>这种写法用method赋值data，可以，是响应式的</p>
    <el-input-number v-model="numValue6.a" :min="1" :max="10"/>
    <el-button @click="debug2()">debug2</el-button>
    <p>这种写法用method取store赋值data（其实和上面一样），也可以，也是响应式的，本地响应式修改不会修改store的值</p>
    <el-input-number v-model="numValue7.a" :min="1" :max="10"/>
    <el-button @click="debug3()">debug3</el-button>
    <p>这种写法直接v-model绑定了computed，不行，不是响应式的，但是computed的值修改有效</p>
    <el-input-number v-model="numValue8.x.y" :min="1" :max="2000"/>
    <el-input-number v-model="numValue9" :min="1" :max="2000"/>
    <p>numValue8.x.y {{ numValue8.x.y }} numValue9 {{numValue9}}</p>
    <el-button @click="debug4()">debug4</el-button>
    <p>上面的测试说明：store中的值修改是不能通过method映射到data里面的，当然你直接把method写到template里面去可以，但是这种使用场景非常窄，碰到复杂的数据结构你就歇菜了，并且也不适用于v-model</p>
    <p>用computed取store可以，但是computed也不适用</p>
    <el-input-number v-model="numValue10" :min="1" :max="2000"/>
    <p>使用watch实现同步store的修改到data中，这是基础类型，可行</p>
    <el-input-number v-model="numValue11" :min="1" :max="2000"/>
    <el-input-number v-model="numValue12" :min="1" :max="2000"/>
    <el-button @click="debug5">debug5</el-button>
    <p>复杂对象域，可行</p>
    <p>map，可行，但是需要你把store的map的值导入一个computed里面去，然后再监听这个computed，不能直接监听map</p>

</template>

<script>
export default {
    data(){
        return{
            options:[
                {value:1,label:'a'},{value:2,label:'b'}
            ],
            selectValue1:1,
            selectValue2:{a:1},
            numValue1:1,
            numValue2:{a:1},
            numValue5:this.op1(),
            numValue6:this.op2(),
            numValue8:{x:{y:this.op3()}},
            numValue9:this.op3(),
            numValue10:0,
            numValue11:0,
            numValue12:0,
        }
    },
    methods:{
        selectValue3(){
            return this.selectValue2
        },
        numValue3(){
            return this.numValue2
        },
        debug1(){
            console.log(this.numValue5.a)
        },
        op1(){
            return {a:1}
        },
        op2(){
            if(this.$store.state.a.obj1.a==1){
                return {
                    a:this.$store.state.a.obj1.a
                }
            }else {
                return {a:10}
            }
        },
        debug2(){
            console.log('numValue6 a',this.numValue6.a)//可以修改
            console.log('store obj1 a',this.$store.state.a.obj1.a)//不会修改state中的值
        },
        debug3(){
            console.log('numValue7 a',this.numValue7.a)
        },
        op3(){
            return this.$store.state.a.v3
        },
        debug4(){
            this.$store.commit('a/change2',5)
            console.log('store ',this.$store.state.a.v3)
        },
        debug5(){
            this.$store.commit('a/change5',5)
            console.log('a.obj1.d.x ',this.$store.state.a.obj1.d.x)
            this.$store.commit('a/change9',{key:'a',value:5})
            console.log('a.map1 a ',this.$store.state.a.map1.get('a'))
        }
    },
    computed:{
        selectValue4(){
            return this.selectValue2
        },
        numValue4(){
            return this.numValue2
        },
        numValue7(){
            return {a:1}
        },
        temp1(){
            return this.$store.state.a.map1.get('a')
        },
    },
    watch:{
        //基本类型监控
        '$store.state.a.v3':function(v){
            this.numValue10=v
        },
        //复杂对象域监控
        '$store.state.a.obj1.d.x':function(v){
            this.numValue11=v
        },
        //map监控
        'temp1.x'(v){
            this.numValue12=v
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>