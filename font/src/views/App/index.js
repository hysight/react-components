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

import "src/components/style.scss";

class App extends Component {
    render() {

        return (
            <div>
                <span className={'hyfont-40s'}>汉仪旗黑字体样式1234ABCD</span>
                <br />
                <span className={'hyfont-60s'}>汉仪旗黑字体样式1234ABCD</span>
                <br />
                <span className={'hyfont'}>数据源名称</span>
                <br />
                <span>汉仪旗黑字体样式1234ABCD</span>
                <br />
                <span className={'hyfont3'}>汉仪旗黑字体样式1234ABCD</span>
            </div>
        );

    }
}

export default App;
