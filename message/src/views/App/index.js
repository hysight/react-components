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

import message from 'src/components';

class App extends Component {
    render() {

        return (
            <div style={{width: 500, margin: 100}}>
                <button onClick={() => message.success('hello, world')} >click</button>
            </div>
        );

    }
}

export default App;
