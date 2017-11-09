<template>
    <div class="coo-slider" ref="coo-slider" v-bind:active-index="currentIndex">
        <div class="coo-slider-inner">
            <div class="coo-slider-wrapper clearfix"
                 @touchstart="onTouchDown"
                 @touchmove="onTouchMove"
                 @touchend="onTouchEnd"
                 :style="{width: `${this.wrapperWidth}px`, transform: translateValue, 'transition-duration': (touching || !isTransition) ? '0ms' : '300ms'}">
                <slider-item :key="-1" :image="images[images.length - 1]" :width="width"></slider-item>

                <slot></slot>
                <slider-item  :key="images.length" :image="images[0]" :width="width"></slider-item>
            </div>
        </div>
        <div v-if="images.length > 1" class="coo-slider-pagination clearfix">
            <div class="coo-slider-page icon"
                 v-for="(item, index) in images"
                 :class="[((index === currentIndex) || (index === 0 && currentIndex === images.length) || (index === images.length - 1 && currentIndex === -1)) ? 'coo-slider-page-active' : '']"
                 @click="onClickPage(index)"></div>
        </div>
        <a href="javascript:;"
           v-if="(currentIndex !== 0  || loop) && images.length >1"
           class="coo-slider-prev"
           @click="onPrev">
            <span class="mt-icon mt-icon-left"></span>
        </a>
        <a href="javascript:;"
           v-if="(currentIndex !== images.length - 1 || loop) && images.length >1"
           class="coo-slider-next"
           @click="onNext">
            <span class="mt-icon mt-icon-right"></span>
        </a>
    </div>
</template>
<script>
    import sliderItem from './sliderItem.vue';
    export default {
        name: 'coo-slider',
        components: {
            sliderItem: sliderItem,
        },
        props: {
            loop: {
                type: Boolean,
                default: false
            },                                  // 是否循环
        },
        data () {
            return {
                isTransition: false,            // 初始化
                width: 0,                       // 幻灯片宽度
                wrapperWidth: 0,                // 范围宽度
                currentIndex: 0,                // 当前页
                translateX: 0,                  // x轴
                showBtnPrev: true,              // 前一页按钮
                showBtnNext: true,              // 下一页按钮
                touching: false,                // 正在触屏
                startX: 0,                      // x轴 开始位置
                startY: 0,                      // y轴 开始位置
                currentX: 0,                    // x轴 当前位置
                startTranslateX: 0,             //
                differenceX: 0,
                canSlide: true,                // 手势判断
                isStart: true,                  // 是否刚开始
                translateValue: ''
            };
        },
        watch: {
            images () {
                this.init();
            },
            translateX (value) {
                this.translateValue = `translate(${value}px, 0) translateZ(0)`;
            }
        },
        methods: {
            setIndex (index) {
                if (!this.loop) {
                    if (index === -1) {
                        this.currentIndex = 0;
                    } else if (index === this.images.length) {
                        this.currentIndex = this.images.length - 1;
                    } else {
                        this.currentIndex = index;
                    }
                } else {
                    this.currentIndex = index;
                }
                this.translateX = -((this.currentIndex + 1) * this.width);
            },
            // 点击上一张
            onPrev () {
                if (this.currentIndex === 0 && !this.loop) {
                    return false;
                }
                if (this.currentIndex === -1) {
                    this.isTransition = false;
                    this.setIndex(this.images.length - 1);
                    this.startTranslateX = this.translateX;
                    setTimeout(() => {
                        this.isTransition = true;
                        this.setIndex(this.currentIndex - 1);
                    }, 10);
                } else if (this.currentIndex === this.images.length) {
                    this.isTransition = false;
                    this.setIndex(0);
                    this.startTranslateX = this.translateX;
                    setTimeout(() => {
                        this.isTransition = true;
                        this.setIndex(this.currentIndex - 1);
                    }, 10);
                } else {
                    this.setIndex(this.currentIndex - 1);
                }
            },
            // 点击下一张
            onNext () {
                if (this.currentIndex === this.images.length - 1 && !this.loop) {
                    return false;
                }

                if (this.currentIndex === -1) {
                    this.isTransition = false;
                    this.setIndex(this.images.length - 1);
                    this.startTranslateX = this.translateX;
                    setTimeout(() => {
                        this.isTransition = true;
                        this.setIndex(this.currentIndex + 1);
                    }, 10);
                } else if (this.currentIndex === this.images.length) {
                    this.isTransition = false;
                    this.setIndex(0);
                    this.startTranslateX = this.translateX;
                    setTimeout(() => {
                        this.isTransition = true;
                        this.setIndex(this.currentIndex + 1);
                    }, 10);
                } else {
                    this.setIndex(this.currentIndex + 1);
                }
            },
            // 点击特定页
            onClickPage (index) {
                if (index === this.currentIndex) {
                    return false;
                }
                this.setIndex(index);
            },
            onMouseDown (event) {
                this.onMouseStart(event);
                window.addEventListener('mousemove', this.onMouseMove);
                window.addEventListener('mouseup', this.onTouchEnd);
                window.addEventListener('contextmenu', this.onTouchEnd);
            },
            onTouchDown (event) {
                this.onTouchStart(event);
            },
            onMouseStart (event) {
                this.touching = true;
                this.startX = event.clientX;
                this.startTranslateX = this.translateX;
                if (this.currentIndex === -1) {
                    this.setIndex(this.images.length - 1);
                    this.startTranslateX = this.translateX;
                }

                if (this.currentIndex === this.images.length) {
                    this.setIndex(0);
                    this.startTranslateX = this.translateX;
                }
            },
            onMouseMove (event) {
                if (this.touching) {
                    this.differenceX = event.clientX - this.startX;
                    this.translateX = this.startTranslateX + this.differenceX;
                }
            },
            onTouchStart (event) {
                if (this.images.length <= 1) {
                    return false;
                }

                this.touching = true;
                this.startX = event.touches[0].clientX;
                this.startY = event.touches[0].clientY;
                this.startTranslateX = this.translateX;
                this.isStart = true;
                if (this.currentIndex === -1) {
                    this.setIndex(this.images.length - 1);
                    this.startTranslateX = this.translateX;
                }

                if (this.currentIndex === this.images.length) {
                    this.setIndex(0);
                    this.startTranslateX = this.translateX;
                }
            },
            onTouchMove (event) {
                if (this.touching) {
                    this.differenceX = event.touches[0].clientX - this.startX;
                    let differenceY = event.touches[0].clientY - this.startY;
                    // 不循环
                    if (!this.loop) {
                        if ((this.currentIndex === 0 && this.differenceX > 0) || (this.currentIndex === this.images.length - 1 && this.differenceX < 0)) {
                            return false;
                        }
                    }

                    let abs = Math.abs(differenceY / this.differenceX);
                    if (this.isStart && abs > 1) {
                        this.canSlide = false;
                    }
                    if (this.canSlide) {
                        event.preventDefault();
                        this.translateX = this.startTranslateX + this.differenceX;
                    }
                    this.isStart = false;
                }
            },
            onTouchEnd (event) {
                event.preventDefault();
                this.touching = false;
                this.isTransition = true;
                if (this.differenceX > 50 && this.canSlide) {
                    this.setIndex(this.currentIndex - 1);
                } else if (this.differenceX < -50 && this.canSlide) {
                    this.setIndex(this.currentIndex + 1);
                } else {
                    this.setIndex(this.currentIndex);
                }
                this.canSlide = true;
            },
            init () {
                let width = this.$refs['coo-slider'].offsetWidth;
                this.width = width;
                this.wrapperWidth = (this.images.length + 2) * width;
                this.setIndex(0);
                setTimeout(() => {
                    this.isTransition = true;
                }, 300);
            }
        },
        mounted () {
            this.init();
        },
        created () {
        },
        beforeDestroy () {
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" src="./slider.scss">
</style>
