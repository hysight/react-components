/**
 *@Author: hy-zhangb
 *Date: 2018/6/20 15:23
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/6/20 15:23
 *Email: lovewinders@163.com
 *File Path: hysight-buttons - index
 *@File Name: index
 *@Description: Description
 */
import React, { Component } from 'react';

import Fetch from 'src/components';

import api from 'src/utils/api';

console.log(1);
console.log(1);
console.log(1);
console.log(1);
console.log(api);
Fetch().default.credentials = 'omit'; // omit
Fetch().default.minorUrl = (url) => {

    console.log('测试', url);
    return url.replace(/\{version\}/g, 'v1');

};
Fetch().default.baseUrl = (url) => {

    // return 'http://192.168.1.207:4024';
    console.log('-=-=', Fetch());
    return process.env.NODE_ENV === 'development'
        ? Fetch().use([
            Fetch().proxy(url)('^/xearth', {
                target: 'https://crisisresponse.tihal.cn'
            }),
            Fetch().proxy(url)('^/api/v1/file/upload', {
                target: 'http://192.168.94.118:8081'
            }),
            Fetch().proxy(url)('^/curvemap', {
                target: 'http://192.168.1.202:8722'
            })
            // proxy(url)('^.*', {
            //     target: api.baseUrl
            // })
        ], api.baseUrl)
        : api.baseUrl;

};
Fetch().default.headers['Content-Type'] = 'application/json';
Fetch().default.headers['X-Token'] = localStorage.getItem('token');
// Fetch().default.timeout = 2000;
console.log(1);
console.log(1);
console.log(1);
console.log(1);
console.log(1);
console.log(1);
Fetch().interceptors.request = function(config) {

    console.log(1);
    console.log(1);
    console.log(1);
    console.log(1);
    return config;

};
Fetch().interceptors.response = function(response) {

    const result = {};
    switch (response.status) {

    case 0:
        console.log(result.msg);
        break;
    case -100:
        console.log(result.msg);
        window.location.href = '/login';
        localStorage.clearItem('token');
        return result;
    case -101:
        console.log(result.msg);
        window.location.href = '/login';
        localStorage.clearItem('token');
        return result;
    case -102:
        console.log(result.msg);
        window.location.href = '/login';
        localStorage.clearItem('token');
        return result;
    case -103:
        console.log(result.msg);
        window.location.href = '/login';
        localStorage.clearItem('token');
        return result;
    case -200:
        console.log('用户权限不足');
        return result;
    case 504:
        console.log('网络超时啊 啊啊 啊');
        return response;
    default:
        return response;

    }

};

class App extends Component {
    componentDidMount() {

        this.handleFetch();
        this.handleFetch2();
        this.handleFetch3();

    }
    handleFetch() {

        const url = '/xearth/login/get-my-captcha?a=1';
        Fetch(url/* , {
            method: 'GET',
            params: {
                b: 2,
                c: 3
            },
            data: {
                aa: 11
            }
        }*/).then((res) => {

            console.log(res);

        });

    }
    handleFetch2() {

        const url = '/xearth/user/index?bbb=333';// /{version}
        Fetch(url, {
            method: 'POST',
            params: {
                b: 2,
                c: 3
            },
            data: {
                aa: 11
            }
        }).then((res) => {

            console.log(res);

        });

    }
    handleFetch3() {

        const userInfo = {
            username: 'admin',
            password: '123456'
        };

        const Url = '/hymodel/home/login';
        // let Url = '/hymodel/home/login';

        Fetch(Url, {
            method: 'POST',
            data: userInfo,
            headers: {
                Authorization: null,
                'Content-Type': 'application/json'
            },
            // timeout: 12000
        }).then(res => {

            console.log('请求成功', res);

        }).catch(error => {

            console.log(`请求失败3242432432：${error}`, error);

        });


    }
    handleFetch4(event) {

        console.log('shangchuan', event, event.target.files);
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        // let Url = '/api/v1/file/upload';
        const Url = 'http://192.168.94.210:8081/api/v1/file/upload';

        fetch(Url, {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'X-Token': 'AUTH_HEADER eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJTcHJpbmdTZWN1cml0eUp3dCIsInN1YiI6ImFkbWluIiwiYXVkIjoid2ViIiwiaWF0IjoxNTQxNzI3OTM2LCJleHAiOjE1NDE3NTc5MzZ9.9yYDfm8MMkHFvRzahf2fl1eYrpuDM5EQwpEO2A-AHhlc_J31YQTb0YBIVa_K0PN9WlIcZfDwoV5Z5VHX9AA3Bw'
            }
        }).then(res => {

            console.log('rewerewr', res);
            return res.json();

        });

    }
    handleFetch5(event) {

        console.log('shangchuan', event, event.target.files);
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('flag', '0');
        const Url = '/curvemap.studio.service/file/upload';
        // let Url = 'http://192.168.1.202:8722/curvemap.studio.service/file/upload';
        const formData2 = {
            file: event.target.files[0],
            flag: '0'
        };

        Fetch(Url, {
            method: 'POST',
            data: formData2,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'authorization': '8e0ac1ff4b07435faaa805499d429a36_07f1b38e87124bab85637032e34803e4'
            }
        }).then(res => {

            console.log('rewerewr', res);

        });

    }
    render() {

        return (
            <div style={{width: 500, margin: 100}}>
                <button>click</button>
                <input type={'file'} onChange={this.handleFetch4} />
            </div>
        );

    }
}

export default App;
