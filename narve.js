"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Narve = exports.nr = void 0;
exports.htmlToComponent = htmlToComponent;
function createElem(tag, attributes) {
    if (tag === undefined)
        tag = "div";
    var elem = document.createElement(tag);
    if (attributes) {
        Object.entries(attributes).forEach(function (_c) {
            var key = _c[0], value = _c[1];
            elem.setAttribute(key, value);
        });
    }
    return elem;
}
function createComponent(tag, attributes) {
    var _c;
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var component = new ((_c = Narve.Component).bind.apply(_c, __spreadArray([void 0, tag, attributes], children, false)))();
    return component;
}
function deepClone(val) {
    var ret;
    try {
        ret = htmlToComponent(val.elem.cloneNode(true));
    }
    catch (_c) {
        console.warn("couldn't deepClone");
        return (0, exports.nr)();
    }
    return ret;
}
function querySelector(querySelector) {
    var component = new Narve.Component();
    component.querySelector(querySelector);
    return component;
}
exports.nr = createComponent;
var Narve;
(function (Narve) {
    Narve.q = querySelector;
    var Component = /** @class */ (function () {
        function Component(tag, attr) {
            var _c;
            var children = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                children[_i - 2] = arguments[_i];
            }
            this.children = new NarveComponentArray(this);
            this.elem = createElem(tag, attr || {});
            if (children.every(function (v) { return v instanceof Narve.Component; })) {
                (_c = this.children).set.apply(_c, children);
            }
            else {
                this.setInnerText(children.join(''));
            }
        }
        Component.prototype.querySelector = function (querySelector) {
            var el = document.querySelector(querySelector);
            if (el === null)
                return null;
            this.elem = el || createElem("div");
            this.children = htmlToComponent(this.elem).children;
            return this;
        };
        Component.prototype.replaceWith = function (component) {
            if (component instanceof Component) {
                this.elem.replaceWith(component.elem);
                this.elem = component.elem;
                this.children = component.children;
            }
            else {
                this.elem.replaceWith(component);
                this.elem = component;
                this.children = htmlToComponent(component).children;
            }
        };
        Component.prototype.removeChild = function (component) {
            var index = this.children.findIndex(function (v) {
                return v.elem === component.elem;
            });
            if (index !== -1) {
                this.children.delete(index, 1);
            }
        };
        Component.prototype.removeElem = function () {
            this.elem.remove();
        };
        Component.prototype.setInnerText = function (text) {
            this.children = new NarveComponentArray(this);
            this.elem.innerText = text;
        };
        Component.prototype.switchFocus = function (component, display) {
            if (display === void 0) { display = "block"; }
            this.children.forEach(function (c) { return c.hide(); });
            component.display();
        };
        Component.prototype.display = function (display) {
            if (display === void 0) { display = "block"; }
            this.elem.style.display = display;
        };
        Component.prototype.hide = function () {
            this.elem.style.display = "none";
        };
        return Component;
    }());
    Narve.Component = Component;
})(Narve || (exports.Narve = Narve = {}));
function htmlToComponent(htmlElem) {
    var component = new Narve.Component();
    component.elem = htmlElem;
    if (htmlElem.children.length === 0) {
        return component;
    }
    var childrenArray = new Array();
    for (var i = 0; i < htmlElem.children.length; i++) {
        childrenArray.push(htmlToComponent(htmlElem.children[i]));
    }
    component.children = new (NarveComponentArray.bind.apply(NarveComponentArray, __spreadArray([void 0, component], childrenArray, false)))();
    return component;
}
var NarveComponentArray = /** @class */ (function (_super) {
    __extends(NarveComponentArray, _super);
    function NarveComponentArray(parent) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, NarveComponentArray.prototype);
        _this.parent = parent;
        children.forEach(function (child, i) {
            _this[i] = child;
        });
        return _this;
    }
    NarveComponentArray.prototype.copyWithin = function (target, start, end) {
        target = this.__REG_START__(target);
        start = this.__REG_START__(start);
        end = this.__REG_END__(end);
        if (start >= this.length)
            return this;
        if (end <= start)
            return this;
        if (target === start)
            return this;
        if (target < start) {
            for (var i = 0; i < end - start; i++) {
                if (i + start >= this.length)
                    break;
                if (i + target >= this.length)
                    break;
                this.replace(i + target, this[i + start]);
            }
        }
        else {
            for (var i = end - start - 1; i >= 0; i--) {
                if (i + start >= this.length)
                    continue;
                if (i + target >= this.length)
                    continue;
                this.replace(i + target, this[i + start]);
            }
        }
        return this;
    };
    NarveComponentArray.prototype.fill = function (value, start, end) {
        start = this.__REG_START__(start);
        end = this.__REG_END__(end);
        if (start >= this.length || end <= start)
            return this;
        for (var i = start; i < end; i++)
            this.replace(i, value);
        return this;
    };
    NarveComponentArray.prototype.pop = function () {
        var ret = _super.prototype.pop.call(this);
        if (ret === undefined)
            return undefined;
        ret.removeElem();
        return ret;
    };
    NarveComponentArray.prototype.push = function () {
        var _this = this;
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        _super.prototype.push.apply(this, children);
        children.forEach(function (c) {
            _this.parent.elem.insertAdjacentElement("beforeend", c.elem);
        });
        return this.length;
    };
    NarveComponentArray.prototype.reverse = function () {
        var l = 0, r = this.length - 1;
        while (r - l > 0) {
            var t = deepClone(this[l]);
            this.replace(l, deepClone(this[r]));
            this.replace(r, t);
            l++;
            r--;
        }
        return this;
    };
    NarveComponentArray.prototype.shift = function () {
        var ret = _super.prototype.shift.call(this);
        if (ret === undefined)
            return undefined;
        ret.removeElem();
        return ret;
    };
    NarveComponentArray.prototype.sort = function (compreFun) {
        var _this = this;
        var s = __spreadArray([], this.map(function (v) { return deepClone(v); }), true);
        qsort(s, compreFun);
        s.forEach(function (v, i) { return _this.replace(i, v); });
        return this;
    };
    /**
     * @param start can't be bigger than this.length
     */
    NarveComponentArray.prototype.splice = function (start, deleteCount) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        this.delete(start, deleteCount);
        this.insert.apply(this, __spreadArray([start], rest, false));
        return this;
    };
    NarveComponentArray.prototype.unshift = function () {
        var _this = this;
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        rest.forEach(function (c) {
            return _this.parent.elem.insertAdjacentElement("afterbegin", c.elem);
        });
        _super.prototype.unshift.apply(this, rest);
        return this.length;
    };
    NarveComponentArray.prototype.replace = function (i, val) {
        i = this.__REG_START__(i);
        if (i >= this.length)
            i = this.length - 1;
        this[i].replaceWith(val.elem.isConnected ? deepClone(val) : val);
    };
    NarveComponentArray.prototype.delete = function (start, deleteCount) {
        start = this.__REG_START__(start);
        if (start >= this.length)
            return [];
        if (deleteCount === undefined)
            deleteCount = this.length - start;
        var ret = _super.prototype.splice.call(this, start, deleteCount);
        ret.forEach(function (v) { return v.removeElem(); });
        return ret;
    };
    NarveComponentArray.prototype.insert = function (start) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        start = this.__REG_START__(start);
        if (start >= this.length) {
            console.warn('The value of index is too large. "insert" is regarded as "append"');
            this.push.apply(this, children);
            return;
        }
        var insertPosHTML = this[start].elem;
        children.forEach(function (child) {
            insertPosHTML.before(child.elem);
        });
        _super.prototype.splice.apply(this, __spreadArray([start, 0], children, false));
        return this;
    };
    NarveComponentArray.prototype.set = function () {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        this.delete(0);
        this.push.apply(this, children);
    };
    NarveComponentArray.prototype.map = function (callback) {
        var mapped = Array();
        this.forEach(function (component, index, array) {
            mapped.push(callback(component, index, array));
        });
        return mapped;
    };
    NarveComponentArray.prototype.__REG_START__ = function (x) {
        if (x === undefined)
            x = 0;
        if (x < 0)
            x += this.length;
        if (x < 0)
            x = 0;
        return x;
    };
    NarveComponentArray.prototype.__REG_END__ = function (x) {
        if (x === undefined || x >= this.length)
            x = this.length;
        if (x < 0)
            x += this.length;
        if (x < 0)
            x = 0;
        return x;
    };
    return NarveComponentArray;
}(Array));
function qsort(arr, compareFun, l, r) {
    var _c;
    if (compareFun === void 0) { compareFun = function (a, b) {
        var _a = JSON.stringify(a);
        var _b = JSON.stringify(b);
        return (_a > _b) ? 1 : (_a < _b) ? -1 : 0;
    }; }
    if (l === void 0) { l = 0; }
    if (r === void 0) { r = arr.length - 1; }
    if (r < 0)
        return;
    if (r >= arr.length)
        return;
    if (l < 0)
        return;
    if (l >= arr.length)
        return;
    if (l > r)
        return;
    var mid_i = Math.floor((l + r) / 2);
    var mid_v = arr[mid_i];
    var i = l;
    var k = r;
    while (1) {
        while (compareFun(arr[i], mid_v) < 0)
            i++;
        while (compareFun(arr[k], mid_v) > 0)
            k--;
        if (i <= k) {
            _c = [arr[k], arr[i]], arr[i] = _c[0], arr[k] = _c[1];
            i++;
            k--;
        }
        if (i > k) {
            break;
        }
    }
    if (l < k)
        qsort(arr, compareFun, l, k);
    if (i < r)
        qsort(arr, compareFun, i, r);
    return arr;
}
