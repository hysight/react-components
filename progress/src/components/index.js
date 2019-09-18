/**
 *@Author: hy-zhangb
 *Date: 2018/7/11 12:01
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/11 12:01
 *Email: lovewinders@163.com
 *File Path: data - index
 *@File Name: index
 *@Description: Description
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// css
import './style.scss';
// class
class Progress extends PureComponent {
    static propTypes = {
        status: PropTypes.oneOf(['normal', 'active', 'exception', 'success']),
        percent: PropTypes.number,
        format: PropTypes.func,
        strokeWidth: PropTypes.number,
        showInfo: PropTypes.bool
    };
    static defaultProps = {
        status: 'normal',
        percent: 0,
        format: percent => `${percent}%`,
        strokeWidth: 15,
        showInfo: true
    };
    renderProgressText = () => {

        const {status, percent, format, showInfo} = this.props;
        const statusText = {
            success: <i className='icon icon-chenggong hy-color-green' />,
            exception: <i className='icon icon-clear hy-color-red' />,
            normal: format(percent),
            active: format(percent)
        };

        return showInfo ? <span className='progress-text'>{statusText[status]}</span> : null;

    };
    render() {

        const {status, percent, strokeWidth, showInfo} = this.props;
        const cls = classNames({
            'hc-progress-bar': true,
            'progress-bar-show-info': showInfo,
            [`progress-bar-status-${status}`]: true
        });
        return (
            <div className={cls}>
                <div className='progress-outer'>
                    <div className='progress-inner'>
                        <div className='progress-bg' style={{width: `${percent}%`, height: `${strokeWidth}px`}} />
                    </div>
                </div>
                {this.renderProgressText()}
            </div>
        );

    }
}
export default Progress;
