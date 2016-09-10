/**
 * Created by wang on 16/9/7.
 */
$(function () {
    let input = $(".search input");
    input.on({
        focus: function () {
            if (this.value == "挑选您心仪的装修案例") {
                this.value = "";
            }
        },
        blur: function () {
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
    let phone = $("#phone-num");
    phone.on({
        focus: function () {
            if (this.value == "手机号码") {
                this.value = "";
            }
        },
        blur: function () {
            if (this.value == "") {
                this.value = "手机号码";
            }
        }
    });
    /*----轮播------*/
    //banner config

    let banner_config = {
        num: 3,
        time: 3000,
    };
    {
        let i = 0;
        setInterval(function () {
            let li = $(".banner-img li");
            if (i < banner_config.num - 1) {
                li.eq(i).animate({
                    opacity: 0,
                }, 400, function () {
                    li.eq(i).index = 0
                });
                li.eq(i + 1).animate({
                    opacity: 1,
                }, 400, function () {
                    li.eq(i).index = 1
                });
                i++;
            } else {
                li.eq(i).animate({
                    opacity: 0,
                }, 400, function () {
                    li.eq(i).index = 0
                });
                li.eq(0).animate({
                    opacity: 1,
                }, 400, function () {
                    li.eq(i).index = 1
                });
                i = 0;
            }
        }, banner_config.time)
    }
    /*---step广告hover---*/
    for (let i = 1; i < 10; i++) {
        $(".step" + i).hover(function () {
            $(".step" + i + " img").eq(0).addClass("hid");
            $(".step" + i + " img").eq(1).removeClass("hid");
        }, function () {
            $(".step" + i + " img").eq(1).addClass("hid");
            $(".step" + i + " img").eq(0).removeClass("hid");
        });
    }


    /*---foot-nav---*/
    {
        let foot_nav = $(".friend-nav a");
        for (let i = 0; i < foot_nav.length; i++) {
            foot_nav.eq(i).data("num", i);
        }
        foot_nav.hover(function () {
            init();
            $(this).addClass("hov");
            $(".friend-list").eq($(this).data("num")).addClass("friend-show");
        }, function () {
        });

        function init(){
            for (let i=0;i<foot_nav.length;i++){
                $(".friend-list").eq(i).removeClass("friend-show");
                foot_nav.eq(i).removeClass("hov");
            }
        }
    }
});//end