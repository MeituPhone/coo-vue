<template>
    <div class="coo-uploader clearfix">
        <div class="coo-uploader-image" v-for="(image, index) in images">
            <coo-lazy-img 
                    :src="image"
                    :autoLoad="true"
                    :mum="mum"
                    @click="handlePreview"
                    :key="index"
                    ></coo-lazy-img>
            <coo-lazy
            <div class="coo-uploader-bar" v-if="!readonly">
                <a href="javascript:;" @click="handleRemove(index)">删除</a>
            </div>
        </div>
        <button v-if="images.length < length && !readonly" class="coo-uploader-btn" @click="handleClick">
            <span v-show="!uploading" class="jx-icon-add"></span>
            <span v-show="uploading" class="coo-loading"></span>
            <input  type="file" class="coo-uploader-file" ref="uploader-file" @change="handleChange" />
        </button>
        <coo-dialog
            v-if="needConfirm"        
            :visible.sync="visibleDialog"
            type="delete"
            title="确认删除？"
            :width="400"
            :lock="true"
            :beforeOk="handleConfirmRemove"
                >
            <div class="">
                你确认要删除上传的图片吗？
            </div>
        </coo-dialog>
    </div>

</template>
<script>
    import axios from 'axios';
    import Dialog from '../dialog/dialog.vue';
    import Icon from '../icon/icon.vue';
    import LazyImg from '../lazyImg/lazyImg.vue';
    export default {
        props: {
            actionPath: {                   //  上传图片API
                type: String,
                default: ''
            },
            files: {                        // 初始图片
                type: Array,
                default: []
            },
            readonly: {                     // 只读
                type: Boolean,
                default: false
            },
            mum: {                          // 初始化图片加载中菊花
                type: Boolean,
                default: true
            },
            length: {                       // 最多可上传
                type: Number,
                default: 1
            },
            needConfirm: {                  // 显示确认删除框
                type: Boolean,
                default: true
            }
        },
        components: {
            cooDialog: Dialog,
            cooIcon: Icon,
            cooLazyImg: LazyImg
        },
        data () {
            return {
                uploading: false,
                images: [],
                visibleDialog: false,
                removeIndex: 0
            };
        },
        methods: {
            // 上传图片
            onUploadFile (data) {
                return axios({
                    url: this.actionPath,
                    method: 'post',
                    data,
                    responseType: 'json',
                    headers: {'Content-Type': 'multipart/form-data'},
                    withCredentials: false,
                }).then(response => {
                    if (response.status === 200) {
                        return Promise.resolve(response.data);
                    }
                    return Promise.reject(response.data);
                }).catch(error => {
                    return Promise.reject(error);
                });
            },
            // 点击添加图片框
            handleClick () {
                this.$refs['uploader-file'].click();
            },
            // input框变化触发
            handleChange (e) {
                if (this.uploading) {
                    return false;
                }
                // 判断是否选择图片
                if (this.$refs['uploader-file'].files.length === 0) {
                    return false;
                }
                let formData = new FormData();
                formData.append('file', this.$refs['uploader-file'].files[0]);
                this.uploading = true;

                //  todo: 演示代码不提供上传接口，传入上传接口删除下面if 内代码
                if (!this.actionPath) {
                    setTimeout(() => {
                        this.images.push('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3083562217,267500300&fm=27&gp=0.jpg');
                        this.uploading = false;
                    }, 300);
                    return false;
                }

                this.onUploadFile(formData).then((response) => {
                    this.images.push(response.data);
                    this.$emit('upload', this.images);
                    this.uploading = false;
                });
            },
            // 删除按钮事件
            handleRemove (index) {
                this.removeIndex = index;
                if (this.needConfirm) {
                    this.visibleDialog = true;
                } else {
                    this.handleConfirmRemove();
                }
            },
            // 确认删除
            handleConfirmRemove (hide) {
                this.images.splice(this.removeIndex, 1);
                this.$emit('remove', this.images);
                // 确认框回调
                if (typeof hide === 'function') {
                    hide();
                }
            },
            // 预览事件
            handlePreview (filePath) {
            }
        },
        created () {
            this.images = [].concat(this.files);
        }
    };
</script>
<style lang="scss" src="./uploader.scss">
</style>
