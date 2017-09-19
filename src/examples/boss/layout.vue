<template>
    <div class="layout">
        <div class="layout-header">
            <div class="layout-auth">
                <router-link to="/boss/form">
                    <img :src="`${apiDomain}${boss.avatar}`" />
                    <span>{{ boss.name }}</span>
                </router-link>
                <a href="javascript:;" @click="alertVisible=true">退出</a>
            </div>

            <div class="layout-menus clearfix">
                <router-link to="/boss/index">主页</router-link>
                <router-link to="/boss/store">我的店铺</router-link>
                <router-link to="/boss/report">我的报表</router-link>
            </div>
        </div>
        <div class="layout-body">
            <router-view></router-view>
        </div>
        <jx-alert
                title="确认退出账户吗？"
                top="200px"
                :visible.sync="alertVisible"
                okLabel="删除"
                cancelLabel="取消"
                :okCallback="handleLogout">
            你确认要退出当前登录吗？
        </jx-alert>
        <jx-footer></jx-footer>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import authHandler from '../../utils/auth';
    import {API_DOMAIN} from '../../constants/config';
    import {Button, Footer, Alert} from '../../components';
    export default {
        components: {
            jxButton: Button,
            jxFooter: Footer,
            jxAlert: Alert
        },
        data () {
            return {
                apiDomain: API_DOMAIN,
                alertVisible: false
            };
        },
        computed: {
            ...mapGetters({
                boss: 'boss/boss'
            })
        },
        methods: {
            ...mapActions({
                getOneBoss: 'boss/detail',
                logout: 'boss/logout'
            }),
            handleLogout () {
                this.logout().then((response) => {
                    if (response.code) {
                        this.tipWord = response.msg;
                        this.tip = true;
                        return false;
                    }
                    authHandler.clearToken();
                    this.$router.replace('/auth/login');
                });
            },
        },
        created () {
            this.getOneBoss().then((response) => {
                if (response.code) {
                    this.tipWord = response.msg;
                    this.tip = true;
                    return false;
                }
            });
        },
    };
</script>
<style lang="scss" src="./layout.scss"></style>
