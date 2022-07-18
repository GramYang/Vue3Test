<template>
    <h1>插槽简单使用</h1>
    <Slot1>
        里面可以插任何内容，包括tag和组件
    </Slot1>
    <Slot1></Slot1>
    <h1>slot渲染作用域</h1>
    <p>比如你给Slot1设置class无效，要设置class只能写到Slot1的模板里面去</p>
    <h1>具名插槽</h1>
    <Slot2>
        <template #header>我来组成头部</template>
        <template #footer>我来组成脚部</template>
    </Slot2>
    <h1>作用域插槽</h1>
    <p>作用域插槽和上面不同，作用域插槽不传递数据只指示插槽显示的数据</p>
    <Slot3 :props="items">
        <template #default="props">
            {{props.item}}
        </template>
    </Slot3>
    <h2>作用域插槽——解构</h2>
    <Slot3 :props="items">
        <template #default="{item,index='undefined'}">
            {{item}} {{index}}
        </template>
    </Slot3>
</template>

<script>
import Slot1 from './Slot1'
import Slot2 from './Slot2'
import Slot3 from './Slot3'
export default {
    components:{Slot1,Slot2,Slot3},
    data(){
        return{
            items:['a','b','c']
        }
    }
}
</script>

<style lang="stylus" scoped>
Slot1
    display: block
    background-color: red
</style>