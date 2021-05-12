/*** 
 * @Author: zhangb
 * @Date: 2021-05-12 11:05:50
 * @Email: lovewinders@163.com
 * @LastEditors: zhangbao
 * @LastEditTime: 2021-05-12 13:40:24
 * @FilePath: /fetch/src/index.js
 * @Description: 
 */
// import 'babel-polyfill';
// import 'whatwg-fetch';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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
