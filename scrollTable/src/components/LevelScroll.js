/**
 *@Author: hy-zhangb
 *Date: 2018/7/17 18:22
 *@Last Modified by: hy-zhangb
 *@Last Modified time: 2018/7/17 18:22
 *Email: lovewinders@163.com
 *File Path: scrollTable - LevelScroll
 *@File Name: LevelScroll
 *@Description: Description
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

// LevelScroll
class LevelScroll extends Component {
    static propTypes = {
        children: PropTypes.any,
        scrollDirection: PropTypes.string,
        scrollSpeed: PropTypes.string,
        scrollTime: PropTypes.number,
        scrollHeight: PropTypes.number,
        scrollRows: PropTypes.number,
        delayTime: PropTypes.number
    };
    static defaultProps = {
        scrollDirection: 'left',
        scrollSpeed: 'linear',
        scrollTime: 2000,
        scrollHeight: 27,
        scrollRows: 5,
        delayTime: 0
    };
    constructor(props) {

        super(props);
        this.frame = null;

    }
    componentDidMount() {

        this.addAnimationFrame();

    }
    componentWillUnmount() {

        this.removeHandleTimer();

    }
    addAnimationFrame = () => {

        const animationDom = ReactDOM.findDOMNode(this.refs['ani-scroll']);
        const realAniWidth = 0 | (animationDom.offsetWidth / 2);
        const that = this;

        function move() {

            const left = parseInt(animationDom.style.left, 10);
            if(left === -realAniWidth) {

                animationDom.style.left = '0px';

            } else {

                animationDom.style.left = `${left - 1}px`;

            }
            that.frame = requestAnimationFrame(move);

        }
        move();

    };
    removeHandleTimer = () => {

        this.frame && cancelAnimationFrame(this.frame);

    };
    render() {

        const {children, scrollDirection, scrollHeight, scrollRows} = this.props;
        const cls = classNames({
            'ani-scroll': true,
            'ani-level-scroll': scrollDirection === 'left'
        });
        return (
            <div
                className='hc-animation'
                style={{height: `${scrollHeight * scrollRows}px`, overflow: 'hidden'}}
            >
                <div
                    className={cls}
                    ref={'ani-scroll'}
                    onMouseEnter={this.removeHandleTimer}
                    onMouseLeave={this.addAnimationFrame}
                    style={{left: 0}}
                >
                    {children}
                    {children}
                </div>
            </div>
        );

    }
}
export default LevelScroll;
