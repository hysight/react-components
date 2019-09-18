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

import Search from 'src/components';

class App extends Component {
    render() {

        return (
            <div>
                <Search
                    size={'middle'}
                    shape={'gray'}
                    style={{ width: '100%' }}
                    placeholder={'输入关键词搜索'}
                    onChange={(e) => console.log(e)}
                    onPressEnter={(e) => console.log(e)}
                />
            </div>
        );

    }
}

export default App;
