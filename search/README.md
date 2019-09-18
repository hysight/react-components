
# hysight-search

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
import Search from '@hysight/search'
or
<Search
    size={'middle'}
    shape={'gray'}
    style={{ width: '100%' }}
    placeholder={'输入关键词搜索'}
    onChange={(e) => console.log(e)}
/>
```

## Usage
```
    npm install @hysight/search --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/search --registry=http://192.168.1.207:5000
    then
    import Search from '@hysight/search'
```

## Available Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
placeholder||string|placeholder
size|default|string|按钮尺寸-list['default', 'small', 'middle', 'large']
shape|default|string|按钮形状-list['default', 'circle', 'gray']
style||object|style
onPressEnter||Function|键盘enter事件
onChange||Function|键盘onChange事件
...other input pointerEvent||Function|其他input原生事件


# change logs

### 0.0.2
  + 修改README.md

### 0.0.1
  + 初始化项目
