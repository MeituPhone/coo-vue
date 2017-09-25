<template>
    <div class="component-layout">
        <div class="component-name">
            Slider 幻灯片<br />
        </div>
        <div class="component-description">
            这是一个允许响应式的幻灯片组件 ...
        </div>
        <div class="demo">
            <div class="demo-title">1、demo演示</div>
            <div class="demo-box">
                <div class="demo-slider">
                    <coo-slider :images="['http://img.hb.aicdn.com/f94d1b49c043738c9bf8bb769d766296d411b94219726-Tc7VIL_fw658', 'http://img.hb.aicdn.com/2311bd847f19d748484994711fc42046f6892b4d17abc-BmajhA_fw658']"
                                :loop="true"
                    ></coo-slider>
                </div>
            </div>
            <div class="demo-code">
                <pre>&lt;coo-slider :images="['http://img.hb.aicdn.com/f94d1b49c043738c9bf8bb769d766296d411b94219726-Tc7VIL_fw658', 'http://img.hb.aicdn.com/2311bd847f19d748484994711fc42046f6892b4d17abc-BmajhA_fw658']"
    :loop="true"
 &gt;&lt;/coo-slider&gt;</pre>
            </div>
        </div>
        <div class="param">
            <div class="param-title">2、参数说明</div>
            <div class="param-list">
                <div class="param-item">1: images：幻灯片图片，类型：Array，默认值：[]
                </div>
                <div class="param-item">2: loop：是否可循，类型：Boolean，默认值：true
                </div>
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
    import {Slider} from '../../components';
    export default {
        components: {
            cooSlider: Slider
        }
    };
</script>
<style lang="scss" src="./slider.scss"></style>
