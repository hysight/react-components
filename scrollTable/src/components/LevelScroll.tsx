import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Props } from './types';

import './style.scss';

const LevelScroll: FC<Omit<Props, 'count'>> = props => {

    const {
        className,
        scrollDirection,
        scrollSpeed,
        scrollTime,
        scrollHeight,
        scrollRows,
        delayTime,
        children,
    } = props;

    const scrollNodeRef = useRef<HTMLDivElement>();
    const frameRef = useRef<number>();

    const cls = classNames('hc-animation', className);

    const scrollCls = classNames('ani-scroll', {
        'ani-level-scroll': scrollDirection === 'left'
    });

    /*** 
     * @description: 新增
     * @param {*} useCallback
     * @return {*}
     */
    const addAnimationFrame = useCallback(() => {

        const animationDom = scrollNodeRef.current;
        const realAniWidth = 0 | (animationDom.offsetWidth / 2);

        function move() {

            const left = parseInt(animationDom.style.left, 10);
            if(left === -realAniWidth) {

                animationDom.style.left = '0px';

            } else {

                animationDom.style.left = `${left - 1}px`;

            }
            frameRef.current = requestAnimationFrame(move);

        }
        move();

    }, []);

    /*** 
     * @description: 移除
     * @param {*} useCallback
     * @return {*}
     */
    const removeAnimationFrame = useCallback(() => {

        frameRef.current && cancelAnimationFrame(frameRef.current);

    }, []);

    // 节点事件
    const nodeEvent = {
        onMouseEnter: removeAnimationFrame,
        onMouseLeave: addAnimationFrame
    };

    // 子元素节点
    const childrenNode = (
        <div
            className={scrollCls}
            ref={scrollNodeRef}
            style={{left: 0}}
            {...nodeEvent}
        >
            {children}
            {children}
        </div>
    );

    useEffect(() => {

        addAnimationFrame();
        return () => {

            removeAnimationFrame();

        };

    }, [addAnimationFrame, removeAnimationFrame]);

    return (
        <div
            className={cls}
            style={{height: `${scrollHeight * scrollRows}px`, overflow: 'hidden'}}
        >
            {childrenNode}
        </div>
    );

};

LevelScroll.defaultProps = {
    scrollDirection: 'left',
    scrollSpeed: 'linear',
    scrollTime: 2000,
    scrollHeight: 27,
    scrollRows: 5,
    delayTime: 0
};

export default memo(LevelScroll);
