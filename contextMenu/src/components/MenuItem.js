/**
 *@Author: hy-zhangb
 *Date: 2018/6/11 17:29
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/6/11 17:29
 *Email: lovewinders@163.com
 *File Path: data - MenuItem
 *@File Name: MenuItem
 *@Description: Description
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// css
import './style.scss';

// MenuItem
class MenuItem extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.array
        ]),
        onClick: PropTypes.func,
        closeContextMenu: PropTypes.func
    };

    render() {

        const {children, onClick, closeContextMenu, ...props} = this.props;

        // 基础事件
        const basePointer =
            {
                onClick: (event) => {

                    closeContextMenu && closeContextMenu(event);
                    onClick && onClick(event);

                }
            };
        return (
            <li className={'hc-context-menu-item'} {...props} {...basePointer}>{children}</li>
        );

    }
}

export default MenuItem;
