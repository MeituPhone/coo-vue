<template>
    <i :class="['coo-icon', `coo-icon-${type}`]"></i>
</template>
<script>
    export default {
        props: {
            type: String
        }
    };
</script>
<style lang="scss" src="./icon.scss"></style>
