<template>
    <transition name="dialog-fade">
        <div class="coo-dialog-wrapper" v-show="visible" @click.self="handleWrapperClick">
            <div
                    v-if="type==='dialog'"
                    class="coo-dialog"
                    :class="[!ok && !cancel ? 'mt-dialog-no-footer' : '']"
                    ref="dialog"
                    v-show="visible"
                    :style="style"
            >
                <button class="coo-dialog-close" @click="handleClose"><coo-icon type="cancel"></coo-icon></button>
                <div class="coo-dialog-header" v-if="!!title">
                    {{title}}
                </div>
                <div class="coo-dialog-body">
                    <slot></slot>
                </div>
                <div class="coo-dialog-footer" v-if="ok || cancel">
                    <button class="coo-dialog-btn coo-dialog-cancel" v-if="cancel" @click="handleClose">{{ cancelLabel }}</button>
                    <button  class="coo-dialog-btn coo-dialog-ok" v-if="ok" @click="handleOk">{{ okLabel }}</button>
                </div>
            </div>

            <div
                    v-if="type!=='dialog'"
                    class="coo-dialog"
                    :class="[!ok && !cancel ? 'mt-dialog-no-footer' : '']"
                    ref="dialog"
                    v-show="visible"
                    :style="style"
            >
                <div class="coo-dialog-body coo-dialog-type-body" :class="[`coo-dialog-${type}`]">
                    <div class="coo-dialog-type-icon">
                        <coo-icon :type="type"></coo-icon>
                    </div>
                    <div class="coo-dialog-type-title">{{title}}</div>
                    <div class="coo-dialog-type-content">
                        <slot></slot>
                    </div>
                </div>
                <div class="coo-dialog-type-footer">
                    <button  class="coo-dialog-btn coo-dialog-ok" v-if="ok" @click="handleOk">{{ okLabel }}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import CooIcon from '../icon/icon.vue';
    import dialogManager from './dialogManager';
    export default {
        name: 'coo-dialog',
        mixins: [dialogManager],
        model: {
            prop: 'visible',
            event: 'visible-change',
        },
        props: {
            title: {
                type: String,
                default: '',
            },
            visible: {
                type: Boolean,
                default: false,
            },
            lock: {
                type: Boolean,
                default: true,
            },
            showClose: {
                type: Boolean,
                default: true,
            },
            type: {
                type: String,
                default: 'dialog',
            },
            width: {
                type: Number,
                default: 500,
            },
            top: {
                type: String,
                default: '20%',
            },
            beforeOk: Function,
            beforeCancel: Function,
            ok: {
                type: Boolean,
                default: true,
            },
            cancel: {
                type: Boolean,
                default: true,
            },
            okLabel: {
                type: String,
                default: '确定',
            },
            cancelLabel: {
                type: String,
                default: '取消',
            },
            timeout: {
                type: Number,
                default: 0,
            },
            appendToBody: {
                type: Boolean,
                default: false
            }
        },
        components: {
            CooIcon: CooIcon,
        },
        watch: {
            visible (val) {
                if (val) {
                    if (this.timeout) {
                        setTimeout(() => {
                            this.handleClose();
                        }, this.timeout);
                    }
                }
            },
        },
        computed: {
            style () {
                return {
                    'width': `${this.width}px`,
                };
            },
        },
        methods: {
            handleWrapperClick () {
                this.handleClose();
            },
            handleClose () {
                if (typeof this.beforeClose === 'function') {
                    this.beforeClose(this.hide);
                } else {
                    this.hide();
                }
            },
            handleOk () {
                if (typeof this.beforeOk === 'function') {
                    this.beforeOk(this.hide);
                } else {
                    this.hide();
                }
            },
            hide () {
                this.$emit('update:visible', false);
            },
        },
        mounted () {

        },
    };
</script>
<style lang="scss" src="./dialog.scss"></style>
