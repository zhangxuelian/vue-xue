'use strict';

const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

let buildConfig = {
    devtool: process.env.NODE_ENV == 'production' ? '' : 'cheap-module-eval-source-map',
    entry: {
        index: path.join(__dirname, '../src/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
        publicPath: './',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.scss/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'imgs/[name]--[folder].[ext]'
                    }
                }
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name]--[folder].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'fonts/[name]--[folder].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src'),
            '@root': path.resolve(__dirname, '..'),
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue', '.json', '.css', 'scss']
    },
    target: 'web'
}

module.exports = buildConfig;