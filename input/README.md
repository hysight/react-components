
# hysight-input

## npm 发布方法
```sh
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Examples

```js
import Input from '@hysight/input';

const TextArea = Input.TextArea;

```

## Usage
```sh
    npm install @hysight/input --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/input --registry=http://192.168.1.207:5000
```

## Available Props

#### Input Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
 value | '' | string/number | input的value
 size | '' | string | 三种选择 'large','small', ''
 prefix | null | element | input 最左边的图标
 suffix | null | element | input 最右边的图标
 className | '' | string | 类名
 id | '' | string | id属性
 style | {} | object | 样式
 placeholder | '' | string/number | input提示内容
 onPressEnter | void() | func | 按下enter的回调

#### TextArea Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
 value | '' | string/number | input的value
 className | '' | string | 类名
 style | {} | object | 样式
 placeholder | '' | string/number | input提示内容
 name | '' | string | name属性
 id | '' | string | id属性

# change logs

### 0.0.2
  + 修改 README.md
  
### 0.0.1
  + 初始化项目
