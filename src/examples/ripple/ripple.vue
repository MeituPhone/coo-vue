<template>
    <div class="component-layout">
        <div class="component-name">
            水波涟漪<br />
        </div>
        <div class="component-description">
            水波涟漪效果...
        </div>
        <div class="demo">
            <div class="demo-title">1、demo演示</div>
            <div class="demo-box-3">
                <coo-ripple>
                    <a href="javasript:;" class="btn-test">模拟水波涟漪效果</a>
                </coo-ripple>
            </div>
            <div class="demo-code">
                <pre>
&lt;coo-ripple&gt;
    &lt;a href="javasript:;"&gt;模拟水波涟漪效果&lt;/a&gt;
&lt;/coo-ripple&gt;</pre>
            </div>
        </div>
        <div class="param">
            <div class="param-title">2、参数说明</div>
            <div class="param-list">

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
    import {Ripple} from '../../components';
    export default {
        components: {
            cooRipple: Ripple
        },
        data () {
            return {
            };
        }
    };
</script>
<style lang="scss" src="./ripple.scss"></style>
