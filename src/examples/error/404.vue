<template>
    <div class="notification">
        <div class="notification-content">
            <div class="notification-icon notification-404"></div>
            <a href="/" class="notification-back">返回首页</a>
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
