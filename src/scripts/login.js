import $ from 'jquery';
import browser from 'bowser';
import 'slick-carousel';
import 'tooltipster';

var slickColorAry = ['#038aca', '#187cc8', '#1f837b', '#045daf'],
    docH = 600,
    sysUrl = '/api/sys/',
    alimsUrl = '/api/alims/',
    fileUrl = '/api/files/',
    systemId = "SYS",
    successCode = 200;

function checkBrowser() {
    var domLoginForm = $('#login_container'),
        domBrowserHint = $('#browser_download');
    
    if (browser.chrome && browser.version == 44) {
        domLoginForm.show();
    } else {
        domBrowserHint.show();
    }
}

function makeMiddle() {
    var wH = $(window).height();
    if(wH > docH) {
        $('body').css('padding-top', (wH-docH)/2.5+'px');
    }
}

function loadChromeDownloadUrl() {

    //Ajax调用处理
    $.ajax({
        //要用post方式
        type: "GET",
        //方法所在页面和方法名
        url: alimsUrl + "tools/chrome",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (request) {
            request.setRequestHeader("systemId", systemId);
        },
        success: function (data, status, resObj) {

            //服务器正常返回后, 不设置header里的status
            var headerStatus = resObj.getResponseHeader('Status');

            if (resObj.status == successCode && headerStatus == undefined) {

                $("#chrome_download").attr('href', fileUrl + data.path + "/download");
            }

        },
        error: function (err) {
            console.log(err)
        }
    });

}

function loadPlatform() {

    //Ajax调用处理
    $.ajax({
        //要用post方式      
        type: "GET",
        //方法所在页面和方法名      
        url: alimsUrl + "sysdicts/platform",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (request) {
            request.setRequestHeader("systemId", systemId);
        },
        success: function (data, status, resObj) {

            //服务器正常返回后, 不设置header里的status
            var headerStatus = resObj.getResponseHeader('Status');

            if (resObj.status == successCode && headerStatus == undefined) {
                
                if (data.orgName == '' || data.platformName == '' ) {
                    //add class
                    $("#org").addClass("single-line");

                    if (data.orgName == "") {
                        $("#orgName").html(data.platformName);
                    } else {
                        $("#orgName").html(data.orgName);
                    }
                    
                    $("#platformName").remove();

                } else {
                    $("#orgName").html(data.orgName);
                    $("#platformName").html(data.platformName); 
                }

                //设置参数
                $("#companyName").html(data.companyName);
                $("#copyrights").html(data.copyrights);
                $("#platformLogo").attr('src', fileUrl + data.platformLogo + "/download");

                // 设置title
                document.title = data.orgName + data.platformName;
            }

        },
        error: function (err) {
            console.log(err)
        }
    });

}


(function() {
    var domMainContent = $('#login_content'),
        domFormRow = $('.form-row'),
        domErrMsg = $('#error_msg');

    var errormsg = "用户名或密码错误";

    loadPlatform();
    loadChromeDownloadUrl();
    checkBrowser();
    makeMiddle();

    $(window).on('resize', makeMiddle);

    $('.slick-container .slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 300,
        arrows: false,
        dots: true,
        dotsClass: 'slick-pagination'
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        domMainContent.css('background-color', slickColorAry[nextSlide]);
    });

    $('.tooltip').tooltipster({
        theme: 'tooltipster-borderless'
    });
    $('.tooltip-template').tooltipster({
        theme: 'tooltipster-borderless',
        content: $('#wechat_content'),
        contentCloning: true
    });

    $("form").submit(function(e){
        e.preventDefault();
    });

    $("#login").click(function(){
        //check
        var account = $("#account").val(),
            password = $("#password").val();

        if (account == "" || password== "") {
            domErrMsg.show().html(errormsg);
            return false;
        }

        domErrMsg.hide();

        //Ajax调用处理
        $.ajax({
            //要用post方式
            type: "post",
            //方法所在页面和方法名
            url: sysUrl + "login",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data:'{"account":"'+ account +'","pass":"'+ password +'"}',
            success: function(data, status, resObj) {

                //服务器正常返回后, 不设置header里的status
                var headerStatus = resObj.getResponseHeader('Status');

                if (resObj.status == successCode && headerStatus == undefined) {

                    window.location = "mediator?token="+data.token+'&userId='+data.userId;
                } else {
                    domErrMsg
                        .show()
                        .find('p')
                        .html(data.message);
                }
            },
            error: function(err) {
                console.log(err)
            }
        });
    });

    // 表单项input焦点状态
    $('input', domFormRow)
        .focus(function() {
            $(this).parent().addClass('focus');
        })
        .blur(function() {
            $(this).parent().removeClass('focus');
        });

})();
