<template>
    <div class="component-layout">
        <div class="component-name">
            Toast 图片懒加载组件<br />
        </div>
        <div class="component-description">
            Toast 注册到全局，因此可以用js的形式调取...
        </div>
        <div class="demo">
            <div class="demo-title">1、demo演示</div>
        
            <div class="demo-box">
                <a href="javascript:;" @click="handleToast">打开一个Toast</a>
            </div>
            <div class="demo-code">
                <pre>
this.$toast({
        type: 'success',
        message: '提示信息'
    });</pre>
            </div>
        </div>
        <div class="param">
            <div class="param-title">2、参数说明</div>
            <div class="param-list">
                <div class="param-item">1：type：Toast类型 , 类型：String，默认：success(可为空)</div>
                <div class="param-item">2：message：提示信息，类型：String</div>
                <div class="param-item">3：timeout：自动关闭的时间，类型：Number,默认： 3000</div>
            </div>
        </div>

        <div class="param">
            <div class="param-title">3、事件</div>
            <div class="param-list">

            </div>
        </div>

    </div>
</template>
<script>
    export default {
        components: {
        },
        data () {
            return {
            };
        },
        methods: {
            handleToast () {
                this.$toast({
                    type: 'success',
                    message: '提示信息'
                });
            },
        },
    };
</script>
<style lang="scss" src="./toast.scss"></style>
