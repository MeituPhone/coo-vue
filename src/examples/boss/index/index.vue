<template>
    <div class="index">
        <div class="index-content clearfix">
            <div class="tool-item">
                <router-link class="tool-link" to="/boss/store">
                    <span class="jx-icon jx-icon-store"></span>
                    <div class="tool-title">
                        商铺管理
                    </div>
                    <div class="tool-description">
                        我的店铺，添加店铺！提高店铺的服务质量的能力
                    </div>
                    <div class="tool-footer">
                        <jx-button>进入管理</jx-button>
                    </div>
                </router-link>
            </div>
            <div class="tool-item">
                <router-link class="tool-link" to="/boss/report">
                    <span class="jx-icon jx-icon-report"></span>
                    <div class="tool-title">
                        查看报表
                    </div>
                    <div class="tool-description">
                        填写信息，成功添加店铺！具有提高服务质量的能力
                    </div>
                    <div class="tool-footer">
                        <jx-button>进入查看</jx-button>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import {Button} from '../../../components';
    export default{
        components: {
            jxButton: Button
        }
    };
</script>
<style lang="scss" src="./index.scss"></style>
