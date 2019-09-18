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

import Buttons from 'src/components';

class App extends Component {
    render() {

        return (
            <div>
                <Buttons
                    type={'default'}
                    size={'small'}
                    shape={'default'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'primary'}
                    size={'small'}
                    shape={'circle'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'danger'}
                    size={'small'}
                    shape={'circle'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'primary'}
                    size={'middle'}
                    shape={'circle'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'danger'}
                    size={'middle'}
                    shape={'circle'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'primary'}
                    size={'large'}
                    shape={'circle'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'danger'}
                    size={'large'}
                    shape={'circle'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'primary'}
                    size={'small'}
                    shape={'default'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'danger'}
                    size={'small'}
                    shape={'default'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'primary'}
                    size={'middle'}
                    shape={'default'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'danger'}
                    size={'middle'}
                    shape={'default'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'primary'}
                    size={'large'}
                    shape={'default'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
                <Buttons
                    type={'danger'}
                    size={'large'}
                    shape={'default'}
                    onClick={() => console.log(1)}
                >
                    删除
                </Buttons>
            </div>
        );

    }
}

export default App;
