<!--
 * @Author: zhangb
 * @Date: 2019-09-18 16:26:25
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-04 16:07:22
 * @Description: 
 -->

# hysight-scrollTable

@hysight/scroll-table uses react hooks and typescript to write a scrolling list plugin

## Install
```
$ npm install @hysight/scroll-table --save
```

```
$ yarn add @hysight/scroll-table
```

## Usage
```
import ScrollTable from '@hysight/scroll-table';
const { LevelScroll } = ScrollTable;

// Scroll up

<ScrollTable
    // scrollSpeed='linear'
    scrollSpeed='ease'
    scrollTime={1000}
    scrollHeight={54}
    scrollRows={5}
    delayTime={2000}
>
    <div style={{height: '54px'}}>list1</div>
    <div style={{height: '54px'}}>list1</div>
    <div style={{height: '54px'}}>list1</div>
    <div style={{height: '54px'}}>list1</div>
    or
    <ScrollContent />
</ScrollTable>

// Scroll left
<LevelScroll>
    <span style={{'marginLeft': '20px'}}>list1</span>
    <span style={{'marginLeft': '20px'}}>list1</span>
    <span style={{'marginLeft': '20px'}}>list1</span>
    <span style={{'marginLeft': '20px'}}>list1</span>
    or
    <ScrollContent />
</LevelScroll>

```
### TypeScript

`@hysight/scroll-table` is written in TypeScript with complete definitions

## ScrollTable Props

> Scroll up

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

> Scroll left

Prop|Default|Type|Description
:----|:-----|:-----|:-----
无|无|无|无


## keywords


# change logs

### 1.0.0
  + use react hooks

### 0.0.4
  + 发布到公网npm

### 0.0.3
  + 增加className名称

### 0.0.2
  + 增加列表总count不超过scrollRows时，默认不滚动

### 0.0.1
  + 初始化项目
