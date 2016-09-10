"use strict";

/**
 * Created by wang on 16/9/7.
 */
$(function () {
    var input = $(".search input");
    input.on({
        focus: function focus() {
            if (this.value == "挑选您心仪的装修案例") {
                this.value = "";
            }
        },
        blur: function blur() {
            if (this.value == "") {
                this.value = "挑选您心仪的装修案例";
            }
        }
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
    /*----轮播------*/
    //banner config

    var banner_config = {
        num: 3,
        time: 3000
    };
    {
        (function () {
            var i = 0;
            setInterval(function () {
                var li = $(".banner-img li");
                if (i < banner_config.num - 1) {
                    li.eq(i).animate({
                        opacity: 0
                    }, 400, function () {
                        li.eq(i).index = 0;
                    });
                    li.eq(i + 1).animate({
                        opacity: 1
                    }, 400, function () {
                        li.eq(i).index = 1;
                    });
                    i++;
                } else {
                    li.eq(i).animate({
                        opacity: 0
                    }, 400, function () {
                        li.eq(i).index = 0;
                    });
                    li.eq(0).animate({
                        opacity: 1
                    }, 400, function () {
                        li.eq(i).index = 1;
                    });
                    i = 0;
                }
            }, banner_config.time);
        })();
    }
    /*---step广告hover---*/

    var _loop = function _loop(_i) {
        $(".step" + _i).hover(function () {
            $(".step" + _i + " img").eq(0).addClass("hid");
            $(".step" + _i + " img").eq(1).removeClass("hid");
        }, function () {
            $(".step" + _i + " img").eq(1).addClass("hid");
            $(".step" + _i + " img").eq(0).removeClass("hid");
        });
    };

    for (var _i = 1; _i < 10; _i++) {
        _loop(_i);
    }
}); //end

//# sourceMappingURL=common-compiled.js.map