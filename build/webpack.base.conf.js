const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {resolve} = require('./utils');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    const configEntry = require('../config')(NODE_ENV);
    const config = require('../config/config')[NODE_ENV];


    let _plugins =[
        new ExtractTextPlugin({
            filename: 'css/[name].css?[contenthash:8]',
            allChunks: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                dead_code: true
            },
            sourceMap: false,
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('src', 'index.html'),
            chunks: ['vendor', 'app'],
            hash: false,
            inject: 'body',
            xhtml: true,
            minify: {
                removeComments: true,
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'ROUTER_MODE': JSON.stringify(configEntry.ROUTER_MODE)
        })
    ];

    const webpackConfig = {
        entry: {
            vendor: configEntry.vendor,
            app: resolve('src', 'index.js'),
        },
        output: {
            path: resolve('../dist'),
            publicPath: config.staticPath,
            filename: 'js/[name].js?[chunkhash:8]',
            chunkFilename: '[name].js?[chunkhash]',

        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
            },
        },
        devtool: config.devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 1,
                        publicPath: config.imgPath,
                        name: 'images/[hash:8].[name].[ext]'
                    }
                },
                {
                    test: /\.ejs$/,
                    loader: 'ejs-loader'
                },
                {
                    test: /\.php/,
                    loader: 'ejs-loader'
                },
                {
                    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                    loader: 'file-loader?name=/fonts/[hash:8].[name].[ext]',
                },
                {
                    test: /\.(scss|css)$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: false,
                                    minimize: true,
                                }
                            },
                            'postcss-loader',
                            "sass-loader?sourceMap",
                        ],
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    exclude: /(node_modules)/,
                    options: {
                        loaders: {
                            scss: ExtractTextPlugin.extract({
                                use: [
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            sourceMap: config.cssSourceMap,
                                            minimize: true,
                                        }
                                    },
                                    "sass-loader?sourceMap",
                                ],
                                fallback: 'vue-style-loader'
                            })
                        }
                    }
                },
            ]
        },
        plugins: _plugins
    }

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

    return webpackConfig;
};
