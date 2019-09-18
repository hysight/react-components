/**
 *@Author: hy-zhangb
 *Date: 2018/5/7 10:41
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/5/7 10:41
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - webpack.config
 *@File Name: webpack.config
 *@Description: Description
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const configs = require('./product.config');

// ----------------------------------
// get dev || pro Configuration
// ----------------------------------
const {
    DIR_BASE_PATH,
    DIR_DIST_JS,
    COMPILER_DEVTOOL,
    COMPILER_HASH_TYPE,
    COMPILER_PUBLIC_PATH,
    paths: {assignPath, client, dist}
} = configs;

// ----------------------------------
// entry Configuration
// ----------------------------------
const entry = {
    app: assignPath(client, 'index.js')
};

// ----------------------------------
// output Configuration
// ----------------------------------
const output = {
    // 打包产出后文件存放位置
    path: dist,
    // entry chunk产出时的文件名称
    filename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.js`,
    // filename: 'index.js',
    // async chunk产出时的文件名称
    chunkFilename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.chunk.js`,
    // libraryTarget: 'commonjs2'
    publicPath: COMPILER_PUBLIC_PATH
};

// ----------------------------------
// output Configuration
// ----------------------------------
const devtool = COMPILER_DEVTOOL;

// ----------------------------------
// resolve Configuration
// ----------------------------------
const resolve = {
    extensions: ['.js', '.json', '.scss', '.css', '.styl', '.sass', '.less'],
    alias: {
        'src': client,
        'dist': path.join(process.cwd(), 'dist'),
        'react': path.join(process.cwd(), 'node_modules/react'),
        'react-dom': path.join(process.cwd(), 'node_modules/react-dom'),
        'lodash': path.join(process.cwd(), 'node_modules/lodash')
    }
};

// ----------------------------------
// module Configuration
// ----------------------------------
const modules = {
    rules: [
        {
            test: /\.js|jsx$/,
            include: client,
            exclude: [
                dist,
                assignPath(DIR_BASE_PATH, 'node_modules')
            ],
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        },
        // rules Configuration
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader',
                    options: {
                        // data: '$env: ' + process.env.NODE_ENV + ';'
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'less-loader',
                    options: { javascriptEnabled: true }
                }
            ]
        },
        {
            test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: 'fonts'
                    }
                }
            ]
        },
        {
            test: /\.(jpe?g|png|gif)(\?.*)?$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: 'images'
                    }
                }
            ]
        }
    ]
};

// ----------------------------------
// webpack Config Configuration
// ----------------------------------
const webpackConfig = {
    entry,
    output,
    mode: process.env.NODE_ENV,
    devtool,
    resolve,
    // externals: [nodeExternals()],
    module: modules,
    plugins: [
        new HtmlWebpackPlugin({
            title: '数据模块',
            hash: false,
            chunks: ['app'],
            favicon: assignPath(client, 'favicon.ico'),
            chunksSortMode: 'manual',
            inject: true,
            cache: false,
            minify: {
                collapseWhitespace: true
            },
            filename: 'index.html',
            template: assignPath(client, 'index.html')
        })
    ]
};

module.exports = webpackConfig;
