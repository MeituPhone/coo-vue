<template>
    <div class="register">
        <div class="register-header"></div>
        <div class="register-body">
            <div class="register-title">欢迎注册，请填写基本信息</div>
            <div class="register-main">
                <div class="register-form">
                    <div class="register-item">
                        <span class="register-label">用 户 名 称</span>
                        <input class="register-input" v-model="name" ref="input-name" type="text" placeholder="您的用户名" />
                    </div>
                    <div class="register-item">
                        <span class="register-label">手 机 号 码</span>
                        <input class="register-input" v-model="mobile" ref="input-mobile" type="text"  placeholder="建议填写常用手机" />
                    </div>
                    <div class="register-item">
                        <span class="register-label">设 置 密 码</span>
                        <input class="register-input" v-model="password" ref="input-password" type="password" placeholder="建议至少只用两种字符组合" />
                    </div>
                    <div class="register-item">
                        <span class="register-label">确 认 密 码</span>
                        <input class="register-input" v-model="checkpwd" ref="input-checkpwd" type="password" placeholder="请再次输入密码" />
                    </div>
                    <div class="register-item register-item-relative">
                        <span class="register-label">上 传 头 像</span>
                        <jx-uploader @upload="upload"
                                     :imagePath="avatar"></jx-uploader>
                    </div>
                    <div class="register-item">
                        <jx-button @click="handleSubmit">提交注册</jx-button>
                    </div>
                </div>
                <div class="register-word">
                    <router-link to="/auth/login">有账户，马上去登录！</router-link>
                </div>
            </div>
        </div>
        <jx-tip v-if="tip" @close="tip=false">{{tipWord}}</jx-tip>
        <jx-footer></jx-footer>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {Button, Footer, Tip, Uploader} from '../../components';
    import Validate from '../../utils/validate';
    export default {
        components: {
            jxButton: Button,
            jxFooter: Footer,
            jxTip: Tip,
            jxUploader: Uploader
        },
        data () {
            return {
                name: '',
                mobile: '',
                password: '',
                checkpwd: '',
                avatar: '',
                tip: false,
                tipWord: '',
                tipType: 'error',
            };
        },
        methods: {
            ...mapActions({
                create: 'boss/create',
            }),
            upload (avatar) {
                this.avatar = avatar;
            },
            handleSubmit () {
                this.tipType = 'error';
                if (this.name.trim('') === '') {
                    this.$refs['input-name'].focus();
                    this.tip = true;
                    this.tipWord = '请输入用户名';
                    return false;
                }
                if (!Validate.isPassword(this.mobile)) {
                    this.$refs['input-mobile'].focus();
                    this.tip = true;
                    this.tipWord = '请输入您的常用手机';
                    return false;
                }
                if (!Validate.isPassword(this.password)) {
                    this.$refs['input-mobile'].focus();
                    this.tip = true;
                    this.tipWord = '请输入6-16位密码';
                    return false;
                }
                if (this.checkpwd.trim('') !== this.password) {
                    this.$refs['input-mobile'].focus();
                    this.tip = true;
                    this.tipWord = '两次输入密码不一致';
                    return false;
                }
                if (this.avatar.trim('') === '') {
                    this.$refs['input-mobile'].focus();
                    this.tip = true;
                    this.tipWord = '请上传头像';
                    return false;
                }
                this.create({user_name: '', name: this.name, mobile: this.mobile, password: this.password, avatar: this.avatar}).then((response) => {
                    if (response.code) {
                        this.tipWord = response.msg;
                        this.tip = true;
                        return false;
                    }
                    this.tip = true;
                    this.tipWord = '恭喜您，注册成功';
                    this.tipType = 'success';
                    setTimeout(() => {
                        this.$router.replace('/auth/login');
                    }, 2000);
                });
            }
        }
    };
</script>
<style lang="scss" src="./regist.scss"></style>
