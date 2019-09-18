/**
 *@Author: hy-zhangb
 *Date: 2018/7/26 13:43
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-09-03 10:43:31
 *Email: lovewinders@163.com
 *File Path: tree - util
 *@File Name: util
 *@Description: Description
 */
'use strict';

export function convertTreeToEntities(treeNodes) {

    const keyEntities = {};
    const loop = data => data && data.map((item) => {

        if(!item) return null;
        if(Array.isArray(item)){
          loop(item);
          return keyEntities;
        }
        const {props: {children}, key} = item;
        keyEntities[key] = {
            key
        };
        if(children && children.length) {

            loop(children);

        }

    });
    if(Array.isArray(treeNodes)) {

        loop(treeNodes);
        return keyEntities;

    }
    return treeNodes;

}

export function conductExpandParent(keyList, keyEntities) {
    const expandedKeys = {};
  
    function conductUp(key) {
      if (expandedKeys[key]) return;
  
      const entity = keyEntities[key];
      if (!entity) return;
  
      expandedKeys[key] = true;
  
      const { parent, node } = entity;
  
      if (node.disabled) return;
  
      if (parent) {
        conductUp(parent.key);
      }
    }
  
    (keyList || []).forEach(key => {
      conductUp(key);
    });
  
    return Object.keys(expandedKeys);
  }
