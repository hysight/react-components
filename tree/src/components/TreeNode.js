/**
 *@Author: hy-zhangb
 *Date: 2018/6/4 18:07
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-08-27 16:27:29
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - TreeNode
 *@File Name: TreeNode
 *@Description: Description
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// css
import './style.scss';

// TreeNode
class TreeNode extends Component {
    static propTypes = {
        className: PropTypes.string,
        prompt: PropTypes.string,
        title: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.node
        ]),
        isLeaf: PropTypes.bool,
        iconLeaf: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        iconDir: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.array
        ]),
        iconEye: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.array
        ]),
        isMore: PropTypes.bool,
        moreComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.node
        ]),
        isPrefixIcon: PropTypes.bool,
        prefixIconComponent: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.node
        ]),
        selectedEye: PropTypes.bool,
        selectedEyeParents: PropTypes.bool,
        eventKey: PropTypes.string,
        _level: PropTypes.number,
        root: PropTypes.object,
        expanded: PropTypes.bool,
        selected: PropTypes.bool,
        mouseOver: PropTypes.bool,
        dragOver: PropTypes.bool,
        dragOverGapTop: PropTypes.bool,
        dragOverGapBottom: PropTypes.bool,
        draggable: PropTypes.bool,
        disabledProviderEvents: PropTypes.bool,
        // isEye: PropTypes.bool,
        defaultExpandAll: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        onDrop: PropTypes.func,
        onExpand: PropTypes.func,
        onSelect: PropTypes.func,
        onDoubleClick: PropTypes.func,
        onDragEnter: PropTypes.func,
        onDragOver: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDragEnd: PropTypes.func,
        onEyeChange: PropTypes.func,
        onRightClick: PropTypes.func,
        updateExpandedKeys: PropTypes.func,
        updateSelectedKeys: PropTypes.func,
        updateSelectedEyeKeys: PropTypes.func,
        updateDragNodesKeys: PropTypes.func,
        updateDragOverNodeKey: PropTypes.func,
        clearDragOverNodeKey: PropTypes.func,
        setDropPosition: PropTypes.func,
        updateMouseEnterKeys: PropTypes.func
    };
    static defaultProps = {
        className: '',
        title: '---',
        isLeaf: false,
        iconLeaf: true,
        iconDir: true,
        isMore: false,
        moreComponent: '---',
        isPrefixIcon: false,
        prefixIconComponent: '-'
    };
    constructor(props, context) {

        super(props, context);
        this.toRenderChildren = this.toRenderChildren.bind(this);
        this.toRenderEye = this.toRenderEye.bind(this);
        this.toRenderSpace = this.toRenderSpace.bind(this);
        this.toRenderArrow = this.toRenderArrow.bind(this);
        this.toRenderIcon = this.toRenderIcon.bind(this);
        this.toRenderContent = this.toRenderContent.bind(this);
        this.toRenderDraggable = this.toRenderDraggable.bind(this);
        this.toRenderRowsContent = this.toRenderRowsContent.bind(this);
        this.dragEnter = this.dragEnter.bind(this);
        this.drop = this.drop.bind(this);
        this.filterBlackListEvents = this.filterBlackListEvents.bind(this);

    }

    stopEventDefault = (event) => {

        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

    };

    dragEnter(e) {

        const {
            onDragEnter,
            root: {
                state: {expandedKeys}
            }
        } = this.props;

        // console.log('this.props', this.props, e);
        const data = Object.assign({}, {event: e, node: this, expandedKeys});

        // props
        onDragEnter && onDragEnter(data);

    }

    drop(e) {

        const {
            onDrop,
            eventKey,
            isLeaf,
            root: {
                dragNode,
                dropPosition
            },
            dragOver,
            dragOverGapTop,
            dragOverGapBottom
        } = this.props;
        // if folder no draggable
        if(dragOver && isLeaf) { // isLeaf

            return;

        }
        // filter drag & drop is one node
        if(eventKey === dragNode.props.eventKey) {

            console.warn('can not drop to dragNode(include it\'s children node)');
            return;

        }
        const data = Object.assign(
            {},
            {
                dropPosition,
                node: this,
                dragNode: dragNode,
                event: e,
                dragNodesKeys: eventKey
            },
            (dragOverGapTop ? {dragOverGapTop: true} : {}),
            (dragOverGapBottom ? {dragOverGapBottom: true} : {})
        );
        onDrop(data);

    }

    filterBlackListEvents(eventPointers) {

        return (disabledPointersArr) => {

            return Object.entries(eventPointers)
                .filter(([key]) => !disabledPointersArr.some(v => v === key))
                .reduce((pre, [k, y]) => Object.assign({}, pre, {[k]: y}), {});

        };

    }

    toRenderChildren() {

        const {children, root, ...props} = this.props;
        const {state: {expandedKeys, selectedKeys, selectedEyeKeys, dragOverNodeKey, mouseEnterKeys}, dropPosition} = root;
        const {defaultExpandAll, expanded} = props;
        // debugger;
        if(expanded && children) {

            return (
                <ul className='menu-tree-child-tree'>
                    {
                        React.Children.map(children, child => {

                            // debugger;
                            /* console.log(
                                'dragOverNodeKey === child.key=>',
                                dragOverNodeKey,
                                child.key,
                                dragOverNodeKey === child.key,
                                'dropPosition=>',
                                dropPosition
                            );*/
                            if(!child) return null;
                            const {key: eventKey, props: {children, ...prop}} = child;
                            return React.cloneElement(child, {
                                ...props,
                                ...prop,
                                root,
                                eventKey,
                                _level: props._level + 1,
                                dragOver: dragOverNodeKey === eventKey && dropPosition === 0,
                                dragOverGapTop: dragOverNodeKey === eventKey && dropPosition === -1,
                                dragOverGapBottom: dragOverNodeKey === eventKey && dropPosition === 1,
                                expanded: expandedKeys.includes(eventKey),
                                selected: selectedKeys.includes(eventKey),
                                selectedEye: selectedEyeKeys.includes(eventKey) || props.selectedEye,
                                selectedEyeParents: props.selectedEyeParents || props.selectedEye,
                                mouseOver: mouseEnterKeys.includes(eventKey)
                            });

                        })
                    }
                </ul>
            );

        }
        return null;

    }

    toRenderEye() {

        const {
            // iconEye,
            eventKey,
            selectedEye,
            selectedEyeParents,
            updateSelectedEyeKeys,
            onEyeChange
        } = this.props;
        let {iconEye} = this.props;
        if(!iconEye) return null;
        // updateSelectedEyeKeys
        // 基础事件
        const basePointer =
            {
                onClick: (event) => {

                    // !selectedEyeParents && updateSelectedEyeKeys(eventKey);

                    if(!selectedEyeParents) {

                        updateSelectedEyeKeys(eventKey);
                        onEyeChange &&
                        onEyeChange(eventKey, {selected: !selectedEye, node: this});

                    }
                    this.stopEventDefault(event);

                }
                // onDrop: (event) => this.drop(event)
            };
        // base class name
        if(Object.prototype.toString.call(iconEye) === '[object Boolean]' && iconEye) {

            iconEye = ['icon-buyincang', 'icon-yincang'];

        }
        const cls = classNames(
            'menu-tree-eye',
            {
                [iconEye[0]]: !selectedEye,
                [iconEye[1]]: selectedEye,
                'disabled': selectedEyeParents
            }
        );
        return (
            <span
                className={cls}
                {...basePointer}
            />
        );

    }

    toRenderSpace() {

        const {_level} = this.props;
        return (
            <span className={'menu-tree-space'}>
                {
                    _level
                        ? Array.from({length: _level}, (v, i) =>
                            <span className={'menu-tree-space-item'} key={`menu-tree-space-item-${i}`} />
                        )
                        : null
                }
            </span>
        );

    }

    toRenderArrow() {

        const {isPrefixIcon, mouseOver, isLeaf, expanded, prefixIconComponent: Comp} = this.props;
        // base class name
        const cls = classNames(
            'menu-tree-arrow',
            {
                'icon-zhankai': !(isPrefixIcon && mouseOver) && !isLeaf && expanded,
                'icon-zhedie': !(isPrefixIcon && mouseOver) && !isLeaf && !expanded
            }
        );
        // PrefixIconComp
        const PrefixIconComp = isPrefixIcon && mouseOver ? Comp : null;

        return (
            <span className={cls}>
                {PrefixIconComp}
            </span>
        );

    }

    toRenderIcon() {

        /* const {
            root: {
                state: {expandedKeys}
            },
            isLeaf,
            eventKey,
            onExpand,
            updateExpandedKeys,
            updateSelectedKeys
        } = this.props;*/

        // 基础事件
        const basePointer =
            {
                /* onClick: (event) => {

                    updateExpandedKeys(eventKey);
                    onExpand &&
                    onExpand(expandedKeys, {expanded: !expandedKeys.includes(eventKey), node: this});

                }*/
                // onDrop: (event) => this.drop(event)
            };

        // base class name
        let {isLeaf, iconDir, iconLeaf, expanded} = this.props;
        // console.log('沙发啊士大夫', this.props);
        if(Object.prototype.toString.call(iconDir) === '[object Boolean]' && !isLeaf && !iconDir) return null;
        if(Object.prototype.toString.call(iconLeaf) === '[object Boolean]' && isLeaf && !iconLeaf) return null;
        if(Object.prototype.toString.call(iconDir) === '[object Boolean]' && iconDir) {

            iconDir = ['icon-wenjianjiadakai', 'icon-wenjianjiaguanbi'];

        }
        if(Object.prototype.toString.call(iconLeaf) === '[object Boolean]' && iconLeaf) {

            iconLeaf = 'icon-biaoqian';

        }
        const cls = classNames(
            'menu-tree-online',
            {
                [iconDir[0]]: !isLeaf && expanded,
                [iconDir[1]]: !isLeaf && !expanded,
                [iconLeaf]: isLeaf && !!iconLeaf
            }
        );
        return (
            <span
                className={cls}
                {...basePointer}
            />
        );

    }

    toRenderContent() {

        const {
            title,
            prompt,
            selected
        } = this.props;

        // className
        const cls = classNames('menu-tree-content-wrapper', {
            'menu-tree-node-selected': selected
        });

        return (
            <a
                title={prompt || title}
                className={cls}
            >
                {title}
            </a>
        );

    }

    toRenderRowsContent() {

        const {
            className,
            isLeaf,
            isMore,
            root: {
                state: {expandedKeys}
            },
            onExpand,
            selected,
            draggable,
            eventKey,
            dragOver,
            disabledProviderEvents,
            updateSelectedKeys,
            updateExpandedKeys,
            updateDragNodesKeys,
            updateDragOverNodeKey,
            clearDragOverNodeKey,
            updateMouseEnterKeys,
            onRightClick,
            onSelect,
            onDoubleClick,
            onDragStart,
            // onDragEnter,
            onDragOver,
            onDragLeave,
            onDragEnd
            // onDrop
        } = this.props;

        // 基础事件
        const basePointer =
            {
                onDragOver: (event) => {

                    // console.log('disabledProviderEvents', disabledProviderEvents);
                    if(!disabledProviderEvents) {

                        event.dataTransfer.dropEffect = dragOver && isLeaf ? 'none' : 'copyMove';
                        updateDragOverNodeKey(event, this);

                    }
                    // props
                    onDragOver && onDragOver({event: event, node: this});

                },
                onDragEnd: (event) => {

                    if(!disabledProviderEvents) {

                        clearDragOverNodeKey();

                    }
                    // props
                    onDragEnd && onDragEnd({event: event, node: this});

                },
                onDragLeave: (event) => {

                    // props
                    onDragLeave && onDragLeave({event: event, node: this});

                },
                onDrop: (event) => {

                    if(!disabledProviderEvents) {

                        clearDragOverNodeKey();
                        this.drop(event);

                    }

                },
                onMouseEnter: (event) => {

                    isMore && updateMouseEnterKeys && updateMouseEnterKeys(event, this, true);

                },
                onMouseLeave: (event) => {

                    isMore && updateMouseEnterKeys && updateMouseEnterKeys(event, this, false);

                },
                onContextMenu: (event) => {

                    onRightClick && onRightClick({event: event, node: this});

                }
            };

        // 特殊事件
        const specialPointer = !isLeaf
            ? {
                onClick: (event) => {

                    updateSelectedKeys(eventKey);
                    updateExpandedKeys(eventKey);
                    onExpand &&
                    onExpand(expandedKeys, {expanded: !expandedKeys.includes(eventKey), node: this});
                    onSelect &&
                    onSelect(
                        eventKey,
                        {
                            selected: true,
                            event: event,
                            selectedNodes: [this],
                            node: this
                        }
                    );

                },
                onDoubleClick: (event) => {

                    updateSelectedKeys(eventKey);
                    updateExpandedKeys(eventKey);
                    onExpand &&
                    onExpand(expandedKeys, {expanded: !expandedKeys.includes(eventKey), node: this});
                    onDoubleClick &&
                    onDoubleClick(
                        eventKey,
                        {
                            selected: true,
                            event: event,
                            selectedNodes: [this],
                            node: this
                        },
                        isLeaf
                    );

                },
                onDragStart: (event) => {

                    if(!disabledProviderEvents) {

                        event.dataTransfer.effectAllowed = 'copyMove';
                        updateDragNodesKeys(this);

                    }
                    onDragStart && onDragStart({event: event, node: this});

                }
            }
            : {
                onClick: (event) => {

                    updateSelectedKeys(eventKey);
                    onSelect &&
                    onSelect(
                        eventKey,
                        {
                            selected: true,
                            event: event,
                            selectedNodes: [this],
                            node: this
                        }
                    );

                },
                onDoubleClick: (event) => {

                    updateSelectedKeys(eventKey);
                    onDoubleClick &&
                    onDoubleClick(
                        eventKey,
                        {
                            selected: true,
                            event: event,
                            selectedNodes: [this],
                            node: this
                        },
                        isLeaf
                    );

                },
                onDragStart: (event) => {

                    if(!disabledProviderEvents) {

                        event.dataTransfer.effectAllowed = 'copyMove';
                        updateDragNodesKeys(this);

                    }
                    // props
                    onDragStart && onDragStart({event: event, node: this});

                }
            };

        const blackEventsList = []; // 'onDragStart', 'onDragOver', 'onDragEnd', 'onDrop'
        const groupPointer = {...basePointer, ...specialPointer};
        const nodePointer = disabledProviderEvents
            ? this.filterBlackListEvents(groupPointer)(blackEventsList) : groupPointer;

        const cls = classNames(
            'menu-tree-parent-tree',
            {
                [className]: !!className
            }
        );

        return (
            <div
                {...nodePointer}
                draggable={draggable}
                ref={'selectHandle'}
                className={cls}
            >
                {this.toRenderEye()}
                {this.toRenderSpace()}
                {this.toRenderArrow()}
                {this.toRenderIcon()}
                {this.toRenderContent()}
                {this.toRenderDraggable()}
            </div>
        );

    }

    toRenderDraggable() {

        const { isMore, mouseOver, moreComponent: Comp } = this.props;
        if(isMore && mouseOver && Comp) {

            return Comp;

        }
        return null;

    }

    render() {

        const {children, selected, expanded, dragOver, dragOverGapTop, dragOverGapBottom} = this.props;
        const cls = classNames({
            'menu-tree-node-selected': selected, //  && !children
            'menu-tree-node-expanded': expanded,
            'menu-tree-drag-over': dragOver,
            'menu-tree-grap-top': dragOverGapTop,
            'menu-tree-grap-bottom': dragOverGapBottom
        });
        return (
            <li
                className={cls}
                onDragEnter={(event) => {

                    this.dragEnter(event);

                }}
                onDragOver={(event) => {

                    this.stopEventDefault(event);

                }}
                onContextMenu={(event) => {

                    this.stopEventDefault(event);

                }}
            >
                {this.toRenderRowsContent()}
                {this.toRenderChildren()}
            </li>
        );

    }
}

export default TreeNode;
