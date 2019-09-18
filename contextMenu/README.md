<!--
 * @Author: zhangb
 * @Date: 2019-09-03 10:10:32
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-09-03 13:11:44
 * @Description: 
 -->

# hysight-contextMenu

## npm 发布方法
```
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Preview
![效果预览图](/images/1.png)

## Examples

```
import ContextMenu from '@hysight/contextMenu'
const {MenuItem} = ContextMenu;
or
render() {

    return (
        <div>
            <ContextMenu
                render={() => {

                    return (
                        <span
                            className={'hm-table-plus'}
                        >
                            点击弹出
                        </span>
                    );

                }}
            >
                <MenuItem onClick={() => console.log(1)} >测试1</MenuItem>
                <MenuItem onClick={() => console.log(1)} >测试2</MenuItem>
                <MenuItem onClick={() => console.log(1)} >测试3</MenuItem>
            </ContextMenu>
        </div>
    );

}
```

## Usage
```
    npm install @hysight/contextMenu --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/contextMenu --registry=http://192.168.1.207:5000
    then
    import ContextMenu from '@hysight/contextMenu'
    const {MenuItem} = ContextMenu;
```

## Available Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
className|string|无|className
eventTrigger|arr:onContextMenu|arr|arr:'onClick','onContextMenu','on***'等事件触发提示框
isMaskLayer|false|bool|是否显示遮罩层
position|default|string:default/under|render内起始位置，default -> 鼠标左上角 / under -> 元素正下方
render|'---'|func/element(react)|被绑定触发提示框的组件-Comp/props/state等


# change logs

### 0.2.1
  + 屏蔽邮件默认事件

### 0.2.0
  + 修复0.1.8 event

### 0.1.9
  + 修复0.1.8 event

### 0.1.8
  + 增加允许showContextMenu || closeContextMenu 默认不传递event

### 0.1.7
  + 增加className props

### 0.1.6
  + 移除掉preventDefault，它会导致a标签默认动作失效

### 0.1.5
  + 优化z-index

### 0.1.4
  + 扩展render内起始位置position，支持位置选择default/under

### 0.1.3
  + 兼容事件:从document到mark层事件迁移

### 0.1.2
  + 修复z-index

### 0.1.1
  + 增加props遮罩层

### 0.1.0
  + 修复route变更导致报错问题3

### 0.0.9
  + 修复route变更导致报错问题

### 0.0.8
  + 修复route变更导致报错问题

### 0.0.7
  + 修复bug

### 0.0.6
  + children增加object，css 增加z-index

### 0.0.5
  + 禁止事件冒泡等

### 0.0.4
  + 修复事件机制问题

### 0.0.3
  + 增加组件eventTrigger,优化等

### 0.0.2
  + 修复api

### 0.0.1
  + 初始化项目
