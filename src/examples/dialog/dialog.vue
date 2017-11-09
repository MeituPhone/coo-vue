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
                (1)：<a href="javascript:;" @click="visible=true;type='success'" class="link-demo">打开[success]</a>
                (2)：<a href="javascript:;" @click="visible=true;type='dialog'"  class="link-demo">打开[dialog]</a>
                <coo-dialog
                    :visible.sync="visible"
                    :type="type"
                    title="弹出框"
                    :lock="true"
                >
                    <div class="">
                        测试dialog
                    </div>
                </coo-dialog>
            </div>
            <div class="demo-code">
                <pre>
&lt;coo-dialog
        :visible.sync="visible"
        :type="type"
        title="弹出框"
        &gt;
        测试dialog
&lt;/coo-dialog&gt;</pre>
            </div>
        </div>
        <div class="param">
            <div class="param-title">2、参数说明</div>
            <div class="param-list">
                <div class="param-item">1：title：标题 , 类型：String</div>
                <div class="param-item">2：visible：是否可见，类型：Boolean，默认：false</div>
                <div class="param-item">3：lock：是否锁定窗口，类型：Boolean，默认：false</div>
                <div class="param-item">4：showClose：是否显示关闭按钮，类型：Boolean，默认：false</div>
                <div class="param-item">5：type：提示框类型，类型：String，可选值：['dialog', 'success', 'warning', 'info', 'wait']，默认：'dialog'</div>
                <div class="param-item">6：width：宽度，类型：Number，默认值：500</div>
                <div class="param-item">7：ok：是否显示确认按钮，类型：Boolean，默认：true</div>
                <div class="param-item">8：okLabel：确认按钮，类型：String，默认：'确认'</div>
                <div class="param-item">9：cancel：是否显示取消按钮，类型：Boolean，默认：true</div>
                <div class="param-item">10：cancelLabel：取消按钮，类型：String，默认：'取消'</div>
                <div class="param-item">11：timeout：自动关闭时间，类型：Number，默认：0</div>
            </div>
        </div>

        <div class="param">
            <div class="param-title">3、事件</div>
            <div class="param-list">
                <div class="param-item">1: cancel：点击取消按钮时触发
                </div>
                <div class="param-item">2: ok: 点击确认按钮时触发
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
                visible: false,
                type: ''
            }
        }
    };
</script>
<style lang="scss" src="./dialog.scss"></style>
