/*** 
 * @Author: zhangb
 * @Date: 2021-12-16 17:33:27
 * @Email: lovewinders@163.com
 * @LastEditors: zhangbao
 * @LastEditTime: 2021-12-16 17:33:32
 * @FilePath: /scrollTable/src/components/a.tsx
 * @Description: 
 */
import { useRef } from 'react';
import type { useEffect, useLayoutEffect } from 'react';

type effectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect: (hook: effectHookType) => effectHookType = (hook) => (effect, deps) => {

    const isMounted = useRef(false);

    // for react-refresh
    hook(() => {

        return () => {

            isMounted.current = false;
          
        };
      
    }, []);

    hook(() => {

        if (!isMounted.current) {

            isMounted.current = true;
          
        } else {

            return effect();
          
        }
      
    }, deps);
  
};