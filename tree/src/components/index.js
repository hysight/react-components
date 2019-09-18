/**
 *@Author: hy-zhangb
 *Date: 2018/6/4 17:49
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-09-03 10:29:36
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - index
 *@File Name: index
 *@Description: Description
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {convertTreeToEntities, conductExpandParent} from './util';

import TreeNode from './TreeNode';
import TreeMore from './TreeMore';

// css
import './style.scss';

// Tree
class Tree extends Component {
    static TreeNode = TreeNode;
    static TreeMore = TreeMore;
    static getDerivedStateFromProps(nextProps, prevState) {

        // console.log('----=-=nextProps==-==->', nextProps);
        // console.log('----=-=prevState==-==->', prevState);
        // console.log('-----------------------');
        // debugger;
        if(!nextProps.children) return null;
        const { prevProps } = prevState;
        const newState = {
            prevProps: nextProps
        };
        function needSync(name) {
            
            return (!prevProps && name in nextProps) || (prevProps && prevProps[name] !== nextProps[name]);

        }
        const keyEntities = convertTreeToEntities(nextProps.children);
        // ================ expandedKeys =================
        // debugger;
        // if((needSync('expandedKeys') && !needSync('defaultExpandAll') || (!prevProps && !!nextProps.expandedKeys.length)) || needSync('autoExpandParent')) {
        // if(needSync('expandedKeys') || (!needSync('expandedKeys') && nextProps.autoExpandParent)) {
        // if(needSync('expandedKeys') || (prevProps && needSync('autoExpandParent'))) {
        if(needSync('expandedKeys') || (!prevProps && nextProps.autoExpandParent)) {

            // newState.expandedKeys =  nextProps.autoExpandParent || (!prevProps && nextProps.defaultExpandParent)
            newState.expandedKeys =  nextProps.autoExpandParent
                ? Object.keys(keyEntities) 
                : nextProps.expandedKeys;

        } /* else if (!prevProps && nextProps.defaultExpandAll) {

            // const cloneKeyEntities = { ...keyEntities };
            // delete cloneKeyEntities[MOTION_KEY];
            newState.expandedKeys = Object.keys(keyEntities);

        } else if (!prevProps && nextProps.defaultExpandedKeys) {

            newState.expandedKeys =
            nextProps.autoExpandParent || nextProps.defaultExpandParent
                ? conductExpandParent(nextProps.defaultExpandedKeys, keyEntities)
                : nextProps.defaultExpandedKeys;

        } */
        // ================ selectedKeys =================
        if(!prevProps && needSync('selectedKeys')) {

            newState.selectedKeys = nextProps.selectedKeys;

        }
        return newState;

    }
    static propTypes = {
        className: PropTypes.string,
        defaultExpandAll: PropTypes.bool,
        defaultExpandedKeys: PropTypes.array,
        expandedKeys: PropTypes.array,
        autoExpandParent: PropTypes.bool,
        selectedKeys: PropTypes.array,
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        draggable: PropTypes.bool,
        disabledProviderEvents: PropTypes.bool,
        eventKey: PropTypes.string,
        onDrop: PropTypes.func,
        onExpand: PropTypes.func,
        onSelect: PropTypes.func,
        onDoubleClick: PropTypes.func,
        onRightClick: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragEnter: PropTypes.func,
        onDragOver: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDragEnd: PropTypes.func,
        onEyeChange: PropTypes.func
    };
    static defaultProps = {
        expandedKeys: [],
        selectedKeys: [],
        autoExpandParent: false,
        draggable: false,
        disabledProviderEvents: false,
        iconEye: false,
        _level: 0
    };
    constructor(props, context) {

        super(props, context);
        this.state = {
            expandedKeys: [],
            selectedKeys: [],
            selectedEyeKeys: [],
            dragNodesKeys: [],
            dragOverNodeKey: '',
            dropNodeKey: '',
            mouseEnterKeys: []
        };
        this.filterToggleKeys = this.filterToggleKeys.bind(this);
        this.updateExpandedKeys = this.updateExpandedKeys.bind(this);
        this.updateSelectedKeys = this.updateSelectedKeys.bind(this);
        this.updateSelectedEyeKeys = this.updateSelectedEyeKeys.bind(this);
        this.updateDragNodesKeys = this.updateDragNodesKeys.bind(this);
        this.updateDragOverNodeKey = this.updateDragOverNodeKey.bind(this);
        this.clearDragOverNodeKey = this.clearDragOverNodeKey.bind(this);
        this.calcDropPosition = this.calcDropPosition.bind(this);
        this.updateMouseEnterKeys = this.updateMouseEnterKeys.bind(this);
        this.dragNode = null;
        this.dropPosition = null;

    }

    filterToggleKeys(sourceKeysArr, targetKey) {

        const isNodeKey = sourceKeysArr.findIndex(v => targetKey === v);
        const newKeys = [...sourceKeysArr];
        isNodeKey >= 0 ? newKeys.splice(isNodeKey, 1) : newKeys.push(targetKey);
        return newKeys;

    }

    updateExpandedKeys(key) {

        const {expandedKeys} = this.state;
        /* const isNodeKey = expandedKeys.findIndex(v => key === v);
        // isNodeKey ? const [key, keys] = expandedKeys : const keys = [expandedKeys, key];
        const newKeys = [...expandedKeys];
        isNodeKey >= 0 ? newKeys.splice(isNodeKey, 1) : newKeys.push(key);*/
        const newKeys = this.filterToggleKeys(expandedKeys, key);
        this.setState({
            expandedKeys: newKeys
        });
        // console.log(111, isNodeKey);

    }

    updateSelectedKeys(key) {

        // const {selectedKeys} = this.state;
        this.setState({
            selectedKeys: [key]
        });

    }

    updateSelectedEyeKeys(key) {

        const {selectedEyeKeys} = this.state;
        const newKeys = this.filterToggleKeys(selectedEyeKeys, key);
        this.setState({
            selectedEyeKeys: newKeys
        });

    }

    updateDragNodesKeys(_t) {

        this.dragNode = _t;

        const {eventKey} = _t.props;
        this.setState({
            dragNodesKeys: [eventKey]
        });

    }

    updateDragOverNodeKey(event, _t) {

        // console.log(_t.props);
        const {eventKey} = _t.props;
        const {dragOverNodeKey} = this.state;
        const dropPosition = this.calcDropPosition(event, _t);

        if(eventKey !== dragOverNodeKey || this.dropPosition !== dropPosition) {

            this.dropPosition = dropPosition;
            this.setState({
                dragOverNodeKey: eventKey
            });

        }

    }

    clearDragOverNodeKey() {

        this.setState({
            dragOverNodeKey: ''
        });

    }

    // Only used when drag, not affect SSR.
    calcDropPosition(event, treeNode) {

        /* eslint no-loop-func: 0*/
        var DRAG_SIDE_RANGE = 0.25;
        var DRAG_MIN_GAP = 2;

        var clientY = event.clientY;

        var _treeNode$selectHandl = treeNode.refs.selectHandle.getBoundingClientRect(),
            top = _treeNode$selectHandl.top,
            bottom = _treeNode$selectHandl.bottom,
            height = _treeNode$selectHandl.height;

        var des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

        if(clientY <= top + des) {

            return -1;

        } else if(clientY >= bottom - des) {

            return 1;

        }

        return 0;

    }

    updateMouseEnterKeys(event, treeNode, status) {

        const {eventKey} = treeNode.props;
        // const {mouseEnterKeys} = this.state;
        // const newKeys = this.filterToggleKeys(mouseEnterKeys, eventKey);
        this.setState({
            mouseEnterKeys: status ? [eventKey] : []
        });

    }

    render() {

        // {this.props.children}
        const {children, className, ...props} = this.props;
        const {expandedKeys, selectedKeys, selectedEyeKeys, dragOverNodeKey, mouseEnterKeys} = this.state;
        return (
            <div className={className ? `hc-menu-tree ${className}` : 'hc-menu-tree'}>
                <ul className='menu-tree'>
                    {
                        React.Children.map(this.props.children, child => {

                            // debugger;
                            if(!child) return null;
                            const {key: eventKey, props: {children, ...prop}} = child;
                            return React.cloneElement(child, {
                                ...props,
                                ...prop,
                                root: this,
                                eventKey,
                                expanded: expandedKeys.includes(eventKey),
                                selected: selectedKeys.includes(eventKey),
                                selectedEye: selectedEyeKeys.includes(eventKey),
                                selectedEyeParents: false,
                                mouseOver: mouseEnterKeys.includes(eventKey),
                                dragOver: dragOverNodeKey === eventKey && this.dropPosition === 0,
                                dragOverGapTop: dragOverNodeKey === eventKey && this.dropPosition === -1,
                                dragOverGapBottom: dragOverNodeKey === eventKey && this.dropPosition === 1,
                                updateExpandedKeys: this.updateExpandedKeys,
                                updateSelectedKeys: this.updateSelectedKeys,
                                updateSelectedEyeKeys: this.updateSelectedEyeKeys,
                                updateDragNodesKeys: this.updateDragNodesKeys,
                                updateDragOverNodeKey: this.updateDragOverNodeKey,
                                clearDragOverNodeKey: this.clearDragOverNodeKey,
                                updateMouseEnterKeys: this.updateMouseEnterKeys
                            });

                        })
                    }
                </ul>
            </div>
        );

    }
}

export default Tree;
