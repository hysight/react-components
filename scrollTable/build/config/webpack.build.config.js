const path = require('path');
const nodeExternals = require('webpack-node-externals');
const configs = require('./product.config');

// ----------------------------------
// get dev || pro Configuration
// ----------------------------------
const {
    env,
    DIR_BASE_PATH,
    DIR_DIST_JSON,
    DIR_DIST_JS,
    DIR_DIST_FONTS,
    DIR_DIST_IMAGES,
    COMPILER_DEVTOOL,
    COMPILER_HASH_TYPE,
    COMPILER_PUBLIC_PATH,
    paths: {assignPath, client, dist}
} = configs;

// ----------------------------------
// entry Configuration
// ----------------------------------
const entry = {
    app: assignPath(client, 'components', 'index.ts')
};

// ----------------------------------
// output Configuration
// ----------------------------------
const output = {
    // 打包产出后文件存放位置
    path: dist,
    // entry chunk产出时的文件名称
    // filename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.js`,
    filename: 'index.js',
    // async chunk产出时的文件名称
    // chunkFilename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.chunk.js`,
    libraryTarget: 'commonjs2'
    // publicPath: COMPILER_PUBLIC_PATH
};

// ----------------------------------
// resolve Configuration
// ----------------------------------
const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css', '.styl', '.sass', '.less'],
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
            test: /\.[jt]sx?$/,
            include: client,
            exclude: [
                dist,
                assignPath(DIR_BASE_PATH, 'node_modules')
            ],
            use: [
                {
                    loader: 'thread-loader',
                    // loaders with equal options will share worker pools
                    // 设置同样option的loaders会共享
                    options: {
                        // worker的数量，默认是cpu核心数
                        workers: 2,

                        // 一个worker并行的job数量，默认为20
                        workerParallelJobs: 50,

                        // 添加额外的node js 参数
                        workerNodeArgs: ['--max-old-space-size=1024'],


                        // 允许重新生成一个dead work pool
                        // 这个过程会降低整体编译速度
                        // 开发环境应该设置为false
                        poolRespawn: false,


                        //空闲多少秒后，干掉work 进程
                        // 默认是500ms
                        // 当处于监听模式下，可以设置为无限大，让worker一直存在
                        poolTimeout: 2000,

                        // pool 分配给workder的job数量
                        // 默认是200
                        // 设置的越低效率会更低，但是job分布会更均匀
                        poolParallelJobs: 50,

                        // name of the pool
                        // can be used to create different pools with elsewise identical options
                        // pool 的名字
                        //
                        name: 'my-pool'
                    },
                },
                {
                    loader: 'babel-loader',
                },
                // {
                //     // loader: 'awesome-typescript-loader',
                //     loader: 'ts-loader',
                // },
            ],
        },
        // rules Configuration
        {
            test: /\.(c|sc|sa)ss$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'postcss-loader',
                },
                {
                    loader: 'sass-loader',
                },
            ],
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'postcss-loader',
                },
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                            // modifyVars: LESS_MODIFY_VARS,
                        }
                    },
                },
            ],
        },
        {
            test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: `${DIR_DIST_FONTS}`,
                    },
                },
            ],
        },
        {
            test: /\.(jpe?g|png|gif)(\?.*)?$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: `${DIR_DIST_IMAGES}`,
                    },
                },
            ],
        },
        {
            type: 'javascript/auto',
            test: /\.(json)(\?.*)?$/i,
            exclude:[/node_modules/],
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: `${DIR_DIST_JSON}`,
                    },
                },
            ],
        },
    ]
};

// ----------------------------------
// webpack Config Configuration
// ----------------------------------
const webpackConfig = {
    mode: env,
    entry,
    output,
    resolve,
    externals: [nodeExternals()],
    module: modules
};

module.exports = webpackConfig;
