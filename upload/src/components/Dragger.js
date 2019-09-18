/**
 *@Author: hy-zhangb
 *Date: 2018/7/9 11:51
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/9 11:51
 *Email: lovewinders@163.com
 *File Path: data - Dragger
 *@File Name: Dragger
 *@Description: Description
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HcUpload from './index';

// css
import './style.scss';

// Dragger
class Dragger extends Component {
    static propsTypes = {
        children: PropTypes.any,
        component: PropTypes.string,
        name: PropTypes.string,
        action: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),
        data: PropTypes.object,
        headers: PropTypes.object,
        multiple: PropTypes.bool,
        accept: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        withCredentials: PropTypes.bool
    };
    static defaultProps = {
        component: 'span',
        name: 'file',
        action: '',
        data: {},
        headers: {},
        multiple: false,
        // accept: '',
        disabled: false,
        withCredentials: false
    };
    render() {

        const {children} = this.props;
        return (
            <HcUpload
                {...this.props}
                type={'drag'}
            >
                {
                    children ||
                    <div className={'upload-drag-container'}>
                        <p className={'upload-text'}><a>点击上传文件</a> 或 拖拽上传文件</p>
                    </div>
                }
            </HcUpload>
        );

    }
}

export default Dragger;
