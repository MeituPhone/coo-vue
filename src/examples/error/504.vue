<template>
    <div class="notification">
        <div class="notification-content">
            <div class="notification-icon notification-sorry"></div>
            <a href="/" class="notification-back">返回上一页</a>
        </div>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                msg: '404'
            };
        },
    };
</script>

<style lang="scss" src="./error.scss">
</style>
