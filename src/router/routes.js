import Index from '../examples/index/index.vue';
import Layout from '../examples/layout/layout.vue';
import Uploader from '../examples/uploader/uploader.vue';
import Dialog from '../examples/dialog/dialog.vue';
import BaiduMap from '../examples/baiduMap/baiduMap.vue';
import Swiper from '../examples/swiper/swiper.vue';
import AreaSelect from '../examples/areaSelect/areaSelect.vue';
import LazyImg from '../examples/lazyImg/lazyImg.vue';
import Toast from '../examples/toast/toast.vue';
import Ripple from '../examples/ripple/ripple.vue';

// 设置页面元素
const _setElement = (title, next) => {
    document.title = title;
    if (typeof next === 'function') {
        next();
    }
};

const routes = [
    {
        path: '*',
        component: Index,
        beforeEnter: (to, from, next) => {
            _setElement('首页 - Coo Vue 组件', next);
        }
    },
    {
        path: '/components',
        component: Layout,
        children: [
            {
                path: 'uploader',
                component: Uploader,
                beforeEnter: (to, from, next) => {
                    _setElement('uploader vue上传组件 - CooVue', next);
                }
            },
            {
                path: 'toast',
                component: Toast,
                beforeEnter: (to, from, next) => {
                    _setElement('toast vue上传组件 - CooVue', next);
                }
            },
            {
                path: 'dialog',
                component: Dialog,
                beforeEnter: (to, from, next) => {
                    _setElement('Dialog 弹窗组件 - CooVue', next);
                }
            },
            {
                path: 'baidumap',
                component: BaiduMap,
                beforeEnter: (to, from, next) => {
                    _setElement('Baidu地图组件 - CooVue', next);
                }
            },
            {
                path: 'swiper',
                component: Swiper,
                beforeEnter: (to, from, next) => {
                    _setElement('幻灯片组件 - CooVue', next);
                }
            },
            {
                path: 'areaSelect',
                component: AreaSelect,
                beforeEnter: (to, from, next) => {
                    _setElement('地区选择组件 - CooVue', next);
                }
            },
            {
                path: 'lazyImg',
                component: LazyImg,
                beforeEnter: (to, from, next) => {
                    _setElement('图片懒加载左键 - CooVue', next);
                }
            },
            {
                path: 'ripple',
                component: Ripple,
                beforeEnter: (to, from, next) => {
                    _setElement('水波涟漪特效 - CooVue', next);
                }
            }
        ]
    }
];

export default routes;
