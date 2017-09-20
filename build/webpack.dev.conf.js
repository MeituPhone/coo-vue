const webpack = require('webpack');
const merge = require('webpack-merge');
const Htmlplugin = require('html-webpack-plugin');

const {resolve} = require('./utils');

const NODE_ENV = process.env.NODE_ENV = 'development';
const config = require('../config/config')[NODE_ENV];
const filenameHash = config.filenameHash;
const configEntry = require('../config')(NODE_ENV);

const webpackConfig = {
    devtool: config.devtool,
    entry: {
        app: resolve('src', 'index.js'),
        vendor: configEntry.vendor,
    },
    output: {
        filename: filenameHash ? '[name].[hash].js' : '[name].js?[hash]',
        path: resolve('../dist'),
        chunkFilename: filenameHash ? '[name].[hash].js' : '[name].js?[hash]', //  for the require.ensure
    },
    performance: {
        hints: false
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=1&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file-loader?name=fonts/[hash:8].[name].[ext]',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader?sourceMap'},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader?sourceMap'},
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /(node_modules)/,
                options: {
                    loaders: {
                        scss: "vue-style-loader!css-loader?sourceMap!sass-loader?sourceMap",
                    }
                }
            },
        ]
    },
    plugins: [
        new Htmlplugin({
            filename: 'index.html',
            template: resolve('src', 'index.html'),
            chunks: [ 'vendor', 'app'],
            hash: true, // 为静态资源生成hash值
            inject: 'body',
            xhtml: true,
            minify: {
                removeComments: true,
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
            'API_ORIGIN': JSON.stringify(config.API_ORIGIN),
            'ROUTER_MODE': JSON.stringify(config.ROUTER_MODE)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
    ],
    devServer: {
        contentBase: resolve('dist'),
        compress: true,
        host: '0.0.0.0',
        port: config.port,
        disableHostCheck: true,
        historyApiFallback: true
    }
};

if (config.eslint) {
    webpackConfig.module.rules.push({
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
            formatter: require('eslint-friendly-formatter')
        }
    });
}

module.exports = webpackConfig;
