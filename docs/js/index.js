var content = document.getElementById("answer-content");

// 设置答题框的高度
var getViewPortSize = function() {
    var w = window;
    if (w.innerWidth != null) return { x: w.innerWidth, y: w.innerHeight };
    var d = w.document;
    // 表明是标准模式
    if (document.compatMode == "CSS1Compat") {
        return {
            x: d.documentElement.clientWidth,
            y: d.documentElement.clientHeight
        }
    }
    // 怪异模式
    return { x: d.body.clientWidth, y: d.body.clientHeight }
}

this.clientHeight = getViewPortSize().y;
this.clientWidth = getViewPortSize().x;

content.style.height = this.clientHeight - this.clientWidth / 2 + 'px'

var addClass = function(element, className) {
    var classNames = element.className.split(/\s+/);
    if (classNames.indexOf(className) == -1) {
        classNames.push(className);
    }
    element.className = classNames.join(' ')
}

// 打字效果
var arr = [
    { type: 'text', text: '泻药，我家馍，又名静静，是个十足的女神经，嗯？' },
    { type: 'wait', time: 900 },
    { type: 'delete', num: 4 },
    { type: 'text', text: '，嗯!' },
    { type: 'br' },
    { type: 'text', text: '她温柔美丽，善良大方' },
    { type: 'text', text: '，国色天香，沉鱼落雁，如花似玉，闭月羞花，贤良淑德，花容月貌，秋水伊人，一笑倾城，冰清玉洁，娇俏佳人，朱颜玉润，玉骨冰肌，窈窕淑女，美若天仙，一顾倾城，才智国人，出水芙蓉，阿娇金屋，闭月羞花，逞娇呈美，春暖花香，春色满园……', time: 50 },
    { type: 'br' },
    { type: 'text', text: '给你们看张她的照片吧~' },
    { type: 'wait', time: 900 },
    { type: 'img', src: 'img/bishi2.jpg', id: "cat", style: "width: 50%;display: block;margin-left: auto;margin-right: auto;margin-top: 20px;margin-bottom: 20px;" },
    { type: 'wait', time: 900 },
    // { type: 'delete', num: 1, time: 1000 },
    { type: 'text', text: '是不是美美哒~' }
]

var autoType = new AutoType(content, arr);
autoType.once("end", function() {
    addClass(content, 'end')
})