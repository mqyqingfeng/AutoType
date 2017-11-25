# AutoType

## 介绍

原生 JavaScript 实现的自动打字效果。

## 效果图：

![演示图](https://raw.githubusercontent.com/mqyqingfeng/AutoType/master/demonstration.gif)

源码地址：

[https://mqyqingfeng.github.io/AutoType/](https://mqyqingfeng.github.io/AutoType/)

## 依赖

依赖 [EventEmitter](https://github.com/mqyqingfeng/EventEmitter)

## 大小

压缩后 2KB，gzip 压缩后更小。

## 下载

```js
git clone git@github.com:mqyqingfeng/AutoType.git
```

## 使用

```html
<script src="path/autotype.js"></script>
```

或者

```js
import AutoType from 'path/autotype.js'
```

## 示例

HTML

```html
<div id="content"></div>
```

CSS

```css
// 模拟光标效果
@keyframes blink {
  from { opacity: 0; }
  to { opacity: 1; }
}

.content::after {
  content: '|';
  animation: blink 1000ms infinite;
}
```

JavaScript

```js
var arr = [
    { type: 'text', text: '泻药，我家馍，又名静静，是个十足的女神经，嗯？'},
    { type: 'wait', time: 900 },
    { type: 'delete', num: 4},
    { type: 'text', text: '，嗯!'},
    { type: 'br' },
    { type: 'text', text: '她温柔美丽，善良大方'},
    { type: 'text', text: '，国色天香，沉鱼落雁，如花似玉，闭月羞花，贤良淑德，花容月貌，秋水伊人，一笑倾城，冰清玉洁，娇俏佳人，朱颜玉润，玉骨冰肌，窈窕淑女，美若天仙，一顾倾城，才智国人，出水芙蓉，阿娇金屋，闭月羞花，逞娇呈美，春暖花香，春色满园……', time: 50},
    { type: 'br' },
    {type: 'text', text: '给你们看张她的照片吧~'},
    { type: 'wait', time: 900 },
    { type: 'img', src: 'img/bishi2.jpg', id: "cat", style: "width: 50%;display: block;margin-left: auto;margin-right: auto;margin-top: 20px;margin-bottom: 20px;" },
    { type: 'wait', time: 900 },
    { type: 'text', text: '是不是美美哒~' }

]

var autoType = new AutoType("#content", arr, {
    // 设置打字时间，表示在无设置的情况下，打字间隔为 200ms
    speed: 200
});
autoType.once("end", function() {
    console.log('事件结束');
})
```

## API

### 初始化

```js
var autotype = new AutoType(selector, actions, options);
```

### actions

`actions` 为一个数组，表示要执行的脚本，有 5 种类型：

**text 类型**

```js
{ type: 'text', text: '要打印的文字', time: 200}
```

文字会以 200ms 的速度逐个打印。

如果不设置 time，默认使用 options 中的 time 设置，如果 options 中没有设置 time，默认为 200ms。

**wait 类型**

```js
{ type: 'wait', time: 900 }
```

光标会暂停 900ms。

**delete 类型**

```js
{ type: 'delete', num: 4, time: 200},
```

删除 4 个字符，也可以不设置 time 。

**br 类型**

```js
{ type: 'br' }
```

添加一个换行。

**img 类型**

```js
{ type: 'img', src: 'img/bishi2.jpg', id: "cat", style: "width: 50%;" }
```

添加一张图片，你设置的所有属性都会被添加该元素上。

**直接设置文字**

你也可以直接设置文字，会一次性全打出来：

```js
var arr = [
    { type: 'text', text: '这段文字会逐个打出来' },
    '这段文字会一次性打出来'
]
```

设置你可以直接设置 HTML:

```js
var arr = [
    '这段文字会一次性打出来',
    '<p>不会转义，直接插入</p>'
]
```

### options

**1.time**

默认值为 `200`，表示当在 actions 中不设置 time 时，默认打字间隔为 200ms。

### 事件绑定

当所有 action 执行完毕时执行。

```js
autoType.on("end", function() {
    console.log('打字结束')
})
```

使用 once 可以只执行一次：

```js
autoType.once("end", function() {
    console.log('打字结束')
})
```
