<template>
    <button class="jx-uploader" @click="handleClick">
        <span v-if="!imagePath && !uploading" class="jx-icon-add"></span>
        <img v-if="imagePath" :src="`${apiDomain}${imagePath.replace('.jpg', '_200@200.jpg')}`" />
        <span v-if="uploading" class="jx-uploader-loading"></span>
        <input  type="file" class="jx-uploader-file" ref="uploader-file" @change="handleChange" />
    </button>
</template>
<script>
    import {API_DOMAIN} from '../../constants/config';
    import {mapActions} from 'vuex';
    export default {
        props: {
            imagePath: String
        },
        data () {
            return {
                apiDomain: API_DOMAIN,
                uploading: false,
            };
        },
        methods: {
            ...mapActions({
                uploadFile: 'boss/uploadFile'
            }),
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
                this.uploadFile(formData).then((response) => {
                    this.$emit('upload', response.data);
                    this.uploading = false;
                });
            }
        }
    };
</script>
<style lang="scss" src="./uploader.scss">
</style>
