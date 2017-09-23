<template>
    <div class="component-layout">
        <div class="component-name">
            Dialog 弹出框<br />
        </div>
        <div class="component-description">
            这是一个对话框组件...
        </div>
        <div class="demo">
            <div class="demo-title">1、demo演示</div>
            <div class="demo-box">
                <a href="javascript:;" @click="visible=true">打开</a>
                <coo-dialog
                    :visible.sync="visible"
                >
                    <div class="">
                        测试dialog
                    </div>
                </coo-dialog>
            </div>
        </div>
        <div class="param">
            <div class="param-title">2、参数说明</div>
            <div class="param-list">
                <div class="param-item">1: actionPath：上传api路径
                    <div class="param-desc">
                        <h4>request请求：</h4>
                        file：formData类型
                    </div>
                    <div class="param-desc">
                        <h4>response返回：</h4><pre>{
    data: String，图片路径
}</pre>
                    </div>
                </div>
                <div class="param-item">2: files：初始图片
                    <div class="param-desc">
                        类型：Array, 默认值：[]
                    </div>
                </div>
                <div class="param-item">3: readonly：只读
                    <div class="param-desc">
                        类型：Boolean, 默认值：false
                    </div>
                </div>
                <div class="param-item">4: length：最多可上传数
                    <div class="param-desc">
                        类型：Number, 默认值：10
                    </div>
                </div>
            </div>
        </div>

        <div class="param">
            <div class="param-title">3、事件</div>
            <div class="param-list">
                <div class="param-item">1: upload(images)：上传成功触发
                    <div class="param-desc">
                        images为上传的图片
                    </div>
                </div>
                <div class="param-item">2: remove(images)：删除图片触发
                    <div class="param-desc">
                        images为上传的图片
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {Dialog} from '../../components';
    export default {
        components: {
            cooDialog: Dialog
        },
        data () {
            return {
                visible: false
            }
        }
    };
</script>
<style lang="scss" src="./dialog.scss"></style>
