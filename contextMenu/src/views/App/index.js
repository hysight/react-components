/**
 *@Author: hy-zhangb
 *Date: 2018/6/20 15:23
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-09-03 12:56:30
 *Email: lovewinders@163.com
 *File Path: hysight-buttons - index
 *@File Name: index
 *@Description: Description
 */
import React, { Component } from 'react';

import { Select } from 'antd';

import ContextMenu from 'src/components';
import Modal from './Modal';

const {MenuItem} = ContextMenu;

const Option = Select.Option;

var forwardRef;

class App extends Component {
    componentDidMount() {
        setTimeout(() => {
            forwardRef.current.closeContextMenu()
        }, 3000);
    }
    render() {

        forwardRef = React.createRef();
        return (
            <div>
                <ContextMenu
                    className={'123 455'}
                    ref={forwardRef}
                    eventTrigger={['onClick', 'onContextMenu']}
                    isMaskLayer={false}
                    render={(props) => {

                        console.log(111, props);
                        return (
                            <span
                                className={'hm-table-plus'}
                            >
                                点击弹出
                            </span>
                        );

                    }}

                >
                    <MenuItem onClick={() => console.log(1)} >测试1</MenuItem>
                    <MenuItem onClick={() => console.log(1)} >测试2</MenuItem>
                    <MenuItem>
                        <a target={'_blank'} href={'http://www.baidu.com'}>下载</a>
                    </MenuItem>
                </ContextMenu>
                <br />
                <ContextMenu
                    className={'666 777'}
                    eventTrigger={['onClick', 'onContextMenu']}
                    isMaskLayer={true}
                    render={(props) => {

                        console.log(222, props);
                        return (
                            <span
                                className={'hm-table-plus'}
                            >
                                点击弹出
                            </span>
                        );

                    }}

                >
                    <MenuItem onClick={() => console.log(1)} >测试1</MenuItem>
                </ContextMenu>
                <br />
                <ContextMenu
                    eventTrigger={['onClick', 'onContextMenu']}
                    isMaskLayer={true}
                    render={(props) => {

                        console.log(222, props);
                        return (
                            <span
                                className={'hm-table-plus'}
                            >
                                点击弹出
                            </span>
                        );

                    }}

                >
                    <Modal
                        title={'数据筛选'}
                        width={900}
                    >
                        <Select
                            defaultValue=''
                            style={{ width: 120, marginRight: 10 }}
                        >
                            <Option value='jack3'>字段1</Option>
                            <Option value='jack4'>字段2</Option>
                        </Select>
                    </Modal>
                </ContextMenu>
            </div>
        );

    }
}

export default App;
