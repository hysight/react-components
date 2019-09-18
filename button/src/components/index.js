/**
 *@Author: hy-zhangb
 *Date: 2018/5/22 16:45
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/5/22 16:45
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - index
 *@File Name: index
 *@Description: Description
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// css
import './style.scss';

// Button
class Button extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        type: PropTypes.oneOf(['default', 'primary', 'danger']),
        size: PropTypes.oneOf(['default', 'small', 'middle', 'large']),
        shape: PropTypes.oneOf(['default', 'circle']),
        onClick: PropTypes.func
    };

    render() {

        const {
            children,
            type = 'default',
            size = 'small',
            shape = 'default',
            onClick = null
        } = this.props;
        return (
            <button
                className={`hc-button hc-button-theme-${type} hc-button-size-${size} hc-button-shape-${shape}`}
                onClick={onClick}
            >
                {children}
            </button>
        );

    }
}

export default Button;
