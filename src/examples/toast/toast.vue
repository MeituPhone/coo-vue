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
                <a href="javascript:;" @click="handleHorizontalToast">打开一个水平方向的 Toast</a>
            </div>
            <div class="demo-code">
                <pre>
this.$toast({
        type: 'success',
        message: '提示信息',
        timeout: 5000
    });</pre>
            </div>
        </div>
        <div class="param">
            <div class="param-title">2、参数说明</div>
            <div class="param-list">
                <div class="param-item">1：type：Toast类型 , 类型：String，默认：</div>
                <div class="param-item">2：message：提示信息，类型：String</div>
                <div class="param-item">3：timeout：自动关闭的时间，类型：Number,默认： 3000</div>
                <div class="param-item">4：direction：布局方向，类型：String ['vertical', ' horizontal'],默认： 'vertical'</div>
                <div class="param-item">4：theme：主题，类型：String ['red', 'default', 'blue', 'orange'],默认： 'default'</div>
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
                let myToast = this.$toast({
                    type: 'success',
                    message: '提示信息'
                });
                // 主动关闭
                // setTimeout(() => {
                //     myToast.close();
                // }, 3000);
            },
            handleHorizontalToast () {
                let myToast = this.$toast({
                    type: 'warn',
                    message: '提示信息',
                    direction: 'horizontal',
                    theme: 'red',
                });
            },
        },
    };
</script>
<style lang="scss" src="./toast.scss"></style>
