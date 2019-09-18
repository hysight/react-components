
# hysight-button

## npm 发布方法
```
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Preview
![效果预览图](../public/images/preview.png)

## Examples

```
import Button from '@hysight/button'
or
<Buttons
    type={'danger'}
    size={'middle'}
    shape={'circle'}
    onClick={this.props.handleBatDel}
>
```

## Usage
```
    npm install @hysight/button--save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/button --registry=http://192.168.1.207:5000
    then
    import Button from '@hysight/button'
```

## Available Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
children|无|node|按钮内容
type|default|string|按钮内容-list['default', 'primary', 'danger']
size|default|string|按钮大写-list['default', 'small', 'middle', 'large']
shape|default|string|按钮形状-list['default', 'circle']
onClick||Function|按钮事件


# change logs

### 0.0.5
  + 完善type is default的样式

### 0.0.1
  + 初始化项目
