/**
 *@Author: hy-zhangb
 *Date: 2018/6/11 11:28
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-09-03 13:10:27
 *Email: lovewinders@163.com
 *File Path: data - index
 *@File Name: index
 *@Description: Description
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// MenuItem
import MenuItem from './MenuItem';

// css
import './style.scss';

// ContextMenu
class ContextMenu extends Component {
    static MenuItem = MenuItem;
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),
        eventTrigger: PropTypes.array,
        isMaskLayer: PropTypes.bool,
        position: PropTypes.oneOf(['default', 'under']),
        render: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.element
        ])
    };
    static defaultProps = {
        className: '',
        eventTrigger: ['onContextMenu'],
        isMaskLayer: false,
        position: 'default',
        render: <span>---</span>
    };
    constructor(props, context) {

        super(props, context);
        this.state = {
            isVisible: true,
            menuStyles: null
        };
        this.setClientPosition = this.setClientPosition.bind(this);
        this.clearClientPosition = this.clearClientPosition.bind(this);
        this.showContextMenu = this.showContextMenu.bind(this);
        this.closeContextMenu = this.closeContextMenu.bind(this);
        this.getMousePosition = this.getMousePosition.bind(this);
        this.repairClientPosition = this.repairClientPosition.bind(this);
        this.container = document.createElement('div');
        this.clientX = null;
        this.clientY = null;

    }
    componentDidUpdate() {

        if(!this.state.isVisible) {

            this.repairClientPosition();

        }

    }
    componentWillUnmount() {

        document.body.contains(this.container) && document.body.removeChild(this.container);

    }
    stopEventDefault = (event) => {

        event = event || window.event;
        event && event.preventDefault();
        event && event.stopPropagation && event.stopPropagation();
        event && event.nativeEvent && event.nativeEvent.stopImmediatePropagation();

    };
    setClientPosition(event) {

        this.clientX = event.clientX || (event.touches && event.touches[0].pageX);
        this.clientY = event.clientY || (event.touches && event.touches[0].pageY);

    }
    clearClientPosition() {

        this.clientX = this.clientY = null;

    }
    // 修正位置
    repairClientPosition() {

        const {left, top} = this.getMousePosition({
            clientX: this.clientX,
            clientY: this.clientY
        });
        const {contextMenu} = this.refs;
        contextMenu.style.left = `${left}px`;
        contextMenu.style.top = `${top}px`;

    }
    showContextMenu(event) {

        // event = event || window.event;
        document.body.appendChild(this.container);
        this.stopEventDefault(event);
        this.setClientPosition(event);
        this.setState({
            isVisible: false,
            menuStyles: this.getMousePosition(event)
        });

    }
    closeContextMenu(event) {

        // event = event || window.event;
        document.body.removeChild(this.container);
        this.stopEventDefault(event);
        this.clearClientPosition();
        this.setState({
            isVisible: true
        });

    }
    getMousePosition(event) {

        const {position} = this.props;
        const x = event.clientX || (event.touches && event.touches[0].pageX),
            y = event.clientY || (event.touches && event.touches[0].pageY);

        const baseRect = {
            width: 0,
            height: 0
        };

        const sx = document.documentElement.scrollTop,
            sy = document.documentElement.scrollLeft,
            { innerWidth, innerHeight } = window,
            // rect = this.container.getBoundingClientRect(),
            rect = this.refs.contextMenu ? this.refs.contextMenu.getBoundingClientRect() : baseRect,
            // rect = this.refs.test.getBoundingClientRect(),
            menuStyles = {
                top: y + sy,
                left: x + sx
            };
        if(y + rect.height > innerHeight) {

            menuStyles.top -= rect.height;

        }
        if(x + rect.width > innerWidth) {

            menuStyles.left -= rect.width;

        }
        if(menuStyles.top < 0) {

            menuStyles.top = (rect.height < innerHeight) ? (innerHeight - rect.height) / 2 : 0;

        }
        if(menuStyles.left < 0) {

            menuStyles.left = (rect.width < innerWidth) ? (innerWidth - rect.width) / 2 : 0;

        }
        menuStyles.position = 'fixed';
        if(position === 'default') return menuStyles;
        // return menuStyles;
        const contextRoot = this.refs.contextRoot.getBoundingClientRect();
        return Object.assign({}, {...menuStyles}, {top: contextRoot.height + contextRoot.top});

    }

    toRenderContextMenu() {

        const {children, className, eventTrigger, isMaskLayer} = this.props;
        const {isVisible, menuStyles} = this.state;
        if(!isVisible) {

            // 基础事件
            const basePointer =
                eventTrigger &&
                eventTrigger
                    .filter(v => /^on/g.test(v))
                    .reduce((pre, v) => {

                        return Object.assign({}, pre, {
                            [v]: (event) => {

                                // console.log(123);
                                this.stopEventDefault(event);

                            }
                        });

                    }, {});

            // style
            const cls = classNames({
                'hc-context-menu-modal': isMaskLayer,
                [className]: true
            });
            // const style = isMaskLayer ? {
            //     position: 'fixed',
            //     top: 0,
            //     right: 0,
            //     bottom: 0,
            //     left: 0,
            //     zIndex: 400,
            //     backgroundColor: 'rgba(0,0,0,0)'
            // } : null;
            return ReactDOM.createPortal(
                <div
                    className={cls}
                    // style={style}
                    onClick={this.closeContextMenu}
                >
                    <ul
                        {...basePointer}
                        ref={'contextMenu'}
                        className={'hc-context-menu-tip'}
                        style={menuStyles}
                    >
                        {
                            React.Children.map(this.props.children, child => {

                                return React.cloneElement(child, {
                                    closeContextMenu: this.closeContextMenu
                                });

                            })
                        }
                    </ul>
                </div>,
                this.container
            );

        }

    }

    render() {

        const {render: Comp, eventTrigger} = this.props;
        // eventTrigger

        // 基础事件
        const basePointer =
            eventTrigger &&
            eventTrigger
                .filter(v => /^on/g.test(v))
                .reduce((pre, v) => {

                    return Object.assign({}, pre, {
                        [v]: (event) => {

                            this.stopEventDefault(event);
                            this.showContextMenu(event);

                        }
                    });

                }, null);

        return (
            <span
                {...basePointer}
                ref={'contextRoot'}
                className={'hc-context-menu'}
            >
                {React.isValidElement(Comp) ? <Comp props={this.state} /> : Comp(this.state)}
                {this.toRenderContextMenu()}
            </span>
        );

    }
}

export default ContextMenu;
