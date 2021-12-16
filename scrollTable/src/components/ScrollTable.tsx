import React, { FC, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { browserCSSPrefix } from './utils';
// import useUpdateLayoutEffect from './hooks/useUpdateLayoutEffect';
// import useUpdateEffect from './hooks/useUpdateEffect';
import { Props } from './types';

import './style.scss';

const ScrollTable: FC<Props> = props => {

    const {
        className,
        scrollDirection,
        scrollSpeed,
        scrollTime,
        scrollHeight,
        scrollRows,
        delayTime,
        count,
        children,
    } = props;

    const scrollNodeRef = useRef<HTMLDivElement>();
    const isStartScrollRef = useRef<boolean>(true);
    const rowIndexRef = useRef<number>(1);
    const timerRef = useRef<NodeJS.Timer>();

    const cls = classNames('hc-animation', className);

    const scrollCls = classNames('ani-scroll');

    /*** 
     * @description: 是否滚动元素
     * @param {*} useMemo
     * @return {*}
     */
    const isScrollChildren = useMemo(() => count > scrollRows, [count, scrollRows]);

    /*** 
     * @description: 设置过度动画
     * @param {*} useCallback
     * @return {*}
     */
    const setTransition = useCallback((scrollSpeed, scrollTime) => {

        const animationDom = scrollNodeRef.current;
        animationDom.style.setProperty('-webkit-transition', `all ${scrollTime}ms ${scrollSpeed}`);
        animationDom.style.setProperty('-moz-transition', `all ${scrollTime}ms ${scrollSpeed}`);
        animationDom.style.setProperty('-ms-transition', `all ${scrollTime}ms ${scrollSpeed}`);
        animationDom.style.setProperty('-o-transition', `all ${scrollTime}ms ${scrollSpeed}`);
        animationDom.style.setProperty('transition', `all ${scrollTime}ms ${scrollSpeed}`);

    }, []);

    /*** 
     * @description: 清除过度动画
     * @param {*} useCallback
     * @return {*}
     */
    const clearTransition = useCallback(() => {

        const animationDom = scrollNodeRef.current;
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

    }, []);

    /*** 
     * @description: 设置定时器
     * @param {*} sh
     * @param {*} timer
     * @return {*}
     */
    const setTimer = useCallback((scrollHeight, scrollSpeed, scrollTime, timer = 0) => {

        const animationDom = scrollNodeRef.current;
        // timer setTimeout
        timerRef.current = setTimeout(() => {

            setTransition(scrollSpeed, scrollTime);

            animationDom.style.setProperty('-webkit-transform', `-webkit-translateY(-${scrollHeight}px)`);
            animationDom.style.setProperty('-moz-transform', `-moz-translateY(-${scrollHeight}px)`);
            animationDom.style.setProperty('-ms-transform', `-ms-translateY(-${scrollHeight}px)`);
            animationDom.style.setProperty('-o-transform', `-o-translateY(-${scrollHeight}px)`);
            animationDom.style.setProperty('transform', `translateY(-${scrollHeight}px)`);
            rowIndexRef.current++;

        }, timer);

    }, [setTransition]);

    /*** 
     * @description: 清除定时器
     * @param {*} useCallback
     * @return {*}
     */
    const clearTimer = useCallback(() => scrollNodeRef.current && clearTimeout(timerRef.current), []);

    /*** 
     * @description: 开启动画
     * @param {*} useCallback
     * @return {*}
     */
    const runAnimation = useCallback(() => {

        if(!isStartScrollRef.current) return;

        const animationDom = scrollNodeRef.current;
        const realAniHeight = animationDom.offsetHeight / 2;
        const realRows = realAniHeight / scrollHeight;

        const sh = scrollHeight * rowIndexRef.current;

        if(rowIndexRef.current <= realRows) {

            setTimer(sh, scrollSpeed, scrollTime, delayTime);

        } else {

            clearTransition();
            rowIndexRef.current = 1;
            setTimer(scrollHeight, scrollSpeed, scrollTime, delayTime);

        }
    
    }, [scrollHeight, scrollSpeed, scrollTime, delayTime, clearTransition, setTimer]);

    /*** 
     * @description: 重置滚动事件
     * @param {*}
     * @return {*}
     */
    const resetScroll = useCallback(() => {

        clearTimer();
        clearTransition();
        rowIndexRef.current = 1;
        setTimer(scrollHeight, scrollSpeed, scrollTime, delayTime);

    }, [scrollHeight, scrollSpeed, scrollTime, delayTime, clearTimer, clearTransition, setTimer]);

    /*** 
     * @description: 
     * @param {*} useCallback
     * @return {*}
     */
    const clearScroll = useCallback(() => {

        timerRef.current && clearInterval(timerRef.current);
        scrollNodeRef.current.removeEventListener(browserCSSPrefix, runAnimation);

    }, [runAnimation]);

    /*** 
     * @description: 启动滚动
     * @param {*} useCallback
     * @return {*}
     */
    const runScroll = useCallback(() => {

        /* API*/
        // scrollSpeed -> linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n)
        // scrollTime -> xx ms
        // scrollHeight -> single li height
        // delayTime -> delay time to run scroll

        // addEventListener
        // clearScroll();
        scrollNodeRef.current.addEventListener(browserCSSPrefix, runAnimation);
        isScrollChildren && resetScroll();

    }, [isScrollChildren, runAnimation, resetScroll]);

    /*** 
     * @description: 
     * @param {*} useCallback
     * @return {*}
     */
    const startScroll = useCallback(() => {

        isStartScrollRef.current = true;
        const sh = scrollHeight * rowIndexRef.current;
        setTimer(sh, scrollSpeed, scrollTime, delayTime);
    
    }, [scrollHeight, scrollSpeed, scrollTime, delayTime, setTimer]);

    /*** 
     * @description: 
     * @param {*} useCallback
     * @return {*}
     */
    const stopScroll = useCallback(() => {

        isStartScrollRef.current = false;
        clearTimer();

    }, [clearTimer]);

    // 节点事件
    const nodeEvent = isScrollChildren ? {
        onMouseEnter: stopScroll,
        onMouseLeave: startScroll
    } : null;

    // 子元素节点
    const childrenNode = (
        <div
            className={scrollCls}
            ref={scrollNodeRef}
            {...nodeEvent}
        >
            {children}
            {isScrollChildren && children}
        </div>
    );

    useEffect(() => {

        runScroll();
        return () => {

            clearScroll();

        };

    }, [runScroll, clearScroll]);

    return (
        <div
            className={cls}
            style={{height: `${scrollHeight * scrollRows}px`, overflow: 'hidden'}}
        >
            {childrenNode}
        </div>
    );

};

ScrollTable.defaultProps = {
    className: '',
    scrollDirection: 'up',
    scrollSpeed: 'linear',
    scrollTime: 2000,
    scrollHeight: 27,
    scrollRows: 5,
    delayTime: 1000,
    count: Infinity,
};

export default memo(ScrollTable);
