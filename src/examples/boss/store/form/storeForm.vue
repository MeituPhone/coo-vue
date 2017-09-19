<template>
    <div class="store-form">
        <div class="store-form-line">
            <div class="store-form-label">店铺名称</div>
            <div class="store-form-value">
                <input type="text" v-model="name" class="store-form-input" ref="input-name" />
            </div>
        </div>
        <div class="store-form-line">
            <div class="store-form-label">行业</div>
            <div class="store-form-value">
                <jx-select v-model="profession_id" size="large" @change="handleSelectProfession" placeholder="请选择行业">
                    <jx-option
                            v-for="profession in professions"
                            :key="`${profession.id}`"
                            :label="profession.name"
                            :value="parseInt(profession.id)">
                    </jx-option>
                </jx-select>
            </div>
        </div>
        <div class="store-form-line">
            <div class="store-form-label">营业执照</div>
            <div class="store-form-value">
                <jx-uploader :imagePath="business_license" @upload="upload"></jx-uploader>
            </div>
        </div>
        <div class="store-form-line">
            <div class="store-form-label">详细地址</div>
            <div class="store-form-value">
                <input type="text" v-model="address" class="store-form-input" ref="input-name" />
            </div>
        </div>
        <div class="store-form-line">
            <div class="store-form-label">店长</div>
            <div class="store-form-value">
                <input type="text" v-model="owner" class="store-form-input" ref="input-name" />
            </div>
        </div>
        <div class="store-form-line">
            <div class="store-form-label">手机号码</div>
            <div class="store-form-value">
                <input type="text" v-model="mobile" class="store-form-input" ref="input-name" />
            </div>
        </div>
        <div class="store-form-line">
            <jx-button @click="handleSubmit">提交数据</jx-button>
        </div>
        <div class="store-form-line">
            <a href="javascript:;" class="store-form-delete" @click="handleDelete" v-if="store.id">删除这条数据？</a>
        </div>
        <jx-tip v-if="tip" @close="tip=false">{{tipWord}}</jx-tip>
    </div>
</template>
<script>
    import {Uploader, Button, Select, Option, Tip} from '../../../../components';
    import Validate from '../../../../utils/validate';
    export default {
        props: {
            store: Object,
            professions: Array
        },
        components: {
            jxUploader: Uploader,
            jxButton: Button,
            jxSelect: Select,
            jxOption: Option,
            jxTip: Tip
        },
        data () {
            return {
                name: '',
                business_license: '',
                province: 0,
                city: 0,
                district: 0,
                address: '',
                owner: '',
                mobile: '',
                profession_id: 0,
                tip: false,
                tipWord: '',
                tipType: 'error',
            };
        },
        methods: {
            upload (business_license) {
                this.business_license = business_license;
            },
            handleSelectProfession (value) {
                this.profession_id = value;
            },
            handleSubmit () {
                this.tipType = 'error';
                if (this.name.trim() === '') {
                    this.tip = true;
                    this.tipWord = '请输入店铺名称';
                    return false;
                }
                if (this.business_license.trim() === '') {
                    this.tip = true;
                    this.tipWord = '请上传营业执照';
                    return false;
                }

//                if (this.province === 0) {
//                    this.tip = true;
//                    this.tipWord = '请选择省份地区';
//                    return false;
//                }

                if (this.profession_id === 0) {
                    this.tip = true;
                    this.tipWord = '请选择行业';
                    return false;
                }

                if (this.address.trim() === '') {
                    this.tip = true;
                    this.tipWord = '请填写详细地址';
                    return false;
                }

                if (this.owner.trim() === '') {
                    this.tip = true;
                    this.tipWord = '请填写店主';
                    return false;
                }

                if (!Validate.isMobile(this.mobile)) {
                    this.tip = true;
                    this.tipWord = '请填写正确的手机号码';
                    return false;
                }

                this.$emit('submit', {
                    name: this.name,
                    business_license: this.business_license,
                    province: this.province,
                    city: this.city,
                    district: this.district,
                    address: this.address,
                    owner: this.owner,
                    mobile: this.mobile,
                    profession_id: this.profession_id
                });
            },
            handleDelete () {
                this.$emit('delete');
            }
        },
        created () {
            this.name = this.store.name || '';
            this.business_license = this.store.business_license || '';
            this.province = this.store.province || 0;
            this.city = this.store.city || 0;
            this.district = this.store.district || 0;
            this.address = this.store.address || '';
            this.owner = this.store.owner || '';
            this.mobile = this.store.mobile || '';
            this.profession_id = this.store.profession_id || 0;
        }
    };
</script>
<style lang="scss" src="./storeForm.scss"></style>
