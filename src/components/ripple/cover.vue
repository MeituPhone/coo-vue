<template><span
            class="coo-ripple-cover" 
            ref="cover" 
            :style="{left:  `${left}px`, top: `${top}px`, width: `${radius}px`, height: `${radius}px`}">
            </span>
</template>
<script>
    export default {
        data () {
            return {
                radius: 0,
                left: 0,
                top: 0,
            };
        },
        methods: {
            close () {
                this.$refs['cover'].parentNode.removeChild(this.$el);
                this.$destroy();
            },
        },
        mounted () {
            setTimeout(() => {
                this.close();
            }, 1000);
        },
    };
</script>
<style lang="scss" src="./ripple.scss"></style>
