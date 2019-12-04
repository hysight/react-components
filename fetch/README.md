
# hysight-fetch

### npm 发布方法
```sh
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

### Usage
```js
import Fetch from '@hysight/fetch';

// get, delete, etc.
Fetch(url, {
    params: {key: value}
});

// post, put, etc.
// Content-Type -> application/x-www-form-urlencoded | multipart/form-data | application/json 等
Fetch(url, {
    method: 'POST',
    data: {key: value},// Content-Type设置multipart/form-data, data建议可设置object即可，FormData也算可以。|| Content-Type不设置的话，若想上传文件，data必须设置FormData格式
    headers: {
        'Content-Type': 'application/json'
    }
})

```
**注意**：`params` 和 `data` 字段是区别当前请求 `GET类型` 或 `POST类型` 的方式。

### Default Config

`hysight-fetch` 提供了一些默认的配置可以简化使用时候的操作。

```js

Fetch().default.minorUrl = (url) => url; // 可对纯url部分进行篡改动作，例如动态版本version api
Fetch().default.baseUrl = '';
Fetch().default.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Fetch().default.headers['Authorization'] = '';

// 推荐在主入口模块中导入Fetch，并手动指定以上配置
// eg.

// 后缀url部分
Fetch().default.minorUrl = (url) => {

    // 可自定义处理为url增加不同业务处理逻辑方式
    // eg
    console.log('url被变更了', url);
    return url.replace(/\{version\}/g, 'v1');

};

// 前缀协议/ip/端口部分
Fetch().default.baseUrl = 'http://192.168.1.1';
or
Fetch().default.baseUrl = (url) => {

    // return 'http://192.168.1.207:4024';
    console.log('-=-=', Fetch());
    return process.env.NODE_ENV === 'development'
        ? Fetch().use([
            Fetch().proxy(url)('^/hymodel/home', {
                target: 'http://192.168.1.207:4024'
            }),
            Fetch().proxy(url)('^/hymodel/data', {
                target: 'http://192.168.1.207:4020'
            })
            // proxy(url)('^.*', {
            //     target: api.baseUrl
            // })
        ], api.baseUrl)
        : api.baseUrl;

};
Fetch().default.headers['Content-Type'] = 'application/json';
Fetch().default.headers['Authorization'] = localStorage.getItem('token');

// 每次请求都将自动携带 token 和 baseUrl
// Fetch('http://192.168.1.1/users')  ->  Fetch('/users')

```


### Interceptors

为满足请求及响应时的特殊要求，`hysight-fetch` 提供了两个拦截器。
和默认配置相似，推荐在主入口模块中配置。

#### 请求拦截器
在每个请求发出的时候，都会携带请求配置进入请求拦截器。

```js

// default
Fetch().interceptors.request = function(config) {

    return config;
}

```

**Usage**
例如：我只需要给所有的 `POST` 请求添加 `Authorization` 字段。
在操作完成后请 **务必** 返回 `config` 配置。
```js

Fetch().interceptors.request = function(config) {

    return config.method === 'POST'
        ? Object.assign(
            {},
            config,
            {
                headers: {
                    ...config.headers,
                    'Authorization': localStorage.getItem('token')
                }
            }
        ) : config;
}

```

#### 响应拦截器
在每个请求响应后，都会携带响应结果进入响应拦截器。

```js

// default
Fetch().interceptors.response = function(response) {

    return response;
    
}

```

**Usage**
例如：用户 `token` 失效，跳转至 `/login`。
```js

Fetch().interceptors.response = function(response) {

    switch(response.data.code) {
        case -1:
            message.error('token失效，请重新登录');
            history.pushState('/login');
            localStorage.clearItem('token');
            return result;
        case ...
    }
}


```

# change logs

### 0.2.2
  + 发布到公网npm

### 0.2.1
  + 在default或fetch 第二个参数对象里，扩展fetch其余参数，例如credentials,mode等等同级参数

### 0.2.0
  + 修改bug

### 0.1.9
  + 支持fetch原生的上传文件FormData多文件等

### 0.1.8
  + 追加status等到返回数据里

### 0.1.7
  + 移除固定Authorization

### 0.1.6
  + 增加default中minorUrl func方法

### 0.1.5
  + 修复请求中携带headers继承关系-修复bug

### 0.1.4
  + 修复请求中携带headers继承关系

### 0.1.3
  + 修复请求 throw new Error

### 0.1.2
  + 修复默认method GET

### 0.1.0
  + 重构+扩展baseUrl方法
  
### 0.0.8
  + 解决 `interceptor` 无法正常执行bug。

### 0.0.7
  + 不再检查 `http` 网络请求状态，交由用户拦截器负责。

### 0.0.6
  + 简化使用方式
  + Fetch(url, config) 中，`url` 存在 `http(s)` 时，`baseUrl` 无效。

### 0.0.5
  + 解决 `DELETE` 传参错误问题。

### 0.0.4
  + 解决 `POST`, `PUT` 请求时，请求头缺少参数。

### 0.0.3
  + 更改 `README.md` 中 localeStorage -> localStorage

### 0.0.2
  + 修复bug，处理 GET 请求 url 中存在 `?${key}=${value}` 的情况
  
### 0.0.1
  + 初始化项目