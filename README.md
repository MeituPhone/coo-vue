# coo-vue
无疑重复造轮子，只在整理一些平时项目中写过的常用组件。尽量支持各个PC、移动端

## Getting Started

```bash
# install
npm install
# run
npm start
```

访问 http://localhost:9000/#/ 开始开发


## Documents

[coo-vue](http://vue.shuxia123.com)

## Demonstration
- [地区选择器](http://vue.shuxia123.com/#/components/areaselect)
- [弹出框](http://vue.shuxia123.com/#/components/dialog)
- [提示框](http://vue.shuxia123.com/#/components/toast)
- [Swiper](http://vue.shuxia123.com/#/components/swiper)
- [LzyImg](http://vue.shuxia123.com/#/components/lazyImg)
- [地图组件](http://vue.shuxia123.com/#/components/baidumap)
- [图片上传](http://vue.shuxia123.com/#/components/uploader)
- [水波涟漪](http://vue.shuxia123.com/#/components/ripple)

## Todo List
- Siwper优化（支持定义：方向，过渡效果等等）
- 下拉加载更多
- 分页（移动端则响应为滚动加载更多）
- 下拉框
- 日期组件（写一个好用的日期组件）
- Tabs组件（支持定义动画）
- Dropdown组件
- ......


## Project
```bash

   ├──build/                     * webpack文件
   |
   ├──config/                    * cdn、图片资源等配置
   |
   ├──src/                       * 源码目录
   │   │
   │   │──assets                 * 全局样式、图片资源、字体资源等等
   │   │
   │   └──components             * 各个组件
   │   │   │
   │   │   └──***                * 组件目录
   │   │
   │   └──examples               * 各个组件对应的栗子
   │   │
   │   └──router                 * 路由配置
   │
   │──package.json               * 包信息
   │
   │──.eslintrc.js               * Eslint配置
   │
   │──.babelrc                   * Babel配置
   │
   │──.gitignore                 * Git忽略文件配置
   │
   │──postcss.config.js          * postcss配置文件
```

## Support

Modern browsers and Internet Explorer 9+.


## LICENSE

**MIT**
