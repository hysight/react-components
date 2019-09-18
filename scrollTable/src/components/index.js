/**
 *@Author: hy-zhangb
 *Date: 2017-09-11 16:48
 *@Last Modified by: zhangb
 *@Last Modified time: 2017-09-11 16:48
 *Email: lovewinders@163.com
 *File Path: //
 *@File Name: intelligence
 *@Description:
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LevelScroll from './LevelScroll';

import './style.scss';

// ScrollTable
class ScrollTable extends Component {
    static LevelScroll = LevelScroll;
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
        scrollDirection: 'up',
        scrollSpeed: 'linear',
        scrollTime: 2000,
        scrollHeight: 27,
        scrollRows: 5,
        delayTime: 1000
    };
    constructor(props) {

        super(props);
        this.curRowIndex = 1;
        this.isAllowStart = true;

    }
    componentDidMount() {

        this.initScrollHandle();

    }
    componentDidUpdate() {

        this.reloadScrollHandle();

    }
    componentWillUnmount() {

        this.clearAllListener();

    }
    getBrowserPrefix = () => {

        const browserPrefix = {
            'transition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'mozTransitionEnd',
            'OTransition': 'oTransitionEnd'
        };
        const thisDom = ReactDOM.findDOMNode(this);
        for(let v in browserPrefix) {

            if(thisDom.style[v] !== undefined) {

                return browserPrefix[v];

            }

        }

    };
    initScrollHandle = () => {

        /* API*/
        // scrollSpeed -> linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n)
        // scrollTime -> xx ms
        // scrollHeight -> single li height
        // delayTime -> delay time to run scroll

        // addEventListener
        const animationDom = ReactDOM.findDOMNode(this.refs['ani-scroll']);
        animationDom.addEventListener(this.getBrowserPrefix(), this.addAniTransform);
        this.reloadScrollHandle();

    };
    reloadScrollHandle = () => {

        const {scrollHeight, delayTime} = this.props;
        this.timer && clearInterval(this.timer);
        this.removeAniTrans();
        this.curRowIndex = 1;
        this.addHandleTimer(scrollHeight, delayTime);

    };
    addAniTransform = () => {

        if(!this.isAllowStart) {

            return;

        }

        const {scrollHeight, delayTime} = this.props;
        const animationDom = ReactDOM.findDOMNode(this.refs['ani-scroll']);
        const realAniHeight = animationDom.offsetHeight / 2;
        const realRows = realAniHeight / scrollHeight;

        let sh = scrollHeight * this.curRowIndex;
        if(this.curRowIndex <= realRows) {

            this.addHandleTimer(sh, delayTime);

        } else {

            this.removeAniTrans();
            this.curRowIndex = 1;
            this.addHandleTimer(scrollHeight, delayTime);

        }

    };
    addAniTransition = () => {

        const {scrollSpeed, scrollTime} = this.props;
        const animationDom = ReactDOM.findDOMNode(this.refs['ani-scroll']);
        animationDom.style.setProperty('-webkit-transition', `all ${scrollTime}ms ${scrollSpeed}`);
        animationDom.style.setProperty('-moz-transition', `all ${scrollTime}ms ${scrollSpeed}`);
        animationDom.style.setProperty('-ms-transition', `all ${scrollTime}ms ${scrollSpeed}`);
        animationDom.style.setProperty('-o-transition', `all ${scrollTime}ms ${scrollSpeed}`);
        animationDom.style.setProperty('transition', `all ${scrollTime}ms ${scrollSpeed}`);

    };
    // remove transform  or transition
    removeAniTrans = () => {

        const animationDom = ReactDOM.findDOMNode(this.refs['ani-scroll']);
        //
        animationDom.style.setProperty('-webkit-transform', '');
        animationDom.style.setProperty('-moz-transform', '');
        animationDom.style.setProperty('-ms-transform', '');
        animationDom.style.setProperty('-o-transform', '');
        animationDom.style.setProperty('transform', '');
        //
        animationDom.style.setProperty('-webkit-transition', '');
        animationDom.style.setProperty('-moz-transition', '');
        animationDom.style.setProperty('-ms-transition', '');
        animationDom.style.setProperty('-o-transition', '');
        animationDom.style.setProperty('transition', '');

    };
    runHandleTimer = () => {

        const {scrollHeight, delayTime} = this.props;
        const sh = scrollHeight * this.curRowIndex;
        this.startAnimation();
        this.addHandleTimer(sh, delayTime);

    };
    addHandleTimer = (sh, timer = 0) => {

        const animationDom = ReactDOM.findDOMNode(this.refs['ani-scroll']);
        // timer setTimeout
        this.timer = setTimeout(() => {

            this.addAniTransition();

            animationDom.style.setProperty('-webkit-transform', `-webkit-translateY(-${sh}px)`);
            animationDom.style.setProperty('-moz-transform', `-moz-translateY(-${sh}px)`);
            animationDom.style.setProperty('-ms-transform', `-ms-translateY(-${sh}px)`);
            animationDom.style.setProperty('-o-transform', `-o-translateY(-${sh}px)`);
            animationDom.style.setProperty('transform', `translateY(-${sh}px)`);
            this.curRowIndex++;

        }, timer);

    };
    startAnimation = () => {

        this.isAllowStart = true;

    };
    stopAnimation = () => {

        this.isAllowStart = false;
        this.timer && clearInterval(this.timer);

    };
    clearAllListener = () => {

        this.timer && clearInterval(this.timer);
        const animationDom = ReactDOM.findDOMNode(this.refs['ani-scroll']);
        animationDom.removeEventListener(this.getBrowserPrefix(), this.addAniTransform);

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
                    onMouseEnter={this.stopAnimation}
                    onMouseLeave={this.runHandleTimer}
                >
                    {children}
                    {children}
                </div>
            </div>
        );

    }
}
export default ScrollTable;
