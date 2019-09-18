
# hysight-gapPieEchart

## npm 发布方法
```
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Examples

```
import GapPieEchart from '@hysight/gapPieEchart';

<GapPieEchart
    option={Option}
    splitItemNum={1}
/>
```

## Usage
```
    npm install @hysight/gapPieEchart --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/gapPieEchart --registry=http://192.168.1.207:5000
    then
    import GapPieEchart from '@hysight/gapPieEchart';
    
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

### 0.0.1
  + 初始化项目
