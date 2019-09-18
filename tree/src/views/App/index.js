/**
 *@Author: hy-zhangb
 *Date: 2018/6/20 15:23
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-09-03 10:46:28
 *Email: lovewinders@163.com
 *File Path: hysight-buttons - index
 *@File Name: index
 *@Description: Description
 */
import React, { Component } from 'react';
import ContextMenu from '@hysight/contextMenu';
// import ContextMenu from 'src/components/context';

import Tree from 'src/components';
import fetchUrl from 'src/utils/fetchUrl';

const {TreeNode, TreeMore} = Tree;

const {MenuItem} = ContextMenu;

class App extends Component {
    constructor(props, context) {

        super(props, context);
        this.state = {
            treeNodeData: []
        };
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onSelect = this.onSelect.bind(this);

    }

    componentDidMount() {

        // this.handleFetch();
        this.setState({
            treeNodeData: [
                {
                    treeId: 1,
                    treeName: '1111',
                    dataTreeType: 'DIR',
                    parentId: 0,
                    children: [
                        {
                            treeId: 11,
                            treeName: '11',
                            dataTreeType: '3',
                            parentId: 1
                        },
                        {
                            treeId: 12,
                            treeName: '12',
                            dataTreeType: '3',
                            parentId: 1
                        }
                    ]
                },
                {
                    treeId: 2,
                    treeName: '2222',
                    dataTreeType: 'DIR',
                    parentId: 0,
                    children: [
                        {
                            treeId: 21,
                            treeName: '21',
                            dataTreeType: '3',
                            parentId: 2
                        },
                        {
                            treeId: 22,
                            treeName: '22',
                            dataTreeType: '3',
                            parentId: 2
                        }
                    ]
                }
            ]
        });
        setTimeout(() => {
            // debugger;
            this.setState((state) => {
                // debugger;
                return ({
                    treeNodeData: [
                        ...state.treeNodeData,
                        {
                            treeId: 3,
                            treeName: '3333',
                            dataTreeType: 'DIR',
                            parentId: 0,
                            children: [
                                {
                                    treeId: 31,
                                    treeName: '31',
                                    dataTreeType: '4',
                                    parentId: 3
                                },
                                {
                                    treeId: 32,
                                    treeName: '32',
                                    dataTreeType: '4',
                                    parentId: 3
                                }
                            ]
                        }
                    ]
                })
            })
        }, 5000)

    }

    handleFetch() {

        // const url = 'http://192.168.1.207:4000/hysightdata/dataset/project/16ce8f13f6994abd9b3dc8fbde8caf7a/tree';
        // const url = 'http://192.168.1.207:4000/hysightdata/dataset/project/0e89d5595d254e6a828569420b767632/tree';
        const url = 'http://192.168.1.207:86/hysightdata/mydata/tree';

        fetchUrl(url).then((res) => {

            if(res.code === 0) {

                return;

            }

            this.setState({
                treeNodeData: res.result
            });

        });

    }

    onDragEnter(info) {

        console.log('onDragEnter---->', info);

    }

    onDrop(info) {

        console.log('onDrop---->', info);

        const {id: dropKey, pid: targetParentId, type: targetType} = info.node.props;
        const {id: dragKey, pid: sourceParentId, type: sourceType} = info.dragNode.props;
        // this.handleMoveFolder(dragKey, dropKey);
        // const dragNodesKeys = info.dragNodesKeys;
        const loop = (data, id, callback) => {

            data.forEach((item, index, arr) => {

                if(item.treeId === id) {

                    return callback(item, index, arr);

                }
                if(item.children) {

                    return loop(item.children, id, callback);

                }

            });

        };
        const data = [...this.state.treeNodeData];
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {

            arr.splice(index, 1);
            // dragObj = item;
            dragObj = Object.assign(
                {},
                {...item},
                {pid: info.dragOverGapTop || info.dragOverGapBottom ? targetParentId : dropKey});

        });
        if(info.dragOverGapTop) {

            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {

                ar = arr;
                i = index;

            });
            ar.splice(i, 0, dragObj);

        } else if(info.dragOverGapBottom) {

            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {

                ar = arr;
                i = index + 1;

            });
            ar.splice(i, 0, dragObj);

        } else {

            loop(data, dropKey, (item) => {

                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);

            });

        }
        this.setState({
            treeNodeData: data
        });

    }

    onSelect(selectedKeys, e) {

        console.log('都是非法链接', selectedKeys, e);

    }

    toRenderTreeNodes() {

        const loop = data => data.map((item) => {

            const {children, treeId, treeName, dataTreeType, parentId} = item;
            if(children && children.length) {

                // <TreeMore onClick={() => console.log(111)} />
                return (
                    <TreeNode
                        key={treeId}
                        title={treeName}
                        draggable={true}
                        isLeaf={dataTreeType !== 'DIR'}
                        isMore={dataTreeType === 'DIR'}
                        moreComponent={
                            <ContextMenu
                                eventTrigger={['onClick']}
                                render={() => <TreeMore />}
                            >
                                <MenuItem onClick={() => console.log(1)} >测试1</MenuItem>
                                <MenuItem onClick={() => console.log(2)} >测试2</MenuItem>
                                <MenuItem onClick={() => console.log(3)} >测试3</MenuItem>
                            </ContextMenu>
                        }
                        isPrefixIcon={false}
                        prefixIconComponent={
                            <ContextMenu
                                eventTrigger={['onClick']}
                                render={() => {

                                    return <TreeMore />;

                                }}
                            >
                                <MenuItem onClick={(event) => console.log(4, event)} >测试1</MenuItem>
                                <MenuItem onClick={() => console.log(5)} >测试2</MenuItem>
                                <MenuItem onClick={() => console.log(6)} >测试3</MenuItem>
                            </ContextMenu>
                        }
                        // iconDir={true}
                        // iconDir={['icon-shujubiao', 'icon-shujubiao1']}
                        // iconLeaf={true}
                        id={treeId}
                        pid={parentId}
                    >
                        {loop(children)}
                    </TreeNode>
                );

            }
            if(treeId === 11) return null;
            return (
                <TreeNode
                    key={treeId}
                    title={treeName}
                    isLeaf={dataTreeType !== 'DIR'}
                    draggable={true}
                    isMore={dataTreeType !== 'DIR'}
                    moreComponent={
                        <ContextMenu
                            eventTrigger={['onClick']}
                            render={() => {

                                return <TreeMore />;

                            }}
                        >
                            <MenuItem onClick={(event) => console.log(4, event)} >测试1</MenuItem>
                            <MenuItem onClick={() => console.log(5)} >测试2</MenuItem>
                            <MenuItem onClick={() => console.log(6)} >测试3</MenuItem>
                        </ContextMenu>
                    }
                    isPrefixIcon={true}
                    prefixIconComponent={
                        <ContextMenu
                            eventTrigger={['onClick']}
                            render={() => {

                                return <TreeMore />;

                            }}
                        >
                            <MenuItem onClick={(event) => console.log(4, event)} >测试1</MenuItem>
                            <MenuItem onClick={() => console.log(5)} >测试2</MenuItem>
                            <MenuItem onClick={() => console.log(6)} >测试3</MenuItem>
                        </ContextMenu>
                    }
                    // icon={type}
                    // iconDir={true}
                    // iconDir={['icon-shujubiao', 'icon-shujubiao1']}
                    iconLeaf={true}
                    id={treeId}
                    pid={parentId}
                />
            );

        });
        return (
            <Tree
                className='draggable-tree'
                autoExpandParent={true}
                defaultExpandAll={true}
                // expandedKeys={["1"]}
                // selectedKeys={['73']}
                draggable={true}
                disabledProviderEvents={false}
                iconEye={true}
                onDrop={this.onDrop}
                onRightClick={() => console.log('onRightClick')}
                onExpand={() => console.log('onExpand')}
                onSelect={this.onSelect}
                onDoubleClick={() => console.log(1)}
                onDragStart={(info) => console.log('onDragStart', info)}
                onDragEnter={this.onDragEnter}
                onDragOver={() => console.log('onDragOver')}
                onDragLeave={() => console.log('onDragLeave')}
                onDragEnd={() => console.log('onDragEnd')}
                onMoreClick={() => console.log('onMoreClick')}
                onEyeChange={(selectedEyeKey, {selected, node}) => console.log(selectedEyeKey, selected, node)}
            >
                {null}
                {loop(this.state.treeNodeData)}
                {/* {
                    [1, 2].map(v => {
                        if(v === 1) {
                            return (
                                <TreeNode
                                    key={'treeId'}
                                    title={'treeName'}
                                />
                            )
                        }
                        return null;
                    })
                } */}
            </Tree>
        );

    }
    render() {

        const {treeNodeData} = this.state;
        if(!treeNodeData.length) {

            return null;

        }
        return (
            <div>
                {this.toRenderTreeNodes()}
            </div>
        );

    }
}

export default App;
