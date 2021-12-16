/*** 
 * @Author: zhangb
 * @Date: 2021-12-16 17:34:50
 * @Email: lovewinders@163.com
 * @LastEditors: zhangbao
 * @LastEditTime: 2021-12-16 17:35:21
 * @FilePath: /scrollTable/src/components/useUpdateLayoutEffect.tsx
 * @Description: 
 */
import { useLayoutEffect } from 'react';
import { createUpdateEffect } from './createUpdateEffect';

export default createUpdateEffect(useLayoutEffect);