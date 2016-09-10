'use strict';

/**
 * Created by wang on 16/9/6.
 */

$(function () {
    if (typeof $(window).scrollLoading == 'function') {
        $(".lazy").scrollLoading({ attr: 'dynamic-src' });
    }
    $("#username,#userMobile,#vcode,#yourName,#yourTel,#applyName,#applyTel,#FRtable_name,#FRtable_tel,.comment_box input.tel,#commonText").mousedown(function () {
        $(this).focus(function () {
            if (this.value || $('#commonText').value == this.defaultValue) {
                this.value = "";
            }
            $(this).removeClass("showBox");
            $(".error_b1").html("");
            $(".error_b2").html("");
            $("#name_error").html("");
            $("#tel_error").html("");
        });
        $(".LBC_tel,.comment_box input.tel").keyup(function () {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^0/g, ''));
        }).bind("paste", function () {
            var tmptxt = $(this).val();
            $(this).val(tmptxt.replace(/\D|^0/g, ''));
        });
    }).mouseup(function () {
        $(this).blur(function () {
            if (this.value == "" || $('#commonText').value == "") {
                this.value = this.defaultValue;
                $('#commonText').val('我们非常重视您的建议，请在这里填写告诉我们');
            }
            $(this).html("");
            $(this).removeClass("showBox");
        });
    });
    $('#password').focus(function () {
        $('.pwdtxt').hide();
    }).blur(function () {
        if ($('#password').val() == '') {
            $('.pwdtxt').show();
        }
        ;
    });
    $('.pwdtxt').click(function () {
        $('.pwdtxt').hide();
        $('#password').focus();
    }).mouseup(function () {
        $('.pwdtxt').show();
        $('#password').blur();
    });
    var str = "http://passport.17house.com/login/NewIsLogin?&callback=?";
    $.getJSON(str, function (data) {
        if (data.authkey != '') {
            $("#authkey").val(data.authkey);
        }
        if (data.status == 1) {
            userData(data);
        }
    });
    var timeLeft = 60;
    var decrease = function decrease() {
        timeLeft--;
        if (timeLeft == 0) {
            $('[name=sendSMS]').html('获取动态验证码');
            $('.send_code').prop('disabled', false);
            $('[name=for_timing]').val('0');
            timeLeft = 60;
            window.clearInterval(intervalId);
            $('[name=for_intervalId]').val('');
            return;
        }
        $('[name=sendSMS]').html(timeLeft + "秒后可重新发送");
    };
    $('[name="sendSMS"]').click(function () {
        var mobile = $("input[name=usermobile]").val();
        var reg = /^1[3|4|5|7|8][0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$/;
        if (!reg.test(mobile)) {
            alert("手机格式不正确");
            $("input[name=usermobile]").focus();
            $("input[name=usermobile]").val('');
            return false;
        }
        $('#vcode_msg').html('');
        if (timeLeft == 60) {
            sendSMSVcode(mobile);
        }
        var isBeyondLimit = $('[name=for_isBeyondLimit]').val();
        if (isBeyondLimit == '0') {
            alert("每日最多发送10条短信");
            return;
        }
        var intervalID = null;
        var isInTiming = $("[name=for_timing]").val();
        if (isInTiming == 0) {
            $("[name=for_timing]").val('1');
            intervalId = setInterval(decrease, 1000);
            $('[name=for_intervalId]').val(intervalId);
        }
    });
    $('.siteNavBgRS_list li:last a').click(function () {
        $('.siteNavBgRS_list').hide();
        $('.siteNavBgRS').hide();
        $('.siteNavBgR').show();
    });
    $.extend({
        linkageCity: function linkageCity(elems) {
            var elems = elems;
            var defaultValue = { province: 0, city: 0, area: 0 };
            $.each(areas.province, function (k, v) {
                $('#' + elems['province']).append('<option value="' + k + '">' + v + '</option>');
            });
            $('#' + elems['province']).off('change').on('change', function () {
                var current_province = $(this).val();
                if (!$.inArray(current_province, areas.city[current_province])) {
                    return false;
                }
                $('#' + elems['city'] + ' option:gt(0)').remove();
                if ($.inArray(elems['area'])) {
                    $('#' + elems['area'] + ' option:gt(0)').remove();
                }
                $.each(areas.city[current_province], function (k, v) {
                    $('#' + elems['city']).append('<option value="' + k + '" >' + v + '</option>');
                });
                var oneCity = Object.keys(areas.city[current_province]).length == 1 ? 1 : 0;
                if (oneCity) {
                    $('#' + elems['city'] + ' option:eq(1)').attr('selected', 'true');
                    $('#' + elems['city']).change();
                }
            });
            if (!$.inArray(elems['area'])) return false;
            $('#' + elems['city']).change(function () {
                var current_city = $(this).val();
                $('#' + elems['area'] + ' option:gt(0)').remove();
                $.each(areas.area[current_city], function (k, v) {
                    $('#' + elems['area']).append('<option value="' + k + '" >' + v + '</option>');
                });
            });
        }
    });
    $.linkageCity({ province: 'selProvince', city: 'selCity' });
    $.linkageCity({ province: 'selProvinceDesign', city: 'selCityDesign', area: 'selAreaDesign' });
    $.linkageCity({ province: 'selProvinceView', city: 'selCityView' });
    $('.loginBox_btn').click(function () {
        login();
    });
    $('.loginBox_btn1').click(function () {
        mobileLogin();
    });
    $('.list_img1').click(function () {
        toQzoneLogin();
    });
    $('.login').click(function () {
        bgColorUp();
        $('.loginBox_con').show();
        $(".loginBox_btn").on("click", '.loginBox_btn', login);
        $(".loginBox_btn1").on("click", '.loginBox_btn1', mobileLogin);
    });
    $('.close').click(function () {
        bgColorDown();
        $('.loginBox_con').hide();
        $('.loginBox_conP').hide();
    });
    $('.LBC_right .login_lable').click(function () {
        $('.loginBox_con').hide();
        $('.loginBox_conP').show();
    });
    $('.back').click(function () {
        $('.loginBox_con').show();
        $('.loginBox_conP').hide();
    });
    $('.siteNavBgRS_list li:last a').click(function () {
        $('.siteNavBgRS_list').hide();
        $('.siteNavBgRS').hide();
        $('.siteNavBgR').show();
    });
    $('#logout').click(function () {
        logout();
    });
    $('.searchBtn').click(function () {
        doSearch();
    });
    $('#searchL,#searchList').hover(function () {
        $('#searchList').show();
        $('.search .searchText div').addClass('show');
    }, function () {
        $('#searchList').hide();
        $('.search .searchText div').removeClass('show');
    });
    $('#searchList li').each(function () {
        $(this).click(function () {
            $('#searchLeft').html($(this).text());
            $('#search').val('挑选您心仪的' + $(this).text());
            $('#searchLeft').attr('prop', $(this).attr('prop'));
            $('#searchList').hide();
        });
    });
    $('#search').bind({
        focus: function focus() {
            if (/挑选您心仪的/.test($(this).val())) {
                this.value = "";
            }
            ;
            document.onkeydown = function (e) {
                var theEvent = e || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code == 13) {
                    doSearch();
                }
                ;
            };
        }, blur: function blur() {
            if ($.trim($(this).val()) == '') {
                this.value = '挑选您心仪的' + $('#searchLeft').text();
            }
        }
    });
    var CSDexc = $('#CSDexc');
    $("#CSDexc").hover(function () {
        userFu(CSDexc);
    }, function () {
        userRemove(CSDexc);
    });
    var CSDexs = $('#CSDexs');
    $("#CSDexs").hover(function () {
        userFu(CSDexs);
    }, function () {
        userRemove(CSDexs);
    });
    $(".owen").hover(function () {
        var owen = $('.owen');
        var siteNavBgRS_list = $('.siteNavBgRS_list');
        var x = owen.offset().left - siteNavBgRS_list.outerWidth() + owen.outerWidth();
        var y = owen.offset().top + owen.outerHeight() - 1;
        siteNavBgRS_list.css({ 'display': 'block', 'position': 'absolute', 'left': x, 'top': y });
        $('.owen').css({ 'background': '#fff', 'border': '1px solid #ccc', 'border-bottom': '0 solid #ccc' });
        $('.owen a').css('color', '#666');
        $('.siteNavBgRS_list').slideDown().mouseover(function () {
            $('.owen').css({ 'background': '#fff', 'border': '1px solid #ccc', 'border-bottom': '0' });
            $('.owen a').css('color', '#666');
            $('.siteNavBgRS_list').css('display', 'block');
        }).mouseout(function () {
            $('.owen').css({ 'background': 'none', 'border': '1px solid #f2f2f2', 'border-bottom': '0' });
            $('.owen a').css('color', '#9f9f9f');
            $('.siteNavBgRS_list').css('display', 'none');
        });
        $('.dropDown').css('display', 'none');
    }, function () {
        $('.owen').css({ 'background': 'none', 'border': '1px solid #f2f2f2', 'border-bottom': '0' });
        $('.owen a').css('color', '#9f9f9f');
        $('.siteNavBgRS_list').css('display', 'none');
    });
    $("#MSGDexc").mouseenter(function () {
        var _x = $(this).offset().left;
        var _y = $(this).offset().top;
        $(".siteNavMsg_list").show();
        $(".siteNavMsg_list").css("display", "block");
        $(".siteNavMsg_list").css("left", _x + "px");
        $(".siteNavMsg_list").css("top", _y + 36 + "px");
        var _l = parseFloat($("#MSGDexc").css("paddingLeft"));
        var _r = parseFloat($("#MSGDexc").css("paddingRight"));
        var _w = $("#MSGDexc").width();
        $(".siteNavMsg_list .maskline").width(_w + _l + _r + "px");
        $("#MSGDexc").addClass("active");
    });
    $("#MSGDexc").mouseleave(function () {
        $(".siteNavMsg_list").hide();
        $("#MSGDexc").removeClass("active");
    });
    var now = 0;
    jQuery('.honor_left').click(function () {
        now--;
        if (now == -1) {
            now = jQuery('.honors').length - 1;
        }
        tab();
    });
    jQuery('.honor_right').click(function () {
        now++;
        if (now == jQuery('.honors').length) {
            now = 0;
        }
        tab();
    });
    function tab() {
        jQuery('.honor_list').stop().animate({ 'left': -now * jQuery('.honors').eq(0).width() + 'px' });
    }

    setInterval(function () {
        now++;
        if (now == jQuery('.honors').length) {
            now = 0;
        }
        tab();
    }, 3000);
    $('.honor').hover(function () {
        $('.honor_left i').css('display', 'inline-block');
        $('.honor_right i').css('display', 'inline-block');
    }, function () {
        $('.honor_left i').css('display', 'none');
        $('.honor_right i').css('display', 'none');
    });
    $('.nav_hd_list').each(function () {
        $(this).mouseover(function () {
            $('.nhla').removeClass('hover');
            $(this).find('.nhla').addClass('hover');
            $('.NHList').hide();
            $(this).find('.NHList').show();
        }).mouseout(function () {
            $('.nhla').removeClass('hover');
            $('.NHList').hide();
        });
    });
    $('.children').hover(function () {
        $(this).find('.childrenList').show();
    }, function () {
        $(this).find('.childrenList').hide();
    });
    $('.childrenList li a').click(function () {
        $('.childrenList').hide();
    });
    $('.subNavList a').click(function () {
        $('.subNavList a').removeClass('show');
        $(this).addClass('show');
    });
    $(".nav_ft").hover(function () {
        $('.nav_ft_list').slideDown().mouseover(function () {
            $('.nav_ft_list').css('display', 'block');
            $('.nav_ft').addClass('hover');
        }).mouseout(function () {
            $('.nav_ft_list').css('display', 'none');
            $('.nav_ft').removeClass('hover');
        });
        $('.nav_ft').addClass('hover');
    }, function () {
        $('.nav_ft_list').css('display', 'none');
        $('.nav_ft').removeClass('hover');
    });
    $('.friendLink_nav li').click(function () {
        $('.friendLink_nav li').removeClass('show');
        $(this).addClass('show');
        $('.FLlist').removeClass('show');
        $('.FLlist').eq($(this).index()).addClass('show');
    });
    $(".iclose").click(function () {
        $(this).parent().hide();
    });
});
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
        out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
function basePwd(password, key) {
    var pos = key.substr(3, 3);
    var key = key.substr(0, 3);
    var fpass = "";
    var arr = password.split("");
    for (i = 0; i < pos.length; i++) {
        arr.splice(pos[i], 0, key[i]);
    }
    var password = arr.join("");
    password = base64encode(password);
    return password;
}
function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    var key = $("#authkey").val();
    password = basePwd(password, key);
    if (username != "" && username != "邮箱/用户名/已验证手机" && password != "") {
        $("#userLogin").removeClass("show");
        $("#userPwd").removeClass("show");
        $("#userSpan").show().html("");
        $(".loginBox_btn").off("click", '.loginBox_btn', login);
        var str = "http://passport.17house.com/login/NewLogin?username=" + username + "&password=" + password + "&callback=?";
        $.getJSON(str, function (data) {
            if (data.status == 1) {
                userData(data);
                $("head").append(data.msg);
            } else {
                $("#userSpan").show().html("用户名或密码错误");
                $(".loginBox_btn").on("click", '.loginBox_btn', login);
            }
        });
    } else {
        if (username == "邮箱/用户名/已验证手机") {
            username = "";
        }
        if (username == "" && password == "") {
            $("#userLogin").addClass("show");
            $("#userPwd").addClass("show");
        } else if (password == "") {
            $("#userPwd").addClass("show");
        } else if (username == "") {
            $("#userLogin").addClass("show");
        }
        $("#userSpan").show().html("用户名或密码不能为空");
        return false;
    }
}
function mobileLogin() {
    var usermobile = $("input[name=usermobile]").val();
    var vcode = $("input[name=vcode]").val();
    if (usermobile == "请输入手机号码" || !usermobile) {
        $(".loginBox_name").addClass("show");
        $(".alert_phone_login").show().html("请输入手机号码");
        return false;
    } else {
        $(".loginBox_name").removeClass("show");
        $(".alert_phone_login").show().html("");
    }
    var reg = /^1[3|4|5|7|8][0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$/;
    if (!reg.test(usermobile)) {
        $(".loginBox_name").addClass("show");
        $(".alert_phone_login").show().html("手机格式不正确");
        return false;
    } else {
        $(".loginBox_name").removeClass("show");
        $(".alert_phone_login").show().html("");
    }
    if (!vcode || vcode == "请输入动态密码") {
        $(".loginBox_pwdL").addClass("show");
        $(".alert_phone_login").show().html("请输入动态密码");
        return false;
    } else {
        $(".loginBox_pwdL").removeClass("show");
        $(".alert_phone_login").show().html("");
    }
    $(".loginBox_btn1").removeAttr("onclick");
    var str = "http://passport.17house.com/login/NewDoLoginByMobile?usermobile=" + usermobile + "&vcode=" + vcode + "&callback=?";
    $.getJSON(str, function (data) {
        if (data.status == 1) {
            userData(data);
            $("head").append(data.msg);
            return false;
        } else if (data.status == 0) {
            $(".alert_phone_login").show().html("手机号未注册");
            return false;
        } else if (data.status == 2) {
            $(".alert_phone_login").show().html("验证码不正确");
            $(".loginBox_btn1").attr("onclick", "mobileLogin();");
            return false;
        } else {
            $(".alert_phone_login").show().html("登陆失败");
            return false;
        }
    });
}
function logout() {
    $("#logout").removeAttr("onclick");
    var str = "http://passport.17house.com/login/NewLogout?callback=?";
    $.getJSON(str, function (data) {
        if (data.status == 1) {
            $("head").append(data.msg);
            $("#authkey").val('');
        } else {
            $("#logout").attr("onclick", "logout();");
        }
    });
}
function toQzoneLogin() {
    var pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;
    if (typeof pageWidth != "number") {
        if (document.compatMode == "CSS1Compat") {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }
    childWindow = window.open("http://passport.17house.com/login/QQAuthPHPSDK", "TencentLogin", "width=" + pageWidth + ",height=" + pageHeight + ",menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");
}
function userData(data) {
    var user = "您好," + data.username;
    $('#user').html(user).attr('href', 'http://my.17house.com').off('click');
    bgColorDown();
    if ($('.comment')) {
        $('.comment').attr({ 'data-user-id': data.uid });
    }
    var str_url = "http://dataapi.17house.com/MessageCenterApi.php?action=messageCount&userId=" + data.uid + "&callback=?";
    $.getJSON(str_url, function (res) {
        if (res.status == 'ok') {
            $("#topMessage_0").text(res.data[0]);
            $("#topMessage_1").text(res.data[1]);
            $("#topMessage_2").text(res.data[2]);
            $("#topMessage_3").text(res.data[3]);
            $("#topMessage_4").text(res.data[4]);
        }
    });
    $('.loginBox_con').hide();
    $('.loginBox_conP').hide();
    $('.siteNavBgR').hide();
    $('.siteNavBgRS').show();
    var value = data.uid;
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + 1);
    document.cookie = 'user=' + encodeURIComponent(value) + ';expires=' + oDate + ';domain=' + '17house.com';
}
function bgColorUp() {
    var bh = $("body").height();
    var bw = $("body").width();
    $(".loginBox_bg").css({ height: bh, width: bw }).show();
}
function bgColorDown() {
    $(".loginBox_bg").css({ height: 0, width: 0 });
}
function sendSMSVcode(mobile) {
    var str = "http://passport.17house.com/login/NewSendSMSForMobileLogin?mobile=" + mobile + "&callback=?";
    $.getJSON(str, function (data) {
        if (data.status == 0) {
            alert("每天最多发送10条");
            $('[name=for_isBeyondLimit]').val(data);
        }
    });
}
function userFu(obj) {
    var dropDown = $('.dropDown');
    var x = obj.offset().left - dropDown.outerWidth() + obj.outerWidth();
    var y = obj.offset().top + obj.outerHeight() - 1;
    dropDown.css({ 'display': 'block', 'position': 'absolute', 'left': x, 'top': y });
    obj.addClass('show');
    $('.dropDown').slideDown().mouseover(function () {
        $('.customerService').addClass('show');
        $('.dropDown').css('display', 'block');
    }).mouseout(function () {
        $('.customerService').removeClass('show');
        $('.dropDown').css('display', 'none');
    });
    $('.siteNavBgRS_list').css('display', 'none');
}
function userRemove(obj) {
    obj.removeClass('show');
    $('.dropDown').css('display', 'none');
}
function doSearch() {
    var keyword = $.trim($("#search").val());
    if (keyword.length == 0) {
        alert('请输入关键词');
        return false;
    }
    if (/挑选您心仪的/.test(keyword)) {
        alert('请输入关键词');
        return false;
    }
    ;
    var type = parseInt($('#searchLeft').attr('prop'));
    var url = 'https://www.baidu.com/s?&wd=' + encodeURI(keyword) + ' site:' + 'www.17house.com';
    window.open(url);
}
var onlineSys = {
    init: function init() {
        var str = '';
        var urlA = this.urlA();
        var urlB = this.urlB();
        str += '<div class="con-online">';
        str += '<a href="javascript:;" class="online-a"><i class="i1"></i>在线咨询</a>';
        str += '<a target="_blank" href="http://zhuangxiu.17house.com/sheji/" class="online-a free-a"><i class="i2"></i>免费上门</a>';
        str += '<a href="javascript:;" class="online-a a-weixin"><i class="i3"></i>投诉/退单<span class="s-arrow"></span><div class="weixin"><img src="http://s3.17house.com/common/images/er-num.gif" alt="">关注1秒退单投诉</div></a>';
        str += '<a target="_blank" href="http://beijing.17house.com/baojia/?region=' + urlA + '&comepage=' + urlB + '" class="online-a active"><i class="i5"></i>装修报价</a>';
        str += '<a href="javascript:;" class="online-a back-top"><i class="i4"></i>回到顶部</a></div>';
        jQuery(document.body).append(str);
        $('.online-a').eq(0).on('click', function () {
            openZoosUrl('chatwin', '&e=pcyouce');
        });
        $("#callBtn").on("click", function () {
            lxb.call(document.getElementById("telInput"));
        });
        var reUrl = /\/baojia|\/sheji|\/zhucai|\/zhengzhuang|\/baom|\/17zhuangxiu|\/2493k0s1e1667|tuan/;
        var reUrl2 = /tuan/;
        var rehre = location.href;
        if (reUrl.test(rehre)) {
            $('.online-a').css("display", "none");
            $('.online-a').eq(0).css("display", "block");
        }
        ;
        if (reUrl2.test(rehre)) {
            $('.online-a').css("display", "none");
            $('.online-a').eq(0).css("display", "none");
        }
        if (!reUrl.test(location.href)) {
            this.backToTop();
        }
        ;
    }, Relocation: function Relocation() {
        var HT = '';
        HT += '<div class="relocation" id="relocation_url">';
        HT += '<a href="javascript:;" class="relocation_a relocation_a2">咨询装修专家</a>';
        HT += '<a href="javascript:;" class="relocation_a">新房装修</a>';
        HT += '<a href="javascript:;" class="relocation_a">老房改造</a>';
        HT += '<a href="javascript:;" class="relocation_a">二手房翻新</a>';
        HT += '<a href="javascript:;" class="relocation_a">婚房设计 </a>';
        HT += '<a href="javascript:;" class="back-top"><i class="i4"></i>回到顶部</a>';
        HT += '</div>';
        jQuery(document.body).append(HT);
        $('#relocation_url').on('click', function () {
            openZoosUrl('chatwin', '&e=pcyouce');
        });
        this.backToTop();
    }, backToTop: function backToTop() {
        $(window).on('scroll', function () {
            var $sTop = $(window).scrollTop();
            if ($sTop > 600) {
                $('.back-top').css("display", "block");
            } else {
                $('.back-top').hide();
            }
        });
        $('.back-top').bind('click', function () {
            $('body,html').scrollTop(0);
            return false;
        });
    }, urlA: function urlA() {
        var url = document.location.hostname.toString();
        var arrUrl = url.split(".");
        var start = arrUrl[0];
        return start;
    }, urlB: function urlB() {
        var url = document.location.pathname.toString();
        var arrUrl = url.split("/");
        var start = arrUrl[1];
        return start;
    }
};
var semBm = {
    init: function init() {
        var str = '';
        str += '<div class="sem-fixed-bottom"><div class="w1190"><span class="close"></span>';
        str += '<img src="http://s3.17house.com/common/images/sem/fx-photo-01.png" alt="">';
        str += '<p>3秒搞定装修报价，预算节省30%</p>';
        str += '<div class="right"><a target="_blank" href="http://news.17house.com/znbj-index.html#pcdbbj" class="btn btn-orange">快速3秒估价</a>';
        str += '<a href="javascript:;" onclick="openZoosUrl(\'chatwin\',\'&e=pcdbzx\')"  class="btn btn-blue">人工估价</a></div>';
        str += '</div></div>';
        jQuery(document.body).append(str);
        this.closePop();
    }, closePop: function closePop() {
        $('.sem-fixed-bottom .close').on('click', function () {
            $('.sem-fixed-bottom').hide();
        });
    }
};
$(function () {
    var timer;
    $('.loginBox_con .list_img3').on('click', function () {
        var random = '';
        $.getJSON('http://weixin.17house.com/weixin/api.php?callback=?', function (data) {
            $(".pop-wechat-code .layout430 img").src = data.url;
            random = data.key;
        });
        $('.pop-wechat-code,.popmask').show();
        $('.loginBox_con').hide();
        $('.loginBox_conP').hide();
        timer = setInterval(function () {
            $.getJSON('http://passport.17house.com/login/Wxtest?key=' + random + '&callback=?', function (data) {
                if (data) {
                    clearInterval(timer);
                    $('.js-close').click();
                    try {
                        $.getJSON($.trim(data) + '/?callback=?', function (data) {
                            $('body').append(data);
                            var str = "http://passport.17house.com/login/NewIsLogin?&callback=?";
                            $.getJSON(str, function (data) {
                                if (data.authkey != '') {
                                    $("#authkey").val(data.authkey);
                                }
                                if (data.status == 1) {
                                    userData(data);
                                }
                            });
                        });
                    } catch (e) {}
                }
            });
        }, 1000);
    });
    $('.pop-wechat-code .close').on('click', function () {
        $('.pop-wechat-code,.popmask').hide();
        clearInterval(timer);
    });
    onlineSys.Relocation();
    var sc_a = '<link rel="stylesheet" href="http://s1.17house.com/common/Voucher_red/css/Red_Voucher.css" />',
        sc_b = '<script src="http://s1.17house.com/common/Voucher_red/js/json2.js"></script>',
        sc_c = '<script src="http://s1.17house.com/common/Voucher_red/js/Red_Voucher.js"></script>';
    $(sc_a).appendTo($("head").eq(0));
    $(sc_b).appendTo($("head").eq(0));
    $(sc_c).appendTo($("head").eq(0));
});

//# sourceMappingURL=cm-compiled.js.map

//# sourceMappingURL=cm-compiled-compiled.js.map