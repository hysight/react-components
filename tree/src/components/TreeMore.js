/**
 *@Author: hy-zhangb
 *Date: 2018/6/26 13:22
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/6/26 13:22
 *Email: lovewinders@163.com
 *File Path: tree - TreeMore
 *@File Name: TreeMore
 *@Description: Description
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// css
import './style.scss';

// TreeMore
class TreeMore extends Component {
    static propTypes = {
        onClick: PropTypes.func
    };
    render() {

        const { onClick } = this.props;
        // 基础事件
        const basePointer =
            {
                onClick: (event) => {

                    onClick && onClick(event);

                }
            };

        return (
            <span
                {...basePointer}
                className='hy-fr icon iconfont icon-gengduo'
            />
        );

    }
}

export default TreeMore;
