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
import { BrowserRouter } from 'react-router-dom';

import Back from 'src/components';

class A extends Component {
    render() {

        return (
            <span>返回标题-组件</span>
        );

    }
}

class App extends Component {
    constructor(props, context) {

        super(props, context);

    }
    render() {

        return (
            <BrowserRouter>
                <div>
                    <Back />
                    <br />
                    <Back
                        title={'返回标题'}
                    />
                    <br />
                    <Back
                        title={<A />}
                    />
                    <br />
                    <Back
                        size={'middle'}
                        title={<A />}
                    />
                    <br />
                    <Back
                        size={'large'}
                        title={<A />}
                    />
                    <br />
                    <Back
                        size={'large'}
                        title={<A />}
                        href={'/home'}
                    />
                    <br />
                    <Back
                        size={'large'}
                        title={<A />}
                        path={'/home'}
                    />
                </div>
            </BrowserRouter>
        );

    }
}

export default App;
