<!--
 * @Author: zhangb
 * @Date: 2019-09-18 16:26:25
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-09-24 15:22:09
 * @Description: 
 -->

# hysight-scrollTable

## npm 发布方法
```
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Examples

```
import ScrollTable from '@hysight/scrollTable';
const {LevelScroll} = ScrollTable;

and

<ScrollTable
    // scrollSpeed='linear'
    scrollSpeed='ease'
    scrollTime={1000}
    scrollHeight={54}
    scrollRows={5}
    delayTime={2000}
>
    <div style={{height: '54px'}}>列表1</div>
    <div style={{height: '54px'}}>列表1</div>
    <div style={{height: '54px'}}>列表1</div>
    <div style={{height: '54px'}}>列表1</div>
    or
    <ScrollContent />
</ScrollTable>
or
<LevelScroll>
    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费1</span>
    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费2</span>
    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费3</span>
    <span style={{'marginLeft': '20px'}}>測試士大夫瞭解了水电费4</span>
    or
    <ScrollContent />
</LevelScroll>

```


## Usage
```
    npm install @hysight/scrollTable --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/scrollTable --registry=http://192.168.1.207:5000
    then
    import ScrollTable from '@hysight/scrollTable'
```

## ScrollTable Props

> 向上滚动

Prop|Default|Type|Description
:----|:-----|:-----|:-----
className|''|string|组件追加的className名称
scrollSpeed|'linear'|string| [linear] [ease] [ease-in] [ease-out] [ease-in-out] [cubic-bezier(n,n,n,n)]
scrollTime|2000|number|滚动单个所用时间，单位ms
scrollHeight|27|number|单个item的高度，单位px
scrollRows|5|number|默认展示几行数据
delayTime|1000|number|滚动间隔延迟时间，单位ms
count|Infinity|number|滚动rows总个数统计数


## LevelScroll Props

> 向左滚动

Prop|Default|Type|Description
:----|:-----|:-----|:-----
无|无|无|无


# change logs

### 0.0.3
  + 增加className名称

### 0.0.2
  + 增加列表总count不超过scrollRows时，默认不滚动

### 0.0.1
  + 初始化项目
