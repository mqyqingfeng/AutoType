(function() {
    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};


    var util = {
        extend: function(target) {
            for (var i = 1, len = arguments.length; i < len; i++) {
                for (var prop in arguments[i]) {
                    if (arguments[i].hasOwnProperty(prop)) {
                        target[prop] = arguments[i][prop]
                    }
                }
            }

            return target
        }
    };

    function AutoType(element, arr, options) {

        EventEmitter.call(this);

        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.arr = arr;
        // 会根据该数组的结果进行渲染
        this.textArr = [];
        this.options = util.extend({}, this.constructor.defaultOptions, options);

        this.index = 0;
        this.handle();
    }

    AutoType.VERSION = '1.0.0';

    AutoType.defaultOptions = {
        // 默认打字间歇 200 ms
        speed: 200,
        type: ''
    };

    var proto = AutoType.prototype = new EventEmitter;

    proto.constructor = AutoType;

    proto.handle = function() {

        var current = this.arr[this.index];

        if (!current) {
            this.render(true);
            this.emit('end')
            return;
        }

        switch(current.type) {
            case 'text':
                this.handleText(current);
                break;
            case 'wait':
                this.handleWait(current);
                break;
            case 'delete':
                this.handleDelete(current);
                break;
            case 'br':
                this.handleBr(current);
                break;
            case 'img':
                this.handleImg(current);
                break;
            default:
                this.handlePlainText(current);
        }

    };

    proto.handleText = function(obj) {
        var text = obj.text.split('');
        this.type(text, 0, obj.time ? obj.time : this.options.speed)
    };

    proto.type = function(text, index, time) {
        if (index < text.length) {
            this.textArr.push(text[index]);
            this.render();
            setTimeout(this.type.bind(this), time, text, ++index, time)
        } else {
            this.index++;
            this.handle();
        }
    };

    proto.render = function(isEnd) {
        this.element.innerHTML = this.textArr.join('') + (isEnd ? '' : this.options.type)
        this.element.scrollTop = this.element.scrollHeight;
    };

    proto.handleWait = function(obj) {
        this.index++;
        setTimeout(this.handle.bind(this), obj.time ? obj.time : this.options.speed)
    };

    proto.handleDelete = function(obj) {
        this.delete(obj.num, obj.time ? obj.time : this.options.speed)
    };

    proto.delete = function(remain, time) {
        if (remain > 0) {
            this.textArr.pop()
            this.render();
            setTimeout(this.delete.bind(this), time, --remain, time)
        }
        else {
            this.next()
        }

    };

    proto.handleBr = function(obj){
        this.textArr.push('<br /><br />');
        this.index++;
        setTimeout(this.handle.bind(this), obj.time ? obj.time : this.options.speed)
    };

    proto.handleImg = function(obj) {
        var result = ['<img '];
        for (var key in obj) {
            result.push(key + '="' + obj[key] + '" ')
        }
        result.push(' />')

        this.textArr.push(result.join(''))
        this.render()

        var self = this;
        setTimeout(function(){
            self.next()
        }, obj.time ? obj.time : this.options.speed)

    };

    proto.handlePlainText = function(obj) {
        this.textArr.push(obj)
        this.render()

        var self = this;
        setTimeout(function(){
            self.next()
        }, obj.time ? obj.time : this.options.speed)

    };

    proto.next = function(){
        this.index++;
        this.handle()
    };

    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = AutoType;
        }
        exports.AutoType = AutoType;
    } else {
        root.AutoType = AutoType;
    }

}());