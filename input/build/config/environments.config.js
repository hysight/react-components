/**
 *@Author: hy-zhangb
 *Date: 2018/5/7 9:37
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/5/7 9:37
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - environments
 *@File Name: environments
 *@Description: Description
 */
// const webpackDevConfig = require('./webpack.config.dev');
// const webpackProConfig = require('./webpack.config.pro');

module.exports = {
    // ======================================================
    // Overrides when NODE_ENV === 'development'
    // ======================================================
    development: ({CLIENT_HOST, CLIENT_PORT, CLIENT_NAME, SERVER_HOST, SERVER_PORT, SERVER_NAME}) => ({// config
        // SERVER_API_FIX_PATH: `http://${SERVER_HOST}:${SERVER_PORT}${SERVER_NAME}/`,
    }),
    // ======================================================
    // Overrides when NODE_ENV === 'production'
    // ======================================================
    production: ({CLIENT_HOST, CLIENT_PORT, CLIENT_NAME, SERVER_HOST, SERVER_PORT, SERVER_NAME}) => ({
        // SERVER_API_FIX_PATH: `http://${SERVER_HOST}:${SERVER_PORT}${SERVER_NAME}/`,
    })
};
