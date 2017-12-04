<template>
    <div class="coo-ripple-box" ref="box" @click="handleClick">
        <div class="coo-ripple-covers" ref="covers"></div>
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue';
    import cover from './cover.vue';
    import {getOffsetTop, getOffsetLeft} from '../utils/dom.js';
    let CoverExtend = Vue.extend(cover);
    export default {
        data () {
            return {
            };
        },
        methods: {
            handleClick (e) {
                // 获取容器宽度
                let offsetWidth = this.$refs['box'].offsetWidth;
                let offsetHeight = this.$refs['box'].offsetHeight;
                let radius = Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight) * 2;

                // 获取容器的坐标
                let offsetLeft = getOffsetLeft(this.$refs['box']);
                let offsetTop = getOffsetTop(this.$refs['box']);

                // 获取点击坐标
                let event = e || window.event;
                let clientX = event.pageX;
                let clientY = event.pageY;

                // 获取点击相对容器的坐标
                let left = clientX - offsetLeft;
                let top = clientY - offsetTop;

                let instance = new CoverExtend({
                    data: {
                        left, top, radius
                    }
                });
                instance.vm = instance.$mount();
                this.$refs['covers'].appendChild(instance.vm.$el);
            },
        },
        mounted () {
        },
    };
</script>
<style lang="scss" src="./ripple.scss"></style>
