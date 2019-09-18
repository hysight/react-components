/**
 *@Author: hy-zhangb
 *Date: 2018/7/11 11:33
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/11 11:33
 *Email: lovewinders@163.com
 *File Path: data - UploadList
 *@File Name: UploadList
 *@Description: Description
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Progress from '@hysight/progress';

// css
import './style.scss';

// UploadList
class UploadList extends Component {
    static propTypes = {
        items: PropTypes.array,
        progressAttr: PropTypes.object
    };
    static defaultProps = {
        items: [],
        progressAttr: {
            strokeWidth: 2,
            showInfo: false
        }
    };
    constructor(props, context) {

        super(props, context);
        this.toRenderList = this.toRenderList.bind(this);

    }
    toRenderList() {

        const {items, progressAttr} = this.props;
        return items && items.map((v, i) => {

            // console.log('vvvvvv', v);
            let progress;
            if(v.status === 'uploading') {

                progress = (
                    <Progress percent={v.percent} {...progressAttr} />
                );

            }
            return (
                <div className={'hc-upload-list'} key={`hc-upload-list-${v.uid}`}>
                    <p>{i + 1}-{v.name}</p>
                    {progress}
                </div>
            );

        });

    }
    render() {

        return (
            <div className={'upload-drag-container'}>
                {this.toRenderList()}
            </div>
        );

    }
}

export default UploadList;
