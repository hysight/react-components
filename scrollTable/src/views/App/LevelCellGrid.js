/**
 *@Author: hy-zhangb
 *Date: 2018/7/17 16:26
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/17 16:26
 *Email: lovewinders@163.com
 *File Path: scrollTable - LevelCellGrid
 *@File Name: LevelCellGrid
 *@Description: Description
 */
// react
import React, { PureComponent } from 'react';
// css
import './LevelCellGrid.scss';
// class
class LevelCellGrid extends PureComponent {
    constructor(props) {

        super(props);

    }
    toRenderRow = () => {

        const {data, rowHeight = '27px'} = this.props;
        return (
            <ul>
                {
                    data.map((v, i) => {

                        return (
                            <li key={`grid-row${i}`} style={{height: rowHeight, lineHeight: rowHeight}}>
                                {this.toRenderCell(v.column)}
                            </li>
                        );

                    })
                }
            </ul>
        );

    };
    toRenderCell = (column) => {

        const {colDirection, colWidth} = this.props;
        return (
            <div className='grid-group'>
                {
                    column.map((w, j) => {

                        const isArr = Object.prototype.toString.call(w);

                        return (
                            <div className={colDirection[j] ? `${colDirection[j]} ` + 'grid-cell' : 'grid-cell'} key={`grid-cell${j}`} style={{width: colWidth[j]}}>
                                {
                                    isArr === '[object Array]' ? w.map((z, k) => <span className='grid-cell-col' key={`grid-cell-col${k}`}>{z}</span>) : w
                                }
                            </div>
                        );

                    })
                }
            </div>
        );

    };
    render() {

        return (
            <div className='hc-level-cell-grid'>
                {this.toRenderRow()}
            </div>
        );

    }
}
export default LevelCellGrid;
