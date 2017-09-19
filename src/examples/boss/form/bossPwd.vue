<template>
        <div class="register-body">
            <div class="register-title">个人信息修改</div>
            <div class="register-main">
                <div class="register-form">
                    <div class="register-item">
                        <span class="register-label">设 置 密 码</span>
                        <input class="register-input" v-model="password" ref="input-password" type="password" placeholder="建议至少只用两种字符组合" />
                    </div>
                    <div class="register-item">
                        <span class="register-label">确 认 密 码</span>
                        <input class="register-input" v-model="checkpwd" ref="input-checkpwd" type="password" placeholder="请再次输入密码" />
                    </div>
                    <div class="register-item">
                        <jx-button @click="handleSubmit">提交修改</jx-button>
                    </div>
                </div>
                <div class="register-word">
                    头像太丑了？<router-link to="/boss/form">修改头像</router-link>
                </div>
            </div>
            <jx-tip v-if="tip" @close="tip=false">{{tipWord}}</jx-tip>
        </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import {Button, Footer, Tip, Uploader} from '../../../components';
    import Validate from '../../../utils/validate';
    export default {
        components: {
            jxButton: Button,
            jxFooter: Footer,
            jxTip: Tip,
            jxUploader: Uploader
        },
        data () {
            return {
                password: '',
                checkpwd: '',
                tip: false,
                tipWord: '',
                tipType: 'error',
            };
        },
        computed: {
            ...mapGetters({
                boss: 'boss/boss'
            })
        },
        methods: {
            ...mapActions({
                update: 'boss/update',
            }),
            upload (avatar) {
                this.avatar = avatar;
            },
            handleSubmit () {
                this.tipType = 'error';
                if (!Validate.isPassword(this.password)) {
                    this.$refs['input-password'].focus();
                    this.tip = true;
                    this.tipWord = '请输入6-16位密码';
                    return false;
                }
                if (this.checkpwd.trim('') !== this.password) {
                    this.$refs['input-checkpwd'].focus();
                    this.tip = true;
                    this.tipWord = '两次输入密码不一致';
                    return false;
                }

                let boss = Object.assign({}, this.boss, {
                    password: this.password,
                });

                this.update(boss).then((response) => {
                    if (response.code) {
                        this.tipWord = response.msg;
                        this.tip = true;
                        return false;
                    }
                    this.tip = true;
                    this.tipWord = '密码修改成功';
                    this.tipType = 'success';
                });
            }
        },
    };
</script>
<style lang="scss" src="./bossForm.scss"></style>
