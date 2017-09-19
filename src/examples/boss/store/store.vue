<template>
    <div class="store">
        <div class="store-index">
            <div class="store-body">
                <div class="store-title">我的店铺列表</div>
                <div class="store-list clearfix">
                    <jx-loading v-if="loading"></jx-loading>
                    <div class="store-item-outer" v-for="storeItem in stores">
                        <div class="store-item">
                        <a href="javascript:;" class="store-item-edit" @click="handleOpenDrawer(storeItem)"><span class="jx-icon-edit"></span></a>
                        <div class="store-item-title">{{ storeItem.name }}</div>
                        <div class="store-item-info">
                            <div class="store-item-line clearfix">
                                <span class="store-item-label">详细地址</span>
                                {{ storeItem.address }}
                            </div>
                            <div class="store-item-line clearfix">
                                <span class="store-item-label">店长</span>
                                {{ storeItem.owner }}
                            </div>
                            <div class="store-item-line clearfix">
                                <span class="store-item-label">手机号码</span>
                                {{ storeItem.mobile }}
                            </div>
                        </div>
                        <span class="store-item-code">编码：{{ storeItem.store_code }}</span>
                    </div>
                    </div>
                </div>
                <div class="store-nodata">
                    还没有添加店铺数据，现在<a href="javascript:;" class="store-add-link" @click="handleOpenDrawer({})">添加店铺</a>
                </div>
                <jx-drawer :visible.sync="open" size="500px" type="right">
                    <store-form v-if="open" @delete="showDeleteConfirm" :store="currentStore" :professions="professions" @submit="handleSubmit"></store-form>
                </jx-drawer>

            </div>
        </div>
        <jx-alert
                title="确定删除店铺？"
                top="200px"
                :visible.sync="alertVisible"
                okLabel="删除"
                cancelLabel="取消"
                :okCallback="handleRemove">
            删除店铺后，会删除该店铺相关的数据。请谨慎操作...
        </jx-alert>
        <jx-tip v-if="tip" @close="tip=false">{{tipWord}}</jx-tip>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {Drawer, Alert, Tip, Loading} from '../../../components';
    import storeForm from './form/storeForm.vue';
    export default {
        components: {
            jxDrawer: Drawer,
            jxAlert: Alert,
            storeForm: storeForm,
            jxTip: Tip,
            jxLoading: Loading
        },
        data () {
            return {
                open: false,
                alertVisible: false,
                stores: [],
                currentStore: {},
                professions: [],
                loading: true,
                tip: false,
                tipWord: '',
                tipType: 'success',
            };
        },
        methods: {
            ...mapActions({
                getStores: 'store/list',
                update: 'store/update',
                create: 'store/create',
                delete: 'store/delete',
                getProfessions: 'store/professionList'
            }),
            handleRemove () {
                this.delete(this.currentStore.id).then((response) => {
                    this.fetchData();
                });
            },
            handleSubmit (data) {
                if (!this.currentStore.id) {
                    this.create(data).then((response) => {
                        this.tip = true;
                        this.tipWord = '店铺信息添加成功！';
                        this.fetchData();
                    });
                } else {
                    data.id = this.currentStore.id;
                    data.boss_id = this.currentStore.boss_id;
                    this.update(data).then((response) => {
                        this.tip = true;
                        this.tipWord = '店铺信息修改成功！';
                        this.fetchData();
                    });
                }
            },
            handleOpenDrawer (store) {
                this.currentStore = store;
                this.open = true;
            },
            showDeleteConfirm () {
                this.alertVisible = true;
            },
            fetchData () {
                this.getStores().then((response) => {
                    this.open = false;
                    this.loading = false;
                    this.stores = response.data && response.data.list ? response.data.list : [];
                });
            }
        },
        created () {
            this.loading = true;
            this.fetchData();

            this.getProfessions().then((response) => {
                this.professions = response.data.list;
            });
        }
    };
</script>
<style lang="scss" src="./store.scss"></style>
