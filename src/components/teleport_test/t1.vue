<template>
    <h1>teleport测试</h1>
    <div style="position:relative;">
        <h3>tooltips with vue 3 teleport</h3>
        <div><Teleport1></Teleport1></div>
        <div><Teleport2></Teleport2></div>
    </div>
</template>

<script>
import Teleport1 from './Teleport1'
import Teleport2 from './Teleport2'
export default {
    components:{Teleport1,Teleport2}
}
</script>

<style lang="stylus" scoped>
</style>