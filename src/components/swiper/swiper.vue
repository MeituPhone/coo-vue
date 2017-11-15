<template>
    <div class="coo-swiper" ref="coo-swiper" v-bind:active-index="currentIndex">
        <div class="coo-swiper-inner">
            <div class="coo-swiper-wrapper clearfix"
                 @touchstart="onTouchDown"
                 @touchmove="onTouchMove"
                 @touchend="onTouchEnd"
                 ref="slider-wrapper"
                 :style="{width: `${this.wrapperWidth}px`, transform: translateValue, 'transition-duration': (touching || !isTransition) ? '0ms' : '300ms'}">
                <slot></slot>
            </div>
        </div>
        <div v-if="sliderLength > 1" class="coo-swiper-pagination clearfix">
            <div class="coo-swiper-page icon"
                 v-if="pagination"
                 v-for="(item, index) in sliderLength"
                 :class="[((index === currentIndex) || (index === 0 && currentIndex === sliderLength) || (index === sliderLength - 1 && currentIndex === -1)) ? 'coo-swiper-page-active' : '']"
                 @click="onClickPage(index)"></div>
        </div>
        <a href="javascript:;"
           v-if="(currentIndex !== 0  || loop) && sliderLength >1"
           class="coo-swiper-prev"
           @click="onPrev">
            <span class="mt-icon mt-icon-left"></span>
        </a>
        <a href="javascript:;"
           v-if="(currentIndex !== sliderLength - 1 || loop) && sliderLength >1"
           class="coo-swiper-next"
           @click="onNext">
            <span class="mt-icon mt-icon-right"></span>
        </a>
    </div>
</template>
<script>
    export default {
        name: 'coo-swiper',
        props: {
            loop: {
                type: Boolean,
                default: true
            },                                  // 是否循环
            pagination: {
                type: Boolean,
                default: true
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
                translateValue: '',
                sliderLength: 0,
            };
        },
        watch: {
            translateX (value) {
                this.translateValue = `translate(${value}px, 0) translateZ(0)`;
            }
        },
        methods: {
            setIndex (index) {
                let oldIndex = this.currentIndex;
                if (!this.loop) {
                    if (index === -1) {
                        this.currentIndex = 0;
                    } else if (index === this.$children.length) {
                        this.currentIndex = this.sliderLength - 1;
                    } else {
                        this.currentIndex = index;
                    }
                } else {
                    this.currentIndex = index;
                }
                this.translateX = -((this.currentIndex + 1) * this.width);
                if (oldIndex !== this.currentIndex) {
                    this.$emit('success', this.currentIndex);
                }
            },
            // 点击上一张
            onPrev () {
                if (this.currentIndex === 0 && !this.loop) {
                    return false;
                }
                if (this.currentIndex === -1) {
                    this.isTransition = false;
                    this.setIndex(this.sliderLength - 1);
                    this.startTranslateX = this.translateX;
                    setTimeout(() => {
                        this.isTransition = true;
                        this.setIndex(this.currentIndex - 1);
                    }, 10);
                } else if (this.currentIndex === this.sliderLength) {
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
                this.$emit('prev');
            },
            // 点击下一张
            onNext () {
                if (this.currentIndex === this.sliderLength - 1 && !this.loop) {
                    return false;
                }

                if (this.currentIndex === -1) {
                    this.isTransition = false;
                    this.setIndex(this.sliderLength - 1);
                    this.startTranslateX = this.translateX;
                    setTimeout(() => {
                        this.isTransition = true;
                        this.setIndex(this.currentIndex + 1);
                    }, 10);
                } else if (this.currentIndex === this.sliderLength) {
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
                this.$emit('next');
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
                    this.setIndex(this.sliderLength - 1);
                    this.startTranslateX = this.translateX;
                }

                if (this.currentIndex === this.sliderLength) {
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
                if (this.sliderLength <= 1) {
                    return false;
                }

                this.touching = true;
                this.startX = event.touches[0].clientX;
                this.startY = event.touches[0].clientY;
                this.startTranslateX = this.translateX;
                this.isStart = true;
                if (this.currentIndex === -1) {
                    this.setIndex(this.sliderLength - 1);
                    this.startTranslateX = this.translateX;
                }

                if (this.currentIndex === this.sliderLength) {
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
                        if ((this.currentIndex === 0 && this.differenceX > 0) || (this.currentIndex === this.sliderLength - 1 && this.differenceX < 0)) {
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
        },
        mounted () {
            let width = this.$refs['coo-swiper'].offsetWidth;
            this.width = width;
            this.sliderLength = this.$children.length;
            this.wrapperWidth = (this.sliderLength + 2) * width;
            let dom = this.$refs['slider-wrapper'];
            dom.insertBefore(this.$children[0].$el.cloneNode(true), dom.children[dom.children.length]);
            dom.insertBefore(this.$children[this.sliderLength - 1].$el.cloneNode(true), dom.children[0]);
            dom.children[0].style.width = `${this.width}px`;
            dom.children[dom.children.length - 1].style.width = `${this.width}px`;
            this.setIndex(0);
            setTimeout(() => {
                this.isTransition = true;
            }, 300);
        },
        created () {

        },
        beforeDestroy () {
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" src="./swiper.scss">
</style>
