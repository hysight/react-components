/**
 *@Author: hy-zhangb
 *Date: 2018/7/9 15:06
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/9 15:06
 *Email: lovewinders@163.com
 *File Path: data - Upload
 *@File Name: Upload
 *@Description: Description
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import AjaxUploader from './AjaxUploader';

// css
import './style.scss';

// HcUpload
class HcUpload extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['drag', 'select']),
        prefixCls: PropTypes.string,
        // children: PropTypes.any,
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
        type: 'select',
        prefixCls: 'hc-upload',
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
    constructor(props, context) {

        super(props, context);
        this.getComponent = this.getComponent.bind(this);

    }
    getComponent() {

        // 目前只设置ajax上传方式，后续可以扩展IframeUpload
        return AjaxUploader;

    }
    render() {

        const ComponentUploader = this.getComponent();
        return <ComponentUploader {...this.props} />;

    }
}

export default HcUpload;
