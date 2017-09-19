<template>
        <div class="register-body">
            <div class="register-title">个人信息修改</div>
            <div class="register-main">
                <div class="register-form">
                    <div class="register-item">
                        <span class="register-label">用 户 名 称</span>
                        <input class="register-input" v-model="name" ref="input-name" type="text" placeholder="您的用户名" />
                    </div>
                    <div class="register-item">
                        <span class="register-label">手 机 号 码</span>
                        <input class="register-input register-input-readonly" v-model="boss.mobile" ref="input-mobile" type="text" readonly  placeholder="建议填写常用手机" />
                    </div>
                    <div class="register-item register-item-relative">
                        <span class="register-label">上 传 头 像</span>
                        <jx-uploader @upload="upload"
                                     :imagePath="avatar"></jx-uploader>
                    </div>
                    <div class="register-item">
                        <jx-button @click="handleSubmit">提交修改</jx-button>
                    </div>
                </div>
                <div class="register-word">
                    担心密码不安全？<router-link to="/boss/pwd">修改密码</router-link>
                </div>
            </div>
            <jx-tip v-if="tip" @close="tip=false">{{tipWord}}</jx-tip>
        </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import {Button, Footer, Tip, Uploader} from '../../../components';
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
                avatar: '',
                tip: false,
                tipWord: '',
                tipType: 'error',
            };
        },
        watch: {
            boss (value) {
                this.name = value.name;
                this.avatar = value.avatar;
            }
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
                if (this.name.trim('') === '') {
                    this.$refs['input-name'].focus();
                    this.tip = true;
                    this.tipWord = '请输入用户名';
                    return false;
                }
                if (this.avatar.trim('') === '') {
                    this.$refs['input-mobile'].focus();
                    this.tip = true;
                    this.tipWord = '请上传头像';
                    return false;
                }

                let boss = Object.assign({}, this.boss, {
                    name: this.name,
                    avatar: this.avatar
                });

                this.update(boss).then((response) => {
                    if (response.code) {
                        this.tipWord = response.msg;
                        this.tip = true;
                        return false;
                    }
                    this.tip = true;
                    this.tipWord = '用户信息修改成功';
                    this.tipType = 'success';
                });
            }
        },
        created () {
            this.name = this.boss.name;
            this.avatar = this.boss.avatar;
        }
    };
</script>
<style lang="scss" src="./bossForm.scss"></style>
