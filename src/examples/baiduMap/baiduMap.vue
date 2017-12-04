<template>
    <div class="component-layout">
        <div class="component-name">
            百度地图组件<br />
        </div>
        <div class="component-description">
            这是一个百度地图组件，允许自定义标注标题、地址等信息...
        </div>
        <div class="demo">
            <div class="demo-title">1、demo演示</div>
            <div class="demo-box">
                <coo-map :latitude="24.506045"
                         :longitude="118.131161"
                         :showLay="true"
                         title="测试标题"
                         address="测试地址详细"
                         appkey="6d5e1930c887a194bb71db14cf6a68e7"
                         :height="300"
                ></coo-map>
            </div>
            <div class="demo-code">
                <pre>&lt;coo-map :latitude="24.506045"
    :longitude="118.131161"
    :showLay="true"
    title="测试标题"
    address="测试地址详细"
    appkey="6d5e1930c887a194bb71db14cf6a68e7"
    :height="300"
&gt;&lt;/coo-map&gt;</pre>
            </div>
        </div>
        <div class="param">
            <div class="param-title">2、参数说明</div>
            <div class="param-list">
                <div class="param-item">1：latitude：纬度 , 类型：Number</div>
                <div class="param-item">2：longitude：经度，类型：Number</div>
                <div class="param-item">3：showLay：是否显示标注，类型：Boolean，默认：false</div>
                <div class="param-item">4：title：标注标题，类型：String，默认：</div>
                <div class="param-item">5：address：标注地址，类型：String，默认：</div>
                <div class="param-item">6：appkey：百度地图appkey，类型：String，默认值：</div>
                <div class="param-item">7：height：高度，类型：Number，默认：</div>
            </div>
        </div>

        <div class="param">
            <div class="param-title">3、事件</div>
        </div>

    </div>
</template>
<script>
    import {BaiduMap} from '../../components';
    export default {
        components: {
            cooMap: BaiduMap
        }
    };
</script>
