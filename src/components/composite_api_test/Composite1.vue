<template>
    <button>this is composite1</button>
    <p>{{a}} {{b}}</p>
</template>

<script>
export default {
    inject:['a','b']
}
</script>

<style lang="stylus" scoped>

</style>