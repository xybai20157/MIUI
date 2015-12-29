//头部购物车下拉框
var head_cart_but = document.getElementById("head_cart_but");
var cart_down = document.getElementById("cart_down");
document.body.onmouseover = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if (tar.id === "head_cart_but" || tar.id === "cart_down" || tar.parentNode === cart_down || tar.parentNode === head_cart_but) {
        cart_down.style.display = "block";
        head_cart_but.style.background = "#fff";
    }
    else {
        cart_down.style.display = "none";
        head_cart_but.style.background = "none";
    }
};


//搜索框下拉菜单
(function () {
    var search = document.getElementById("search");
    var search_list = document.getElementById("search_list");
    var liList = search_list.getElementsByTagName("li");
    var inputs = search.parentNode.getElementsByTagName("input");
    var hot_word = document.getElementById("hot_word");

    for (var i = 0; i < liList.length; i++) {
        liList[i].onmouseenter = function () {
            this.className = "hover";
        };
        liList[i].onmouseleave = function () {
            this.className = null;
        };
    }
    document.body.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        for (var i = 0; i < inputs.length; i++) {
            utils.addClass(inputs[i], "focus");
        }
        if (tar.id === "search") {
            search_list.style.display = "block";
            hot_word.style.display = "none";
        } else if (tar.tagName.toLowerCase() === "li") {
            search_list.style.display = "block";
        } else if (search.innerHTML != "") {
            search_list.style.display = "none";
        } else {
            hot_word.style.display = "block";
            search_list.style.display = "none";
            for (i = 0; i < inputs.length; i++) {
                utils.removeClass(inputs[i], "focus");
            }
        }
    };
})();



/*<li><a href=""><img src="images/h1.jpg"/></a>

    <p class="title"><a href="">红米手机2A 增强版</a></p>

<p class="price">特价499元</p></li>*/


var nav = document.getElementById("nav");
var oLis = utils.getElementsByClass("item", nav);
var nav_slider = document.getElementById("nav_slider");
var child=nav_slider.childNodes;
document.body.onmouseover=function(e){
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if(tar.className==="nav_slider"||tar.className==="item"||tar.className==="a1"||tar.className==="container"||tar.tagName.toLocaleLowerCase()==="li"||tar.className=="title"||tar.className=="price"||tar.tagName==="img"){
        nav_slider.style.display="block";
    }else{
        nav_slider.style.display="none";
    }
};


//首页左侧导航列表切换
(function () {
    var left_nav = document.getElementById("left_nav");
    var listLis = utils.getElementsByClass("left_navLi", left_nav);
    var allTag = utils.getElementsByClass("cat_list_all", left_nav);
    for (var i = 0; i < listLis.length; i++) {
        var cur = listLis[i];
        listLis[i].index = i;
        cur.onmouseover = function () {
            var child = utils.children(this)[1];
            var siblings = utils.siblings(this);
            utils.addClass(this, "select");
            child.style.display = "block";
            for (var j = 0; j < siblings.length; j++) {
                var othChild = utils.children(siblings[j])[1];
                othChild.parentNode.className = "left_navLi";
                othChild.style.display = "none";
            }
        };
        cur.onmouseout = function () {
            for (var i = 0; i < allTag.length; i++) {
                allTag[i].style.display = "none";
            }
            this.className=null;
        }
    }
})();



var dataAry = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg", "img/banner5.jpg"];

/*轮播图*/
~function () {
    //获取所需要的元素
    var bannerCon = document.getElementById("bannerCon");
    var bannerList = utils.getElementsByClass("bannerList", bannerCon);
    if (bannerList.length <= 0) return;
    bannerList = bannerList[0];

    var bannerTip = utils.getElementsByClass("bannerTip", bannerCon);
    if (bannerTip.length <= 0) return;
    bannerTip = bannerTip[0];

    var bLeft = utils.getElementsByClass("bLeft", bannerCon)[0];
    var bRight = utils.getElementsByClass("bRight", bannerCon)[0];

    //计算当前bannerImg的宽度和位置
    var bannerW = bannerCon.clientWidth, totalW = (dataAry.length + 2) * bannerW, count = dataAry.length + 2;
    utils.setGroupCss(bannerList, {
        width: totalW,
        left: -bannerW
    });

    //初始化绑定数据
    var initData = function () {
        var str = "";
        str += "<ul>";
        str += "<li><a href='/'><img src=" + "'img/o_loading.gif'" + "trueImg='" + dataAry[dataAry.length-1] + "' /></a></li>";
        for (var i = 0; i < dataAry.length; i++) {
            str += "<li><a href='/'><img src=" + "'img/o_loading.gif'" + "trueImg='" + dataAry[i] + "' /></a></li>";
        }
        str += "<li><a href='/'><img src=" + "'img/o_loading.gif'" + "trueImg='" + dataAry[0] + "' /></a></li>";
        str += "</ul>";
        bannerList.innerHTML = str;
        str = "";
        str += "<ul>";
        for (i = 0; i < dataAry.length; i++) {
            i === 0 ? str += "<li class='select'></li>" : str += "<li></li>";
        }
        str += "</ul>";
        bannerTip.innerHTML = str;
    };
    initData();

    //图片延迟加载
    var initAsyncImg = function () {
        var imgList = bannerList.getElementsByTagName("img");
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                if (!curImg.isLoad) {
                    var oImg = new Image;
                    oImg.src = curImg.getAttribute("trueImg");
                    oImg.onload = function () {
                        curImg.src = this.src;
                        oImg.isLoad = true;
                    }
                }
            }(i)
        }
    };
    window.setTimeout(initAsyncImg, 200);

    //实现焦点对齐
    var setTip = function (index) {
        var bannerTipList = bannerTip.getElementsByTagName("li");
        index < 0 ? index = bannerTipList.length - 1 : null;
        index >= bannerTipList.length ? index = 0 : null;
        for (var i = 0; i < bannerTipList.length; i++) {
            bannerTipList[i].className = i === index ? "hover" : null;
        }
    };


    //实现自动轮播
    var step = 1;
    var autoMove = function () {
        step++;
        if (step >= count) {
            utils.setCss(bannerList, "left", -1 * bannerW);
            step = 2;
        }
        setTip(step - 1);
        animate(bannerList, {left: -step * bannerW}, 500, 1);
    };

    //实现自动轮播
    bannerList.autoTimer = window.setInterval(autoMove, 3000);
    //实现tip点击切换
    var bannerTipList = bannerTip.getElementsByTagName("li");
    for (var i = 0; i < bannerTipList.length; i++) {
        bannerTipList[i].index = i;
        bannerTipList[i].onclick = function () {
            setTip(this.index);
            step = this.index + 1;
            animate(bannerList, {left: -step * bannerW}, 500, 1);
        };
    }
    //点击左右切换的
    bannerCon.onmouseover = function () {
        window.clearInterval(bannerList.autoTimer);
    };
    bLeft.onmouseover = function () {
        bLeft.className  = "bLeft hoverL";
    };
    bLeft.onmouseout = function () {
        bLeft.className  = "bLeft";
    };
    bRight.onmouseover = function () {
        bRight.className  = "bRight hoverR";
    };
    bRight.onmouseout = function () {
        bRight.className  = "bRight";
    };
    bannerCon.onmouseout = function () {
        bannerList.autoTimer = window.setInterval(autoMove, 3000);
    };

    bRight.onclick = autoMove;
    bLeft.onclick = function(){
        step--;
        if (step < 0) {
            utils.setCss(bannerList, "left", -(count - 2) * bannerW);
            step = 3;
        }
        setTip(step - 1);
        animate(bannerList, {left: -step * bannerW}, 500, 1);
    };
}();

