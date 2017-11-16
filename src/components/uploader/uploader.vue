<template>
    <div class="coo-uploader clearfix">
        <div class="coo-uploader-image" v-for="(image, index) in images">
            <img :src="image" @click="handlePreview" />
            <div class="coo-uploader-bar" v-if="!readonly">
                <a href="javascript:;" @click="handleRemove(index)">删除</a>
            </div>
        </div>
        <button v-if="images.length < length && !readonly" class="coo-uploader-btn" @click="handleClick">
            <span v-show="!uploading" class="jx-icon-add"></span>
            <span v-show="uploading" class="coo-loading"></span>
            <input  type="file" class="coo-uploader-file" ref="uploader-file" @change="handleChange" />
        </button>
    </div>

</template>
<script>
    import axios from 'axios';
    export default {
        props: {
            actionPath: {
                type: String,
                default: ''
            },
            files: {
                type: Array,
                default: []
            },
            readonly: {
                type: Boolean,
                default: false
            },
            length: {
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                uploading: false,
                images: []
            };
        },
        methods: {
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
            handleClick () {
                this.$refs['uploader-file'].click();
            },
            handleChange (e) {
                if (this.uploading) {
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
            handleRemove (index) {
                this.images.splice(index, 1);
                this.$emit('remove', this.images);
            },
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
