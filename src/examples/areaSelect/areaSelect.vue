<template>
    <div class="component-layout">
        <div class="component-name">
            地区选择器<br />
        </div>
        <div class="component-description">
            这是一个响应式的地区选择器组件，参考各购物网站的地区选择器.....
        </div>
        <div class="demo">
            <div class="demo-title">1、demo演示</div>
            <div class="demo-box" style="max-width: 500px;">
                <coo-area-select
                        :province="{}"
                        :city="{}"
                        :country="{}"
                        @select="handleSelectArea"
                ></coo-area-select>
            </div>
            <div class="demo-code">
                <pre>&lt;coo-area-select
        :province="{}"
        :city="{}"
        :country="{}"
        @select="handleSelectArea"
    &gt;&lt;/coo-area-select&gt; </pre>
            </div>
        </div>
        <div class="param">
            <div class="param-title">2、参数说明</div>
            <div class="param-list">
                <div class="param-item">1：province：默认省份 , 类型：{id: 1, name: ''}</div>
                <div class="param-item">2：city：默认城市，类型：{id: 1, name: ''}</div>
                <div class="param-item">3：country：默认地区，类型：{id: 1, name: ''}</div>
                <div class="param-item">4：handleSelectArea：标注标题，类型：Function(object)</div>
            </div>
        </div>

        <div class="param">
            <div class="param-title">3、事件</div>
        </div>

    </div>
</template>
<script>
    import {AreaSelect} from '../../components';
    export default {
        components: {
            cooAreaSelect: AreaSelect
        },
        methods: {
            handleSelectArea (area) {
                console.log(area);
            },
        },
    };
</script>
