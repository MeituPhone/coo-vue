<template>
    <transition name="dialog-fade">
        <div  class="coo-dialog-wrapper" v-show="visible" @click.self="handleWrapperClick">
            <div
                class="coo-dialog"
                :class="[sizeClass, !ok && !cancel ? 'mt-dialog-no-footer' : '']"
                ref="dialog">
                <div class="coo-dialog-header clearfix">
                    {{title}}
                    <div class="coo-dialog-close"></div>
                </div>
                <div class="coo-dialog-body">
                        <slot></slot>
                </div>
                <div class="coo-dialog-footer" v-if="ok || cancel">
                    <button class="" v-if="cancel" @click="handleClose">{{ cancelLabel }}</button>
                    <button v-if="ok" @click="handleOk">{{ okLabel }}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'coo-dialog',
        model: {
            prop: 'visible',
            event: 'visible-change'
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            visible: {
                type: Boolean,
                default: false
            },
            lock: {
                type: Boolean,
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: '500px'
            },
            top: {
                type: String,
                default: '15%'
            },
            ok: {
                type: Boolean,
                default: true
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
                default: 0
            }
        },
        components: {
        },
        watch: {
            visible (val) {
                if (val) {
                    if (this.timeout) {
                        setTimeout(() => {
                            this.handleClose();
                        }, this.timeout);
                    }
                } else {
                    this.$emit('close');
                }
            }
        },
        computed: {
            sizeClass () {
                return `${this.size}`;
            },
        },
        methods: {
            handleWrapperClick () {
                this.handleClose();
            },
            handleClose () {
                this.$emit('cancel');
                this.hide();
            },
            handleOk () {
                this.$emit('ok');
                this.hide();
            },
            hide (cancel) {
                this.$emit('update:visible', false);
            }
        },
        mounted () {

        }
    };
</script>
<style lang="scss" src="./dialog.scss"></style>
