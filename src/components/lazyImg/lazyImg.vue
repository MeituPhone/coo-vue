<template>
    <div class="lazy-img"
        :class="{ 'lazy-gif': src.indexOf('.gif') > -1, 
                  'lazy-loading': loading,
                  'lazy-loaded': loaded,
                  'lazy-mask': !thumb && loading,
                  'lazy-fadeout': fadeOut
                }" 
        @click="handleLoad">
            <img :src="imgSrc" :lazy-src="src" />
            <a href="javascript:;" class="lazy-btn-reload" @click="handleLoad" v-if="reload">重新加载</a>
            <span v-if="loading && mum" class="coo-loading"></span>
    </div>
</template>
<script>
    export default {
        props: {
            src: {
            	type: String
            },
            thumb: String,
            mum: {
                type: Boolean,
                default: false
            },
            autoLoad: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            autoLoad (value) {
                if (value) {
                    this.loadImage();
                }
            }
        },
        data () {
            return {
                imgSrc: this.thumb,
                reload: false,
                loading: false,
                loaded: false,
                fadeOut: false
            };
        },
        methods: {
            handleLoad () {
                if (this.loading) {
                    return false;
                }
                this.loadImage();
            },
            loadImage () {
                this.reload = false;
                this.loading = true;
                let image = new Image();
                image.onload = () => {
                    this.fadeOut = true;
                    this.imgSrc = !this.thumb ? this.src : this.imgSrc;
                    setTimeout(() => {
                    	this.imgSrc = this.src;
                        this.loading = false;
                        this.loaded = true;
                        this.fadeOut = false;
                    }, 500);
                };
                image.onerror = () => {
                    this.reload = true;
                    this.loading = false;
                };
                image.src = this.src;
            }
        },
        mounted () {
            if (this.autoLoad) {
                this.loadImage();
            }
        },
        create () {

        },
    };
</script>
<style lang="scss" src="./lazyImg.scss"></style>
