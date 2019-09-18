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

import Upload from 'src/components';

const {Dragger} = Upload;

class App extends Component {
    constructor(props, context) {

        super(props, context);

    }
    handleUploadSuccess = () => {

    };
    handleUploadError = () => {

    };
    render() {

        return (
            <div>
                <div style={{height: '200px'}}>
                    <Dragger
                        headers={{Authorization: localStorage.getItem('token')}}
                        action={'http://192.168.1.207:4000/hysightdata/dataset/project/484/file'}
                        accept={'application/vnd.ms-excel'}
                        onChange={(info) => this.handleUploadSuccess(info)}
                        onError={(err, res, file) => this.handleUploadError(err, res, file)}
                    />
                </div>
                <div>
                    <Upload
                        headers={{Authorization: localStorage.getItem('token')}}
                        action={'http://192.168.1.207:4000/hysightdata/dataset/project/484/file'}
                        accept={'application/vnd.ms-excel'}
                        onChange={(info) => this.handleUploadSuccess(info)}
                        // onError={(err, res, file) => this.handleUploadError(err, res, file)}
                    >
                        <button type={'button'}>测试上传</button>
                    </Upload>
                </div>
            </div>
        );

    }
}

export default App;
