<!--
 * @Author: zhangb
 * @Date: 2019-09-18 16:25:47
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-04 16:39:18
 * @Description: 
 -->

# hysight-gapPieEchart

## npm 发布方法
```
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Examples

```
import GapPieEchart from '@hysight/gap-pie-echart';

<GapPieEchart
    option={Option}
    splitItemNum={1}
/>
```

## Usage
```
    npm install @hysight/gap-pie-echart --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/gap-pie-echart --registry=http://192.168.1.207:5000
    then
    import GapPieEchart from '@hysight/gap-pie-echart';
    
    options gap tree config
    -option
        -series
            -itemStyle
                -normal
                    -borderWidth: 4, // 设置border可以空隙宽度
                    -borderColor: '#000' // 同上颜色
                -emphasis
                    -borderWidth: 0,
                    -shadowBlur: 5,
                    -shadowOffsetX: 0,
                    -shadowColor: 'rgba(0, 0, 0, 0.5)'
```

## Tree Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
option|无|object|echarts的option配置对象
splitItemNum|1|num|表示按照X份分割data中每个item数据，所分数据不够，单独余数追加一组item


# change logs

### 0.0.2
  + 发布到公网npm

### 0.0.1
  + 初始化项目
