import Vue from 'vue';
import VueRouter from 'vue-router';
// 路由
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: ROUTER_MODE,
    routes,
});

export default router;
