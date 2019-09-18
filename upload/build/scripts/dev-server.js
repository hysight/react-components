/**
 *@Author: hy-zhangb
 *Date: 2017-08-01 19:46
 *@Last Modified by: zhangb
 *@Last Modified time: 2017-08-01 19:46
 *Email: lovewinders@163.com
 *File Path: //
 *@File Name: react-demo
 *@Description:
 */
const configs = require('../config/product.config');
const webpackConfig = require('../config/webpack.config');

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const compress = require('compression');

// ----------------------------------
// get dev || pro Configuration
// ----------------------------------
const {paths: {assignPath, client}, DIR_BASE_PATH, DIR_DIST, COMPILER_HOST, CLIENT_PORT, COMPILER_NAME, COMPILER_PUBLIC_PATH} = configs;

// ======================================================
// express server
// ======================================================
const app = express();

// ======================================================
// Apply gzip compression
// ======================================================
app.use(compress());

// ======================================================
// webpack dev compiler
// ======================================================
const compiler = webpack(webpackConfig);

// ======================================================
// all route to redirect index.html
// ======================================================
app.use(express.static(assignPath(DIR_BASE_PATH, DIR_DIST)));

// ======================================================
// webpack dev middleware
// ======================================================
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: client,
    hot: true,
    quiet: true,
    noInfo: false,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 10,
        poll: true
    },
    historyApiFallback: true,
    stats: {
        colors: true
    }
    // logLevel: 'warn',
}));

// ======================================================
// webpack hot middleware
// ======================================================
console.log('COMPILER_PUBLIC_PATH', COMPILER_PUBLIC_PATH);
app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: `${COMPILER_NAME ? `/${COMPILER_NAME}` : ''}/__webpack_hmr`,
    // path: COMPILER_PUBLIC_PATH,
    heartbeat: 10 * 1000
}));

// ======================================================
// all route to redirect index.html
// ======================================================
app.use('*', function(req, res, next) {

    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result) {

        if(err) {

            return next(err);

        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();

    });

});

// compiler
let initDone = false;
compiler.plugin('done', () => {

    if(!initDone) {

        initDone = true;
        app.listen(CLIENT_PORT, function(err) {

            if(err) {

                console.log(err);
                return;

            }
            console.log(`--====> 💻 Listening at Open http://${COMPILER_HOST}:${CLIENT_PORT} 💻 <====----`);

        });

    }

});
