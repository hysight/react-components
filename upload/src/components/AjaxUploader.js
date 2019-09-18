/**
 *@Author: hy-zhangb
 *Date: 2018/7/9 14:38
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/9 14:38
 *Email: lovewinders@163.com
 *File Path: data - AjaxUploader
 *@File Name: AjaxUploader
 *@Description: Description
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {_UUID} from 'src/utils/tools';
import defaultRequest from './request';
import attrAccept from './attr-accept';

// css
import './style.scss';

// AjaxUploader
console.log('2321323', _UUID());
class AjaxUploader extends Component {
    static propTypes = {
        children: PropTypes.any,
        prefixCls: PropTypes.string,
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
    constructor(props, context) {

        super(props, context);
        this.state = {
            uid: _UUID()
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onFileDrop = this.onFileDrop.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.upload = this.upload.bind(this);
        this.saveFileInput = this.saveFileInput.bind(this);

    }
    componentDidMount() {

        this._isMounted = true;

    }

    componentWillUnmount() {

        this._isMounted = false;
        // this.abort();

    }
    reqs = {};
    onChange(e) {

        const files = e.target.files;
        this.uploadFiles(files);
        this.reset();

    }
    onClick(event) {

        const el = this.fileInput;
        if(!el) {

            return;

        }
        el.click();

    }

    onKeyDown(e) {

        if(e.key === 'Enter') {

            this.onClick();

        }

    }
    onFileDrop(e) {

        e.preventDefault();

        if(e.type === 'dragover') return;

        console.log('files--old-->', e.dataTransfer.files);
        const files = Array.prototype.slice.call(e.dataTransfer.files).filter(
            file => attrAccept(file, this.props.accept)
        );
        this.uploadFiles(files);
        console.log('files--new-->', files);

    }
    uploadFiles(files) {

        const postFiles = Array.prototype.slice.call(files);
        postFiles.forEach((file) => {

            file.uid = _UUID();
            this.upload(file, postFiles);

        });

    }
    upload(file, fileList) {

        const { props } = this;
        if(!props.beforeUpload) {

            // always async in case use react state to keep fileList
            return setTimeout(() => this.post(file), 0);

        }

        const before = props.beforeUpload(file, fileList);
        if(before && before.then) {

            before.then((processedFile) => {

                const processedFileType = Object.prototype.toString.call(processedFile);
                if(processedFileType === '[object File]' || processedFileType === '[object Blob]') {

                    return this.post(processedFile);

                }
                return this.post(file);

            }).catch(e => {

                console && console.log(e); // eslint-disable-line

            });

        } else if(before !== false) {

            setTimeout(() => this.post(file), 0);

        }

    }
    post(file) {

        if(!this._isMounted) {

            return;

        }
        const { props } = this;
        let { data } = props;
        const { onStart, onProgress } = props;
        if(typeof data === 'function') {

            data = data(file);

        }
        new Promise(resolve => {

            const { action } = props;
            if(typeof action === 'function') {

                return resolve(action(file));

            }
            resolve(action);

        }).then(action => {

            const { uid } = file;
            const request = props.customRequest || defaultRequest;
            this.reqs[uid] = request({
                action,
                filename: props.name,
                file,
                data,
                headers: props.headers,
                withCredentials: props.withCredentials,
                onProgress: onProgress ? e => {

                    console.log(e, file);
                    onProgress(e, file);

                } : null,
                onSuccess: (ret, xhr) => {

                    delete this.reqs[uid];
                    props.onSuccess(ret, file, xhr);

                },
                onError: (err, ret) => {

                    delete this.reqs[uid];
                    props.onError(err, ret, file);

                }
            });
            onStart(file);

        });

    }
    reset() {

        this.setState({
            uid: _UUID()
        });

    }
    saveFileInput(node) {

        this.fileInput = node;

    }

    render() {

        const {children, prefixCls, component: Tag, accept, multiple} = this.props;
        // 基础事件
        const basePointer =
            {
                onClick: (event) => {

                    this.onClick(event);

                },
                onDrop: (event) => {

                    /* event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                    const {files} = event.originalEvent.dataTransfer;
                    console.log(event, files);*/
                    this.onFileDrop(event);

                },
                onDragOver: (event) => {

                    this.onFileDrop(event);

                }
            };
        return (
            <Tag
                {...basePointer}
                className={`${prefixCls} ${`${prefixCls}-btn`}`}
                role={'button'}
            >
                <input
                    type='file'
                    ref={this.saveFileInput}
                    key={this.state.uid}
                    style={{display: 'none'}}
                    accept={accept}
                    multiple={multiple}
                    onChange={this.onChange}
                />
                {children}
            </Tag>
        );

    }
}

export default AjaxUploader;
