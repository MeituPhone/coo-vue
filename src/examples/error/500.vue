<template>
    <div class="notification">
        <div class="notification-content">
            <div class="notification-icon notification-error"></div>
            <a href="/" class="notification-back">系统错误，自动修复中</a>
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
