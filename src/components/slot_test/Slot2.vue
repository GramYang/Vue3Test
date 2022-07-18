<template>
    <button class="b1">
        <slot name="header">this is header</slot>
    </button>
    <button class="b1">
        <slot name="main">this is main</slot>
    </button>
    <button class="b1">
        <slot name="footer">this is footer</slot>
    </button>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
.b1
    display: block
</style>