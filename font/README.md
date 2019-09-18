
# hysight-font

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
import '@hysight/font'
```

## Notice
```
    各个子模块css中请不要私设其他未经设计指定的font-family字体
```


## Usage
```
    在app/index.js内头部加上下列代码
    import '@hysight/font';
    
    该字体库内含以下2款字体：
    汉仪旗黑 40s
    汉仪旗黑 60s
        
    默认全局字体为汉仪旗黑 40s；
    也可利用css class 挑选任一一款字体；
    
    example:
        <span class="hyfont-40s">字体</span>
        or
        <span class="hyfont-60s">字体</span>
        or
        <span>字体</span> // 默认全局hyfont-40s样式字体
        or
        css:font-family: "hyfont40s" | font-family: "hyfont60s";
```

## Available Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----


# change logs

### 0.0.3
  + 修复字体引入方式

### 0.0.2
  + 追加汉仪旗黑 40s

### 0.0.1
  + 初始化项目
