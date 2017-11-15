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
                    <coo-swiper :loop="true" :pagenation="false">
                        <coo-swiper-item>
                            <div class="swiper-01"><a href='javascript:;' @click="handleTestClick">第一屏</a></div>
                        </coo-swiper-item>
                        <coo-swiper-item>
                            <div class="swiper-02">第二屏</div>
                        </coo-swiper-item>
                        <coo-swiper-item>
                            <div class="swiper-03"> 第三屏</div>
                        </coo-swiper-item>
                    </coo-swiper>
                </div>
            </div>
            <div class="demo-code">
                <pre>&lt;oo-swiper :loop="true"&gt;
                &lt;coo-swiper-item&gt;
                &lt;div class="swiper-01"&gt;&lt;a href='javascript:;' @click="handleTestClick">第一屏&lt;/a&gt;&lt;/div&gt;
                &lt;/coo-swiper-item&gt;
                &lt;/coo-swiper&gt;</pre>
            </div>
        </div>
        <div class="param">
            <div class="param-title">2、参数说明</div>
            <div class="param-list">
                <div class="param-item">1: loop：是否循环，类型：Boolean，默认值：true
                </div>
                <div class="param-item">1: pagination：是否显示分页，类型：Boolean，默认值：true
                </div>
            </div>
        </div>

        <div class="param">
            <div class="param-title">3、事件</div>
            <div class="param-list">
                <div class="param-item">1: prev 上一屏回调
                </div>
                <div class="param-item">1: next 下一瓶回调
                </div>

                <div class="param-item">1: success(index)成功
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {Swiper, SwiperItem} from '../../components';
    export default {
        components: {
            cooSwiper: Swiper,
            cooSwiperItem: SwiperItem
        },
        methods: {
            handleTestClick () {
                console.log('test click ');
            }
        }
    };
</script>
<style lang="scss" src="./swiper.scss"></style>
