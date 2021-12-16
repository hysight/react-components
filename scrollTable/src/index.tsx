/*** 
 * @Author: zhangb
 * @Date: 2021-05-12 11:05:51
 * @Email: lovewinders@163.com
 * @LastEditors: zhangbao
 * @LastEditTime: 2021-12-16 14:17:05
 * @FilePath: /react-components/scrollTable/src/index.tsx
 * @Description: 
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
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
