/**
 *@Author: hy-zhangb
 *Date: 2018/7/6 16:44
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/6 16:44
 *Email: lovewinders@163.com
 *File Path: data - index
 *@File Name: index
 *@Description: Description
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// components
import Dragger from './Dragger';
import HcUpload from './HcUpload';
import UploadList from './UploadList';

import { fileToObject, getFileItem, removeFileItem } from './utils';

// css
import './style.scss';

// Upload
class Upload extends Component {
    static Dragger = Dragger;
    static propTypes = {
        type: PropTypes.oneOf(['drag', 'select']),
        prefixCls: PropTypes.string,
        className: PropTypes.string,
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
        type: 'select',
        prefixCls: 'hc-upload',
        className: '',
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
        this.state = {
            fileList: props.fileList || props.defaultFileList || [],
            dragState: 'drop'
        };
        this.onFileDrop = this.onFileDrop.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.toRenderChildren = this.toRenderChildren.bind(this);
        this.progressTimer = null;

    }
    onFileDrop(e) {

        this.setState({
            dragState: e.type
        });

    }
    onStart(file) {

        let targetItem;
        let nextFileList = this.state.fileList.concat();
        targetItem = fileToObject(file);
        targetItem.status = 'uploading';
        nextFileList.push(targetItem);
        this.onChange({
            file: targetItem,
            fileList: nextFileList
        });
        // fix ie progress
        if(!window.FormData) {

            // this.autoUpdateProgress(0, targetItem);

        }

    }
    onSuccess(response, file) {

        this.clearProgressTimer();
        try {

            if(typeof response === 'string') {

                response = JSON.parse(response);

            }

        } catch (e) { /* do nothing */
        }
        let fileList = this.state.fileList;
        let targetItem = getFileItem(file, fileList);
        // removed
        if(!targetItem) {

            return;

        }
        targetItem.status = 'done';
        targetItem.response = response;
        this.onChange({
            file: { ...targetItem },
            fileList
        });
        console.log('onSuccess--->', fileList);

    }
    onProgress(e, file) {

        let fileList = this.state.fileList;
        let targetItem = getFileItem(file, fileList);
        // removed
        if(!targetItem) {

            return;

        }
        targetItem.percent = e.percent;
        this.onChange({
            event: e,
            file: { ...targetItem },
            fileList: this.state.fileList
        });
        console.log('onProgress--->', e.percent);

    }
    onError(error, response, file) {

        this.clearProgressTimer();
        let fileList = this.state.fileList;
        let targetItem = getFileItem(file, fileList);
        // removed
        if(!targetItem) {

            return;

        }
        targetItem.error = error;
        targetItem.response = response;
        targetItem.status = 'error';
        this.onChange({
            file: { ...targetItem },
            fileList
        });
        console.log('onError--->', fileList);

    }
    onChange(info) {

        if(!('fileList' in this.props)) {

            this.setState({ fileList: info.fileList });

        }

        const { onChange } = this.props;
        if(onChange) {

            onChange(info);

        }

    }
    clearProgressTimer() {

        this.progressTimer && clearInterval(this.progressTimer);

    }
    toRenderChildren() {

        const {children, type} = this.props;
        const {fileList} = this.state;
        return fileList.length
            ? <UploadList
                items={fileList}
            />
            : children;

    }
    render() {

        const {children, prefixCls, className, type, disabled} = this.props;

        // base props
        const hcUploadProps = {
            onStart: this.onStart,
            onError: this.onError,
            onProgress: this.onProgress,
            onSuccess: this.onSuccess,
            ...this.props
        };

        // 基础事件
        const basePointer =
            {
                onDrop: (event) => {

                    this.onFileDrop(event);

                },
                onDragOver: (event) => {

                    this.onFileDrop(event);

                },
                onDragLeave: (event) => {

                    this.onFileDrop(event);

                }
            };

        // drag render
        if(type === 'drag') {

            const dragCls = classNames({
                [prefixCls]: true,
                [`${prefixCls}-${type}`]: true,
                [className]: !!className,
                'hc-upload-drag-over': type === 'drag' && this.state.dragState === 'dragover'
            });
            return (
                <div
                    {...basePointer}
                    className={dragCls}
                >
                    <HcUpload
                        {...hcUploadProps}
                    >
                        {this.toRenderChildren()}
                    </HcUpload>
                </div>
            );

        }

        // btn render
        const btnCls = classNames({
            [prefixCls]: true,
            [`${prefixCls}-${type}`]: true,
            [className]: !!className,
            [`${prefixCls}-disabled`]: disabled
        });
        const uploadBtn = (
            <HcUpload
                {...hcUploadProps}
            />
        );

        return (
            <div
                {...basePointer}
                className={btnCls}
            >
                {uploadBtn}
                {this.toRenderChildren()}
            </div>
        );

    }
}

export default Upload;
