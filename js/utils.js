var utils = {
    listToArray: function listToArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    getElementsByClass: function getElementsByClass(strClass, context) {
        context = context || document;
        if ("getElementsByClassName" in document) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        var strAry = strClass.replace(/(^ +)|( +$)/g, "").split(/\s+/), tagList = context.getElementsByTagName("*"), ary = [];
        for (var i = 0; i < tagList.length; i++) {
            var curTag = tagList[i];
            curTag.flag = true;
            for (var k = 0; k < strAry.length; k++) {
                var reg = new RegExp("(^| +)" + strAry[k] + "( +|$)");
                if (!reg.test(curTag.className)) {
                    curTag.flag = false;
                    break;
                }
            }
            curTag.flag ? ary[ary.length] = curTag : null;
        }
        return ary;
    },
    getCss: function (curEle, attr) {
        var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/, val = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                var temp = curEle.currentStyle["filter"], tempReg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = tempReg.test(temp) ? tempReg.exec(temp)[1] : "1";
                val = parseFloat(val) / 100;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        return reg.test(val) ? parseFloat(val) : val;
    },
    setCss: function (curEle, attr, value) {
        var reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
        if (attr === "opacity") {
            if (value >= 0 && value <= 1) {
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            }
        } else if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    },
    setGroupCss: function (curEle, options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this.setCss(curEle, key, options[key]);
            }
        }
    },
    children: function children(curEle, tagName) {
        var nodeList = curEle.childNodes, ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            if (curNode.nodeType === 1) {
                if (typeof tagName === "string") {
                    var curNodeLow = curNode.nodeName.toLowerCase();
                    var tagNameLow = tagName.toLowerCase();
                    if (curNodeLow === tagNameLow) {
                        ary[ary.length] = curNode;
                    }
                    continue;
                }
                ary[ary.length] = curNode;
            }
        }
        return ary;
    },
    prev: function prev(curEle) {
        if ("previousElementSibling" in curEle) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    },
    prevAll: function prevAll(curEle) {
        var pre = this.prev(curEle), ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    },

    nextAll: function nextAll(curEle) {
        var nex = this.next(curEle), ary = [];
        while (nex) {
            ary[ary.length] = nex;
            nex = this.next(nex);
        }
        return ary;
    },
    next: function next(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    },
    siblings: function siblings(curEle) {
        var preA = this.prevAll(curEle), nexA = this.nextAll(curEle);
        return preA.concat(nexA);
    },
    getIndex: function getIndex(curEle) {
        return this.prevAll(curEle).length;
    },
    addClass: function (ele, strClass) {
        var reg = new RegExp("(?:^| )" + strClass + "(?: |$)");//这个正则是经过改进的
        if (reg.test(ele.className)) {
        } else {
            ele.className = ele.className.trim() + " " + strClass;
        }
    }, removeClass: function (ele, strClass) {
        if (!(ele && ele.nodeType == 1)) {
            alert('第一参数ele需要是一个DOM元素对象');
            throw new Error('第一参数ele需要是一个DOM元素对象');
        }
        if (typeof strClass != 'string') {
            alert('第二参数必须为string类型');
            throw new Error('第二参数必须为string类型');

        }

        var reg = new RegExp("(?:^| )" + strClass + "(?: |$)", "g");
        ele.className = ele.className.replace(reg, '').trim();
    }
};


