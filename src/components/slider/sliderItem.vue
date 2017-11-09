<template>
    <div class="coo-slider-item" :style="{width: `${width}px`}">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            image: String,
            width: Number
        },
    };
</script>
<style lang="scss" rel="stylesheet/scss" src="./slider.scss">
</style>
