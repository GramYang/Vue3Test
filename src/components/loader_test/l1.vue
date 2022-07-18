<template>
    <h1>scoped测试</h1>
    <p>>>>其实就是在父组件中指定设置子组件的css</p>
    <div class="a">
        <loader-1></loader-1>
    </div>
    
</template>

<script>
import Loader1 from './Loader1'
export default {
    components:{Loader1}
}
</script>

<style lang="stylus" scoped>
.a:deep(.b)
    background: red
</style>