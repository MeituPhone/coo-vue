<template>
    <div ref='coo-swiper-item' class="coo-swiper-item" :style="{width: `${$parent.width}px`}">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
        },
        mounted () {
        },
    };
</script>
<style lang="scss" rel="stylesheet/scss" src="./swiper.scss">
</style>
