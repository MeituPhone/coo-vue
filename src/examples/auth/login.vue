<template>
    <div class="login">
        <div class="login-header"></div>
        <div class="login-body">
            <div class="login-main">
                <div class="login-content">
                    <p><span class="left-quote"></span><span>打赏激励</span></p>
                    <p><span>服务客服至上</span><span class="right-quote"></span></p>
                </div>
                <div class="login-box">
                    <div class="login-title">账户密码登录</div>
                    <div class="login-item">
                        <span class="login-icon login-icon-user"></span>
                        <input type="text" v-model="mobile" class="login-input" placeholder="输入手机号码" />
                    </div>
                    <div class="login-item">
                        <span class="login-icon login-icon-pwd"></span>
                        <input type="password" v-model="password" class="login-input" placeholder="输入登录密码"/>
                    </div>
                    <div class="login-item">
                        <jx-button @click="handleLogin">登录</jx-button>
                    </div>
                    <div class="login-item clearfix">
                        <router-link to="/auth/regist" class="login-to-reg">立即注册</router-link>
                        <a href="javascript:;" class="login-to-problem">登录遇到问题</a>
                    </div>
                </div>
            </div>
        </div>
        <jx-tip v-if="tip" @close="tip=false">{{tipWord}}</jx-tip>
        <jx-footer></jx-footer>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {Button, Footer, Tip} from '../../components';
    import authHandler from '../../utils/auth';
    export default {
        components: {
            jxButton: Button,
            jxFooter: Footer,
            jxTip: Tip
        },
        data () {
            return {
                mobile: '',
                password: '',
                tip: false,
                tipWord: '',
                tipType: 'error'
            };
        },
        methods: {
            ...mapActions({
                login: 'boss/login'
            }),
            handleLogin () {
                this.tipType = 'error';
                if (this.mobile.trim() === '') {
                    this.tipWord = '请输入手机号码';
                    this.tip = true;
                    return false;
                }
                if (this.password.trim() === '') {
                    this.tipWord = '请输入密码';
                    this.tip = true;
                    return false;
                }
                this.login({ mobile: this.mobile, password: this.password }).then((response) => {
                    if (response.code) {
                        this.tipWord = response.msg;
                        this.tip = true;
                        return false;
                    }
                    // 保存token
                    authHandler.saveToken(JSON.stringify(response.data));
                    this.tip = true;
                    this.tipWord = '登录成功';
                    this.tipType = 'success';
                    setTimeout(() => {
                        this.$router.replace('/boss/index');
                    }, 2000);
                });
            }
        }
    };
</script>
<style lang="scss" src="./login.scss"></style>
