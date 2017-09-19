const path = require('path');
const merge = require('webpack-merge');

module.exports = function config (NODE_ENV = 'development') {
    return merge({
        // 定义打包进 vendor 的公共库
        vendor: [
            'vue',
            'vue-router',
            // 'es6-promise',
            // 'moment',
            // 'lodash',
            // 'bluebird',
            // 'vee-validate',
        ],
        ROUTER_MODE: 'hash',
    });
}
