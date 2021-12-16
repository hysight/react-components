/*** 
 * @Author: zhangb
 * @Date: 2021-12-16 15:13:54
 * @Email: lovewinders@163.com
 * @LastEditors: zhangbao
 * @LastEditTime: 2021-12-16 15:21:49
 * @FilePath: /react-components/scrollTable/src/components/utils.ts
 * @Description: 
 */
/*** 
 * @description: 获取浏览器私有前缀
 * @param {*}
 * @return {*}
 */
export function getBrowserCSSPrefix() {
    const browserPrefix = {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'mozTransitionEnd',
        'OTransition': 'oTransitionEnd'
    };
    const body = document.body;
    for(let v in browserPrefix) {

        if(body.style[v] !== undefined) {

            return browserPrefix[v];

        }

    }
}

// 浏览器css前缀
export const browserCSSPrefix = getBrowserCSSPrefix();