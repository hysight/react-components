<!--
 * @Author: zhangb
 * @Date: 2019-09-18 16:26:07
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-04 15:24:23
 * @Description: 
 -->

# hysight-message

## npm 发布方法
```sh
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Examples

```js
import message from '@hysight/message';

message.success('success');
// message.success('success', 3000);
message.error('error');

```

## Usage
```sh
    npm install @hysight/message --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/message --registry=http://192.168.1.207:5000
```

## Available Props



# change logs

### 0.0.3
  + 发布到公网npm
  
### 0.0.1
  + 初始化项目
