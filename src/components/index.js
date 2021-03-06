/**
 * 通用组件库
 * Created by 王佳欣 on 2017/5/17.
 */
import Vue from 'vue';

import './scss/index.scss';
import uploader from './uploader/uploader.vue';
import dialog from './dialog/dialog.vue';
import baiduMap from './baiduMap/baiduMap.vue';
import swiper from './swiper/swiper.vue';
import swiperItem from './swiper/swiperItem.vue';
import areaSelect from './areaSelect/areaSelect.vue';
import lazyImg from './lazyImg/lazyImg.vue';
import toast from './toast/toast.js';
import ripple from './ripple/ripple.vue';

export const Uploader = uploader;
export const Dialog = dialog;
export const BaiduMap = baiduMap;
export const Swiper = swiper;
export const SwiperItem = swiperItem;
export const AreaSelect = areaSelect;
export const LazyImg = lazyImg;
export const Ripple = ripple;

if (!window.install) {
    Vue.prototype.$toast = toast;
}
