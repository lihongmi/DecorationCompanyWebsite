"use strict";

/**
 * Created by wang on 16/9/7.
 */

$(function () {

    /*----搜索----*/
    var input = $(".search input");
    input.on({
        focus: function focus() {
            if (this.value == "为您精心挑选") {
                this.value = "";
            }
        },
        blur: function blur() {
            if (this.value == "") {
                this.value = "为您精心挑选";
            }
        }
    });
    $(".search-list").hover(function () {
        $(".search-ul").css("display", "block").click(function (event) {
            $(".search-list").find("span").text($(event.target).text());
        });
    }, function () {
        $(".search-ul").css("display", "none");
    });

    $(".free-head-r").click(function () {
        $(this).addClass("active");
        $(".free-head-l").removeClass("active");
    });
    $(".free-head-l").click(function () {
        $(this).addClass("active");
        $(".free-head-r").removeClass("active");
    });
    //电话号码
    var phone = $("#phone-num");
    phone.on({
        focus: function focus() {
            if (this.value == "手机号码") {
                this.value = "";
            }
        },
        blur: function blur() {
            if (this.value == "") {
                this.value = "手机号码";
            }
        }
    });

    /*---------导航-------------*/
    $(".outer-li").hover(function () {
        $(this).find(".nav-slide").css("display", "block");
    }, function () {
        $(this).find(".nav-slide").css("display", "none");
    });

    $(".app").hover(function () {
        $(".appqr").css("display", "block");
    }, function () {
        $(".appqr").css("display", "none");
    });

    /*----------轮播----------*/

    {
        (function () {
            var banner = $(".banner-img");
            var li = banner.find("li");
            var dot = $(".dot");
            //轮播插件 by 王浩然
            {
                (function () {

                    //计时器
                    var start = function start() {
                        timer = setInterval(function () {
                            move();
                        }, banner_config.time);
                    };

                    //切换动画


                    var animate = function animate(from, to) {
                        banner_config.banner.eq(from).animate({
                            opacity: 0
                        }, 400, function () {
                            banner_config.banner.eq(from).css("z-index", 0);
                        });
                        banner_config.index.eq(from).removeClass("on");
                        banner_config.index.eq(to).addClass("on");
                        banner_config.banner.eq(to).animate({
                            opacity: 1
                        }, 400, function () {
                            banner_config.banner.eq(to).css("z-index", 1);
                        });
                    };

                    var move = function move() {
                        if (i < banner_config.num - 1) {
                            animate(i, i + 1);
                            i++;
                        } else {
                            animate(i, 0);
                            i = 0;
                        }
                    };

                    var banner_config = {
                        num: 3, //轮播图数量
                        time: 3000, //动画时间
                        banner: li, //对应的各个图片外层节点
                        index: dot };
                    var i = 0;
                    var timer = void 0;

                    //鼠标进出事件
                    banner.on({
                        mouseenter: function mouseenter() {
                            $(".prev,.next").fadeTo("show", 0.5);
                            clearInterval(timer);
                        },
                        mouseleave: function mouseleave() {
                            $(".prev,.next").fadeTo("show", 0);
                            start();
                        }
                    });
                    //前后箭头点击事件
                    $(".prev").click(function () {
                        if (i > 0) {
                            banner_config.banner.eq(i).animate({
                                opacity: 0
                            }, 400, function () {
                                li.eq(i).index = 0;
                            });
                            banner_config.index.eq(i).removeClass("on");
                            banner_config.index.eq(i - 1).addClass("on");
                            banner_config.banner.eq(i - 1).animate({
                                opacity: 1
                            }, 400, function () {
                                banner_config.banner.eq(i).index = 1;
                            });
                            i--;
                        } else {
                            banner_config.banner.eq(i).animate({
                                opacity: 0
                            }, 400, function () {
                                banner_config.banner.eq(i).index = 0;
                            });
                            banner_config.index.eq(i).removeClass("on");
                            banner_config.index.eq(banner_config.num - 1).addClass("on");
                            banner_config.banner.eq(banner_config.num - 1).animate({
                                opacity: 1
                            }, 400, function () {
                                banner_config.banner.eq(i).index = 1;
                            });
                            i = banner_config.num - 1;
                        }
                    });
                    $(".next").click(function () {
                        move();
                    });
                    //index的点击事件

                    $(".banner-dot li").hover(function (event) {
                        var number = $(".banner-dot li").index(event.target);
                        if (i != number) {
                            //目标是当前不进行切换
                            animate(i, number);
                            i = number;
                        }
                    }, function () {});

                    start();
                })();
            }
        })();
    }

    /*---step广告hover---*/

    for (var i = 1; i < 11; i++) {
        $(".step" + i).hover(function () {
            $(this).find("img").eq(0).addClass("hid");
            $(this).find("img").eq(1).removeClass("hid");
        }, function () {
            $(this).find("img").eq(1).addClass("hid");
            $(this).find("img").eq(0).removeClass("hid");
        });
    }
    /*---foot-nav---*/
    var foot_nav = $(".friend-nav a");
    for (var _i = 0; _i < foot_nav.length; _i++) {
        foot_nav.eq(_i).data("num", _i);
    }
    foot_nav.hover(function () {
        init();
        $(this).addClass("hov");
        $(".friend-list").eq($(this).data("num")).addClass("friend-show");
    }, function () {});

    function init() {
        for (var _i2 = 0; _i2 < foot_nav.length; _i2++) {
            $(".friend-list").eq(_i2).removeClass("friend-show");
            foot_nav.eq(_i2).removeClass("hov");
        }
    }
}); //end

//# sourceMappingURL=common-compiled.scripts.map

//# sourceMappingURL=common-compiled-compiled.js.map