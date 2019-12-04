
# hysight-upload

## npm 发布方法
```
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Examples

```
import Upload from '@hysight/upload';
const {Dragger} = Upload;

and

<Dragger
    headers={{Authorization: localStorage.getItem('token')}}
    action={'http://192.168.1.207:4000/hysightdata/dataset/project/484/file'}
    accept={'application/vnd.ms-excel'}
    onChange={(info) => this.handleUploadSuccess(info)}
/>
or
<Upload
    headers={{Authorization: localStorage.getItem('token')}}
    action={'http://192.168.1.207:4000/hysightdata/dataset/project/484/file'}
    accept={'application/vnd.ms-excel'}
    onChange={(info) => this.handleUploadSuccess(info)}
>
    <button type={'button'}>测试上传</button>
</Upload>

```

## Notice
upload组件大部分代码，参照antd upload以及rc-upload思路写出的简化版，[来源antd upload](http://design.alipay.com/develop/web/components/upload/#API)

## Usage
```
    npm install @hysight/upload --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/upload --registry=http://192.168.1.207:5000
    then
    import Upload from '@hysight/upload'
```

Prop|Default|Type|Description
:----|:-----|:-----|:-----
name|'file'|string|发到后台的文件参数名
defaultFileList|无|arr|默认已经上传的文件列表
fileList|无|arr|已经上传的文件列表（受控），使用此参数时，如果遇到 onChange 只调用一次的问题
action|无|string|必选参数, 上传的地址
data|无|object/func(file)|上传所需参数或返回上传参数的方法
headers|无|object|设置上传的请求头部，IE10 以上有效
multiple|false|bool|是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。
accept|无|string|接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)
beforeUpload|无|(file, fileList) => boolean &#124; Promise|上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。注意：该方法不支持老 IE。
customRequest|无|func|通过覆盖默认的上传行为，可以自定义自己的上传实现
onChange|无|func|上传文件改变时的状态，详见 onChange
disabled|false|bool|是否禁用
withCredentials|false|bool|上传请求时是否携带 cookie

## Props

### onChange
> 上传中、完成、失败都会调用这个函数。
文件状态改变的回调，返回为：
```
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```
1. [file] 当前操作的文件对象。
```
{
   uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
   name: 'xx.png'   // 文件名
   status: 'done',  // 状态有：uploading done error removed
   response: '{"status": "success"}',  // 服务端响应内容
}
```
> 开始无论是否多选，均为一个对象。
2. [fileList] 当前的文件列表。
3. [event] 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

# change logs

### 0.0.4
  + 发布到公网npm

### 0.0.3
  + 完善Dragger Props自定义children

### 0.0.2
  + 完善MD文档

### 0.0.1
  + 初始化项目
