import Page404 from '../views/error/404.vue';
import Page204 from '../views/error/204.vue';
import Page504 from '../views/error/504.vue';
import Page500 from '../views/error/500.vue';
import Login from '../views/auth/login.vue';
import Regist from '../views/auth/regist.vue';
import BossLayout from '../views/boss/layout.vue';
import BossIndex from '../views/boss/index/index.vue';
import BossStore from '../views/boss/store/store.vue';
import BossReport from '../views/boss/report/report.vue';
import BossForm from '../views/boss/form/bossForm.vue';
import BossPwd from '../views/boss/form/bossPwd.vue';
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
        component: Page404,
        beforeEnter: (to, from, next) => {
            _setElement('页面未找到 - 打赏', next);
        }
    },
    {
        path: '/404',
        component: Page404,
        beforeEnter: (to, from, next) => {
            _setElement('页面未找到 - 打赏', next);
        }
    },
    {
        path: '/504',
        component: Page504,
        beforeEnter: (to, from, next) => {
            _setElement('错误信息 - 打赏', next);
        }
    },
    {
        path: '/500',
        component: Page500,
        beforeEnter: (to, from, next) => {
            _setElement('系统错误 - 打赏', next);
        }
    },
    {
        path: '/204',
        component: Page204,
        beforeEnter: (to, from, next) => {
            _setElement('请求超时 - 打赏', next);
        }
    },
    {
        path: '/auth/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            _setElement('欢迎登录 - 打赏', next);
        }
    },
    {
        path: '/auth/regist',
        component: Regist,
        beforeEnter: (to, from, next) => {
            _setElement('用户注册 - 打赏', next);
        }
    },
    {
        path: '/boss',
        component: BossLayout,
        beforeEnter: (to, from, next) => {
            _setElement('打赏', next);
        },
        children: [
            {
                path: 'form',
                component: BossForm,
                linkActiveClass: 'active',
                beforeEnter: (to, from, next) => {
                    _setElement('用户信息修改 - 打赏', next);
                }
            },
            {
                path: 'pwd',
                component: BossPwd,
                linkActiveClass: 'active',
                beforeEnter: (to, from, next) => {
                    _setElement('用户密码修改 - 打赏', next);
                }
            },
            {
                path: 'index',
                component: BossIndex,
                linkActiveClass: 'active',
                beforeEnter: (to, from, next) => {
                    _setElement('个人主页 - 打赏', next);
                }
            },
            {
                path: 'store',
                component: BossStore,
                linkActiveClass: 'active',
                beforeEnter: (to, from, next) => {
                    _setElement('我的店铺 - 打赏', next);
                }
            },
            {
                path: 'report',
                component: BossReport,
                linkActiveClass: 'active',
                beforeEnter: (to, from, next) => {
                    _setElement('我的报表 - 打赏', next);
                }
            }
        ]
    }
];

export default routes;
