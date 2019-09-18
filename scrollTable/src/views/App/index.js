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

import ScrollTable from 'src/components';

import LevelCellGrid from 'src/views/App/LevelCellGrid';

const {LevelScroll} = ScrollTable;

class App extends Component {
    constructor(props, context) {

        super(props, context);

    }
    render() {

        return (
            <div>
                <ScrollTable
                    // scrollSpeed='linear'
                    scrollSpeed='ease'
                    scrollTime={1000}
                    scrollHeight={54}
                    scrollRows={5}
                    delayTime={2000}
                >
                    <LevelCellGrid
                        data={[
                            { column: ['张子鑫', ['值班主任', '13323450987']] },
                            { column: ['王强', ['警员1', '13565347765']] },
                            { column: ['宋涛', ['警员2', '18622354321']] },
                            { column: ['朱洪', ['警员3', '18901239805']] },
                            { column: ['毛艺亿', ['警员4', '13542767770']] },
                            { column: ['曾晓明', ['警员5', '15000980241']] },
                            { column: ['卢洪涛', ['警员6', '15543284321']] },
                            { column: ['李秀凯', ['警员7', '13326544453']] },
                            { column: ['张一鸣', ['警员8', '13498723724']] },
                            { column: ['王强', ['警员9', '13565347765']] },
                            { column: ['宋涛', ['警员10', '18622354321']] },
                            { column: ['朱洪', ['警员11', '18901239805']] },
                            { column: ['毛艺亿', ['警员12', '13542767770']] },
                            { column: ['曾晓明', ['警员13', '15000980241']] },
                            { column: ['卢洪涛', ['警员14', '15543284321']] },
                            { column: ['李秀凯', ['警员15', '13326544453']] },
                            { column: ['张一鸣', ['警员16', '13498723724']] },
                            { column: ['张子鑫', ['警员17', '13323450987']] }
                        ]}
                        colDirection={['center', 'between']}
                        colWidth={['30%', '70%']}
                        rowHeight={'54px'}
                    />
                </ScrollTable>
                <LevelScroll
                    // scrollSpeed='linear'
                    scrollDirection={'left'}
                    scrollSpeed='ease'
                    scrollTime={10000}
                    scrollHeight={54}
                    scrollRows={5}
                    delayTime={1000}
                >
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费1</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费2</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费3</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费4</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费5</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费6</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费7</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费8</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费9</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费10</span>
                    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费11</span>
                </LevelScroll>
            </div>
        );

    }
}

export default App;
