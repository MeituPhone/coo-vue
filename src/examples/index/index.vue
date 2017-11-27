<template>
    <div class="website">
        <div class="website-header">
            <div class="website-name">CooVue</div>
            <p class="website-description">
                我不想重复造轮子，但是这些是我工作中经常用的vue响应式组件<br />
                github 仓库地址：<a href="https://github.com/coocssweb/coo-vue">https://github.com/coocssweb/coo-vue</a>
            </p>
        </div>
        <div class="website-components">
            <ul class="website-components-list clearfix">
                <li class="item">
                    <router-link to="/components/areaselect">
                        <div class="icon">areaSelect</div>
                        <div class="name">地区选择</div>
                    </router-link>
                </li>
                <li class="item">
                    <router-link to="/components/dialog">
                        <div class="icon">Dialog</div>
                        <div class="name">弹出框</div>
                    </router-link>
                </li>
                
                <li class="item">
                    <router-link to="/components/toast">
                        <div class="icon">Toast</div>
                        <div class="name">Toast</div>
                    </router-link>
                </li>
                <li class="item">
                    <router-link to="/components/swiper">
                        <div class="icon">swiper</div>
                        <div class="name">幻灯片</div>
                    </router-link>
                </li>           
                <li class="item">
                    <router-link to="/components/lazyImg">
                        <div class="icon">lazyImg</div>
                        <div class="name">懒加载</div>
                    </router-link>
                </li>
                <li class="item">
                    <router-link to="/components/baidumap">
                        <div class="icon">baiduMap</div>
                        <div class="name">百度地图</div>
                    </router-link>
                </li>
                <li class="item">
                    <router-link to="/components/uploader">
                        <div class="icon">uploader</div>
                        <div class="name">图片上传</div>
                    </router-link>
                </li>
                <li class="item">
                    <a href="">
                        <div class="icon">select</div>
                        <div class="name">下拉选择</div>
                    </a>
                </li>
                <li class="item">
                    <a href="">
                        <div class="icon">countDown</div>
                        <div class="name">倒计时</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {

    };
</script>
<style lang="scss" src="./index.scss"></style>
