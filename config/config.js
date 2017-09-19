module.exports = {
    production: {
        NODE_ENV: 'production',
        API_ORIGIN: '',
        jsSourceMap: false,
        cssSourceMap: false,
        eslint: true,
        //静态资源cdn路径
        staticPath: '',
        cssPath: '',
        // 图片资源cdn路径
        imgPath: '',
        //生成带hash文件名
        filenameHash: false,
    },
    test: {
        NODE_ENV: 'test',
        API_ORIGIN: '',
        jsSourceMap: false,
        cssSourceMap: false,
        eslint: true,
        staticPath: '',
        cssPath: '',
        // 图片资源cdn路径
        imgPath: '',
        //生成带hash文件名
        filenameHash: false,
    },
    development: {
        // 开发 devServer 端口
        port: 9000,

        NODE_ENV: 'development',
        API_ORIGIN: '',

        devtool: 'source-map',
        eslint: true,
        // 静态资源cdn路径
        staticPath: '',
        cssPath: '',
        // 图片资源cdn路径
        imgPath: '',
        // 生成带hash文件名
        filenameHash: false,
    }
};
