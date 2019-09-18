/**
 *@Author: hy-zhangb
 *Date: 2018/6/20 15:00
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/6/20 15:00
 *Email: lovewinders@163.com
 *File Path: hysight-buttons - index
 *@File Name: index
 *@Description: Description
 */
// react
import React from 'react';
import { render } from 'react-dom';

import Buttons from 'src';

render(
    <Buttons
        type={'danger'}
        size={'small'}
        shape={'circle'}
        onClick={() => console.log(1)}
    >
        删除
    </Buttons>,
    document.querySelector('#App')
);