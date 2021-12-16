/*** 
 * @Author: zhangb
 * @Date: 2021-12-16 16:19:31
 * @Email: lovewinders@163.com
 * @LastEditors: zhangbao
 * @LastEditTime: 2021-12-16 18:38:17
 * @FilePath: /scrollTable/src/components/types/index.ts
 * @Description: 
 */

type ScrollDirection = 'up' | 'left';

export interface Props {
    className?: string,
    scrollDirection?: ScrollDirection,
    scrollSpeed: string;
    scrollTime: number,
    scrollHeight: number,
    scrollRows: number,
    delayTime: number,
    count: number,
    children: any,
}