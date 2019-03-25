
var defaultCardNum = 10;
var cardNum = defaultCardNum;
var talkIds = new Array();
var logInfo = {
    "userName": localStorage.userName
};
// function clickContent(data, position) {
//     var talk_data = JSON.stringify({
//         "userName": data["data"][position]["user_name"],
//         "userImg": data["data"][position]["photo_url"],
//         "title": data["data"][position]["title"],
//         "content": data["data"][position]["content"]
//     })
//     return talk_data;
// }
function getUserInfo() {
    return logInfo;
}
// 用ajax实现局部刷新
(function ($) {
    $("#post").click(function () {
        location.href = "sendPost";
    });
    // 初始化页面
    $.ajax({
        type: "post",
        url: ip + url_refresh,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            // "user_id": "1",
            // "token": "f1b5f86615c6492f8e581f9b9a25daa9"
            "user_id": localStorage.userId,
            "token": localStorage.token

        }),
        timeout: 6000,
        success: function (data) {
            if (data["success"] == true) {
                $("#wrapper").css("visibility", "visible");
                $("#loading").css("display", "none");
                if (data["data"].length < 10) {
                    $("#upflash").removeClass("animation-rotate");
                    $("#upflash img").css("display", "none");
                    $("#pullUp p").css("display", "block");
                }
                for (var i = 0; i < defaultCardNum; i++) {
                    $("#card" + (i + 1) + " .username").text(data["data"][i]["user_name"]);
                    $("#card" + (i + 1) + " .title").text(data["data"][i]["title"]);
                    $("#card" + (i + 1) + " .context").text(data["data"][i]["content"]);
                    $("#card" + (i + 1) + " img").attr("src", ip + data["data"][i]["photo_url"]);
                    talkIds[i] = data["data"][i]["talk_id"];
                }
                $(".new").remove();
                cardNum = defaultCardNum;
                $(".card").click(function () {
                    talk_data["title"] = $(this).find(".title").text();
                    talk_data["content"] = $(this).find(".context").text();
                    talk_data["userImg"] = $(this).find("img").attr("src");
                    var str = $(this).attr("id");
                    var index = parseInt(str.substring(4, str.length));
                    //location.href = "talkId=" + talkIds[index - 1];
                    location.href = "post_show/post_details.html?talkId=" + talkIds[index - 1];
                });
                myScroll.refresh();
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.responseText);
        }
    });

    // 下拉上划
    var myScroll,
        pullDownEl,
        pullDownOffset,
        pullUpEl,
        pullUpOffset;

    /**
     *  刷新滚动区域的滚动条的位置（此方法在添加数据后调用）
     **/

    function pullDownAction() {
        talkIds.length = 0;
        setTimeout(function () {
            (function reloadPage() {
                // location.href = "refresh";
                // 加入ajax刷新方法...
                var timeStart = Date.now;
                $.ajax({
                    type: "post",
                    url: ip + url_refresh,
                    async: true,
                    contentType: "application/json",
                    data: JSON.stringify({
                        // "user_id": "1",
                        // "token": "4bdb932f880a4fe69eb4955dc5256cfc"
                        "user_id": localStorage.userId,
                        "token": localStorage.token

                    }),
                    timeout: 6000,
                    success: function (data) {
                        if (data["success"] == true) {
                            $("#upflash").addClass("animation-rotate");
                            $("#upflash img").css("display", "block");
                            $("#pullUp p").css("display", "none");
                            if (data["data"].length < 10) {
                                $("#upflash").removeClass("animation-rotate");
                                $("#upflash img").css("display", "none");
                                $("#pullUp p").css("display", "block");
                            }
                            for (var i = 0; i < defaultCardNum; i++) {
                                $("#card" + (i + 1) + " .username").text(data["data"][i]["user_name"]);
                                $("#card" + (i + 1) + " .title").text(data["data"][i]["title"]);
                                $("#card" + (i + 1) + " .context").text(data["data"][i]["content"]);
                                $("#card" + (i + 1) + " img").attr("src", ip + data["data"][i]["photo_url"]);
                                talkIds[i] = data["data"][i]["talk_id"];
                            }
                            $(".card").click(function () {
                                talk_data["userName"] = $(this).find(".username").text();
                                talk_data["title"] = $(this).find(".title").text();
                                talk_data["content"] = $(this).find(".context").text();
                                talk_data["userImg"] = $(this).find("img").attr("src");
                                var str = $(this).attr("id");
                                var index = parseInt(str.substring(4, str.length));
                                location.href = "talkId=" + talkIds[index - 1];
                            });
                            $(".new").remove();
                            cardNum = defaultCardNum;
                            myScroll.refresh();
                        }

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        console.log(XMLHttpRequest.responseText);
                    }
                });
            })();
        }, 0);
    }
    function pullUpAction() {
        var loadTime = 0;
        setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
            //TODO 上拉添加数据
            var timeStart = Date.now;
            $.ajax({
                type: "post",
                url: ip + url_load,
                async: true,
                contentType: "application/json",
                data: JSON.stringify({
                    // "user_id": "1",
                    // "token": "4bdb932f880a4fe69eb4955dc5256cfc",
                    "user_id": localStorage.userId,
                    "token": localStorage.token,
                    "last_talk_id": talkIds[talkIds.length - 1]
                }),
                timeout: 1000,
                success: function (data) {
                    if (data["success"] == true) {
                        if (data["data"].length == 0) {
                            $("#upflash").removeClass("animation-rotate");
                            $("#upflash img").css("display", "none");
                            $("#pullUp p").css("display", "block");
                        } else {
                            for (var i = 0; i < data["data"].length; i++) {
                                var str = "";
                                str += "<div class=\'card new\' id=\'card" + (i + 1 + cardNum) + "\'>";
                                str += "                    <div class=\'card-box\'>";
                                str += "                        <img src=\'./images/girl.jpeg\' class=\'img-circle head\' />";
                                str += "                        <p class=\'username\'></p>";
                                str += "                    </div>";
                                str += "                    <p class=\'title\'></p>";
                                str += "                    <p class=\'context\'></p>";
                                str += "                    <div class=\'funclist\'>";
                                str += "                        <ul>";
                                str += "                            <li>";
                                str += "                                <p class=\'like\' href=\'return false\'>";
                                str += "                                    <span class=\'glyphicon glyphicon-heart\'></span>";
                                str += "                                </p>";
                                str += "                            </li>";
                                str += "                            <li>";
                                str += "                                <p class=\'comment\' href=\'return false\'>";
                                str += "                                    <span class=\'glyphicon glyphicon-comment\'></span>";
                                str += "                                </p>";
                                str += "                            </li>";
                                str += "                        </ul>";
                                str += "                    </div>";
                                str += "                </div>";
                                $(".wrapbox").append(str);
                                $("#card" + (i + 1 + cardNum) + " .username").text(data["data"][i]["user_name"]);
                                $("#card" + (i + 1 + cardNum) + " .title").text(data["data"][i]["title"]);
                                $("#card" + (i + 1 + cardNum) + " .context").text(data["data"][i]["content"]);
                                $("#card" + (i + 1 + cardNum) + " img").attr("src", ip + data["data"][i]["photo_url"]);
                                talkIds[i + cardNum] = data["data"][i]["talk_id"];
                                $(".card").click(function () {
                                    talk_data["userName"] = $(this).find(".username").text();
                                    talk_data["title"] = $(this).find(".title").text();
                                    talk_data["content"] = $(this).find(".context").text();
                                    talk_data["userImg"] = $(this).find("img").attr("src");
                                    var str = $(this).attr("id");
                                    var index = parseInt(str.substring(4, str.length));
                                    location.href = "talkId=" + talkIds[index - 1];
                                });
                                myScroll.refresh();
                            }
                            cardNum += data["data"].length;
                        }
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    console.log(XMLHttpRequest.responseText);
                }
            });
            myScroll.refresh();
            // Remember to refresh when contents are loaded (ie: on ajax completion)
        }, 0);	// <-- Simulate network congestion, remove setTimeout from production!
    }


    function loaded() {
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;
        myScroll = new iScroll('wrapper', {
            useTransition: true,
            hideScrollbar: true,
            fadeScrollbar: true,
            topOffset: pullDownOffset,
            bottomOffset: pullUpOffset,
            onRefresh: function () {
                if (pullDownEl.className.match('loading')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector("#downflash").className = "";
                }
            },
            onScrollMove: function () {
                if (this.y > 5 && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'flip';
                    pullDownEl.querySelector("#downflash").className = "";
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector("#downflash").className = "animation-rotate";
                    this.minScrollY = -pullDownOffset;
                }
            },
            onScrollEnd: function () {
                if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'loading';
                    pullDownEl.querySelector("#downflash").className = "animation-rotate";
                    pullDownAction();
                }
                else if (this.y == this.maxScrollY) {
                    pullUpAction();
                }
            }
        });
    }
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
})(jQuery);