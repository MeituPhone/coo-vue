<template>
    <div class="ripple-box">
        <slot></slot>
        <span class="ripple-cover"></span>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                animate: false,
            };
        },
        
    };
</script>
<style lang="scss" src="./ripple.scss"></style>
