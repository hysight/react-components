/**
 *@Author: hy-zhangb
 *Date: 2018/5/4 15:48
 * @Last Modified by: Ma Liangliang
 * @Last Modified time: 2018-05-25 15:34:12
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - product.config
 *@File Name: product.config
 *@Description: Description
 */
const environments = require('./environments.config');

const path = require('path');
const debug = require('debug')('app:config:product');

debug('Creating default configuration.');

// ========================================================
// Default Configuration
// ========================================================
const defaultConfig = {
    // ----------------------------------
    // Env Configuration
    // ----------------------------------
    env: process.env.NODE_ENV || 'development',

    // ----------------------------------
    // Product Structure
    // ----------------------------------
    DIR_BASE_PATH: path.resolve(__dirname, '../..'),
    DIR_CLIENT: 'src',
    DIR_DIST: 'dist',
    DIR_DIST_JS: 'js',
    DIR_DIST_CSS: 'css',
    DIR_DIST_FONTS: 'fonts',
    DIR_DIST_IMAGES: 'images',
    DIR_PUBLIC: 'public',
    DIR_SERVER: 'server',

    // ----------------------------------
    // webpack server Configuration
    // webpack dev server 地址、端口和项目名称
    // example
    // CLIENT_NAME: 'analysis'
    // CLIENT_NAME: if set Nonempty string, so is multi server deploy
    // CLIENT_NAME: else, so is single server d
    // ----------------------------------
    CLIENT_HOST: 'localhost', // 192.168.94.221
    CLIENT_PORT: process.env.PORT || 3000,
    CLIENT_NAME: '',

    // ----------------------------------
    // Server api Configuration
    // 部署服务器地址、端口和项目名称
    // 每次部署前，必须先确定这三个字段的值
    // example
    // SERVER_HOST: '192.168.1.31',
    // SERVER_PORT: 8031,
    // SERVER_NAME: 'analysis',
    // ----------------------------------
    SERVER_HOST: '192.168.1.207',
    SERVER_PORT: process.env.PORT || 3000,
    SERVER_NAME: '',
    // SERVER_API_FIX_PATH: '',

    // ----------------------------------
    // Compiler Configuration
    // COMPILER_PUBLIC_PATH: DEV OR PRO
    // COMPILER_OUT_PATH: DEV OR PRO
    // ----------------------------------
    COMPILER_DEVTOOL: 'cheap-module-eval-source-map',
    COMPILER_HOST: '',
    COMPILER_PORT: '',
    COMPILER_NAME: '',
    COMPILER_HASH_TYPE: '',
    COMPILER_PUBLIC_PATH: '',
    COMPILER_OUT_PATH: ''
};

// ========================================================
// environment Configuration
// ========================================================
const envConfigs = Object.assign(
    {},
    {...defaultConfig},
    {
        ...environments[defaultConfig.env](defaultConfig)// assign environments variable
    }
);

// ========================================================
// calc assign object path Configuration
// ========================================================
const assignPath = (...arg) => {

    return path.resolve(...arg);

};

// ========================================================
// Configs Configuration
// ========================================================
// debug(`Looking for environment overrides for NODE_ENV "${defaultConfig.env}".`);
const configs = Object.assign(
    {},
    {...envConfigs},
    {
        globals: {
            'process.env': {
                NODE_ENV: JSON.stringify(defaultConfig.env)
            },
            'NODE_ENV': JSON.stringify(defaultConfig.env),
            '__DEV__': defaultConfig.env === 'development',
            '__PROD__': defaultConfig.env === 'production',
            '__BASENAME__': JSON.stringify(envConfigs.COMPILER_NAME)
        },
        paths: {
            assignPath,
            client: assignPath(envConfigs.DIR_BASE_PATH, envConfigs.DIR_CLIENT),
            public: assignPath(envConfigs.DIR_BASE_PATH, envConfigs.DIR_PUBLIC),
            dist: assignPath(envConfigs.DIR_BASE_PATH, envConfigs.DIR_DIST, envConfigs.COMPILER_NAME)
        }
    }
);
debug('Configs Configuration is success');

module.exports = configs;
