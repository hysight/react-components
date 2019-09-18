/**
 *@Author: hy-zhangb
 *Date: 2018/9/6 16:01
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/9/6 16:01
 *Email: lovewinders@163.com
 *File Path: fetch - api
 *@File Name: api
 *@Description: Description
 */
'use strict';
// development
const development = {
    ip: 'http://192.168.1.207',
    port: 84
};
// production
const production = {
    ip: '',
    port: ''
};
const baseUrl = process.env.NODE_ENV === 'development'
    ? development.ip + ':' + development.port
    : production.ip + ':' + production.port;
const config = process.env.NODE_ENV === 'development' ? development : production;
export default Object.assign({}, {...config}, {baseUrl});
