/*
* @Author: zhangyujie
* @Date: 2017-05-16 10:27:16
* @Last Modified by: wangc
* @Last Modified time: 2018-04-03 15:26:02
* @Email: zhangyujie3344521@163.com
* @File Path: Machine-Learning - DsdBaseInfo
* @File Name: index.js
* @Descript:
*/
import 'babel-polyfill';
import 'whatwg-fetch';

import 'src/styles/reset.css';
import 'src/styles/index.scss';

// react
import React from 'react';
import { render } from 'react-dom';

// app
import App from 'src/views/App';

render(
    <App />,
    document.querySelector('#App')
);
