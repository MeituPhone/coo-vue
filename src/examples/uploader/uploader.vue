<template>
    <div class="component-layout">
        <div class="component-name">
            uploader 图片上传<br />
        </div>
        <div class="component-description">
            这是一个允许自定义上传图片张数的vue图片异步上传组件...
        </div>
        <div class="demo">
            <div class="demo-title">1、demo演示</div>
            <div class="demo-box">
                <coo-uploader :length="10"
                              :files="['https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1340925344,145113786&fm=27&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=602288768,1056696022&fm=27&gp=0.jpg']"
                              :readonly="false"
                ></coo-uploader>
            </div>
            <div class="demo-code">
                <pre>&lt;coo-uploader :length="10"
:files="['https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1340925344,145113786&fm=27&gp=0.jpg',
         'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=602288768,1056696022&fm=27&gp=0.jpg']"
:readonly="false"
&gt;&lt;/coo-uploader&gt;</pre>
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

                 <div class="param-item">5: mum：显示加载菊花
                    <div class="param-desc">
                        Boolean, 默认值：true
                    </div>
                </div>
                <div class="param-item">6: needConfirm：删除是显示确认框
                    <div class="param-desc">
                        Boolean, 默认值：true
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
    import {Uploader} from '../../components';
    export default {
        components: {
            cooUploader: Uploader
        }
    };
</script>
<style lang="scss" src="./uploader.scss"></style>
