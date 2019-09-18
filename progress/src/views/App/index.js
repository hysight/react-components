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

import Progress from 'src/components';

class App extends Component {
    constructor(props, context) {

        super(props, context);

    }
    render() {

        return (
            <div>
                <Progress
                    status={'success'}
                    percent={12}
                />
                <Progress
                    status={'active'}
                    percent={12}
                />
            </div>
        );

    }
}

export default App;
