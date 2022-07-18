<template>
    <ul>
        <li v-for="item in props" v-bind:key="item">
            <slot :item="item"></slot>
        </li>
    </ul>
</template>

<script>
export default {
    props:{
        props:Array
    }
}
</script>

<style lang="stylus" scoped>
.b1
    display: block
    background-color: red
</style>