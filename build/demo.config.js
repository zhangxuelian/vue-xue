'use strict';

const path = require('path');
const webpack = require('webpack');
const {
    VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const directory = fs.readdirSync('./example/src/modules');
const uiDirectory = fs.readdirSync('./example/src/ui');

let demoConfig = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: path.join(__dirname, '../example/main.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../demo'),
        publicPath: './'
    },
    module: {
        rules: [{
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
            }, {
                test: /\.md$/,
                use: [{
                        loader: 'vue-loader',
                        options: {
                          compilerOptions: {
                            preserveWhitespace: false
                          }
                        }
                      },
                      {
                        loader: path.resolve(__dirname, './md-loader/index.js')
                      }
                  ]
                // use: [{
                //         loader: 'vue-loader',
                //         options: {
                //             compilerOptions: {
                //               preserveWhitespace: false
                //             }
                //           }
                //     },
                //     {
                //         loader: 'vue-markdown-loader/lib/markdown-compiler',
                //         options: {
                //             raw: true
                //         }
                //     }
                // ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../example/index.html')
        }),
        new webpack.DefinePlugin({
            DIRECTORY: JSON.stringify(directory),
            uiDirectory: JSON.stringify(uiDirectory)
        })
    ],
    resolve: {
        alias: {
            '@': path.join(__dirname, '../example/src'),
            '@root': path.resolve(__dirname, '..'),
            'vue$': 'vue/dist/vue.esm.js',
            'xue$': path.join(__dirname, '../dist/index.js')
        },
        extensions: ['.js', '.vue', '.json', '.css', 'scss']
    },
    target: 'web'
}

module.exports = demoConfig;