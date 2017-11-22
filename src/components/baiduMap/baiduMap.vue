<template>
    <div ref="baidu-map" id="baidu-map" class="coo-baidu-map" :style="style">
    </div>
</template>
<script>
    export default {
        name: 'coo-map',
        props: {
            latitude: {
                type: Number
            },
            longitude: {
                type: Number
            },
            showLay: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            },
            address: {
                type: String
            },
            height: {
                type: Number
            },
            appkey: {
                type: String
            }
        },
        computed: {
            style () {
                return {
                    'height': `${this.height}px`,
                };
            },
        },
        data () {
            return {
                map: 'baidu-map'
            };
        },
        methods: {
            loadBaiduMap () {
                /*  eslint-disable */
                let map = new BMap.Map(this.map);
                let point = new BMap.Point(this.longitude, this.latitude);
                map.centerAndZoom(point, 15);

                // 创建标注
                let marker = new BMap.Marker(point);
                // 将标注添加到地图中
                map.addOverlay(marker);
                // 添加带有定位的导航控件
                let navigationControl = new BMap.NavigationControl({
                    // 靠左上角位置
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    // LARGE类型
                    type: BMAP_NAVIGATION_CONTROL_LARGE,
                    // 启用显示定位
                    enableGeolocation: true
                });
                map.addControl(navigationControl);
                // 启用滚轮放大缩小，默认禁用
                map.enableScrollWheelZoom();

                let opts = {
                    width: 250,                     // 信息窗口宽度
                    height: 70,                     // 信息窗口高度
                    title: this.title,              // 信息窗口标题
                    enableMessage: true,            //设置允许信息窗发送短息
                    message: ''
                }

                // 创建信息窗口对象
                let infoWindow = new BMap.InfoWindow(`地址${this.address}`, opts);
                marker.addEventListener('click', function () {
                    // 开启信息窗口
                    map.openInfoWindow(infoWindow, point);
                });
                map.openInfoWindow(infoWindow, point);

                let _this = this;

                map.addEventListener('click', function () {
                    _this.$emit('click');
                });
            }
        },
        mounted () {
            /*  eslint-disable */
            window.loadBaiduMapOver = () => {
                this.loadBaiduMap();
            }

            if (!window.hasdBaiduMap) {
                let script = document.createElement('script');
                script.src = `https://api.map.baidu.com/api?v=2.0&ak=${this.appkey}&callback=loadBaiduMapOver`;
                document.body.appendChild(script);
            } else {
                window.loadBaiduMapOver();
            }
        }
    };
</script>
<style lang="scss" src="./baiduMap.scss"></style>
