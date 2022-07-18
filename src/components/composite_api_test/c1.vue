<template>
    <h1>provide inject测试</h1>
    <composite-1></composite-1>
</template>

<script>
import Composite1 from './Composite1'
export default {
    components:{Composite1},
    provide:{
        a:'this is a',
        b:{
            b1:'this is b1',
            b2:200
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>