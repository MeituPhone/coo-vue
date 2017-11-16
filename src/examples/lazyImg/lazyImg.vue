<template>
    <div class="component-layout">
        <div class="component-name">
            LzyImg 图片懒加载组件<br />
        </div>
        <div class="component-description">
            这是一个图片懒加载组件...
        </div>
        <div class="demo">
            <div class="demo-title">1、demo演示</div>
              <div class="demo-box-3">
                <coo-lazy-img 
                    src="https://photo.tuchong.com/1826690/f/10651083.jpg"
                    :autoLoad="true"
                    ></coo-lazy-img>
            </div>
               <div class="demo-box-2">
                <a href="javascript:;" @click="autoLoad2 = true">测试加载下面的图片</a>
                <coo-lazy-img 
                    src="https://mtshop1.meitudata.com/59f83fdbba2a016372.jpg?imageView2/2/w/750" thumb="https://mtshop1.meitudata.com/59f83fdbba2a016372.jpg?imageView2/2/w/50"
                    :autoLoad="autoLoad2"
                    :mum="true"
                    ></coo-lazy-img>
            </div>
            <div class="demo-box">
                <coo-lazy-img 
                    src="http://www.shuxia123.com/upload_images/test.gif"
                    thumb="http://www.shuxia123.com/upload_images/test.jpg"
                >
                </coo-lazy-img>
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
                <div class="param-item">1：src：图片路径 , 类型：String</div>
                <div class="param-item">2：thumb：预览图，类型：String，默认：空(可为空)</div>
                <div class="param-item">3：mum：是否显示菊花，类型：Boolean，默认：false</div>
                <div class="param-item">4：autoLoad：主动加载，类型：Boolean，默认：false</div>
            </div>
        </div>

        <div class="param">
            <div class="param-title">3、事件</div>
            <div class="param-list">

            </div>
        </div>

    </div>
</template>
<script>
    import {LazyImg} from '../../components';
    export default {
        components: {
            cooLazyImg: LazyImg
        },
        data () {
            return {
                autoLoad2: false
            };
        }
    };
</script>
<style lang="scss" src="./lazyImg.scss"></style>
