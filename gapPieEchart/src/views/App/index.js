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

// components
import GapPieEchart from 'src/components';
// options
import Option from './circleOption';

// css
import './style.scss';

class App extends Component {
    render() {

        return (
            <div style={{width: 500, height: 500}}>
                <GapPieEchart
                    option={Option}
                    splitItemNum={150}
                />
            </div>
        );

    }
}

export default App;
