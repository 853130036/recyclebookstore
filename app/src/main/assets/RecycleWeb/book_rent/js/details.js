function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

$(document).ready(function () {
    var typeId = getUrlParam("typeId");
    $.ajax({
        type: "post",
        url: ip + url_details,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            "bookTypeId": typeId,
            "bookcaseId": 1

        }),
        timeout: 6000,
        success: function (data) {
            if (data["success"] == true) {
                console.log(data["data"]);

                //绑定图书的照片，名字，读过的人数
                var str = "<img src=\'\' class=\'bookimg\'>";
                str += "<h5></h5>";
                str += "<h6>已有<span></span>人读过此书</h6>";
                $("#bookinfo").append(str);
                $("#bookinfo img").attr("src", ip + data["data"]["bookImageUrl"]);
                $("#bookinfo h5").text(data["data"]["bookName"]);
                $("#bookinfo span").text(data["data"]["bookReadNum"]);
                //绑定作者的名字
                var str1 = " <h4>作者</h4>";
                str1 += "<span class=\'name\'></span>";
                $("#writer").append(str1);
                $("#writer span").text(data["data"]["authorName"]);
                //绑定作者的头像
                var str2 = "<img class=\'headimg\' src=\' \'>";
                $("#head").append(str2);
                $("#head img").attr("src", ip + data["data"]["bookAuthorImageUrl"]);
                //绑定简介
                var str3 = "<h5>简介：</h5>";
                str3 += "<h6></h6>";
                $("#preview").append(str3);
                $("#preview h6").text(data["data"]["bookDescription"]);
                //绑定评论
                var commentslen = data["data"]["comments"].length;
                var str4 = "";
                var name = "comment";
                str4 = bind_comments(data, commentslen);
                $("#comments").append(str4);
                for (var i = 1; i <= commentslen; i++) {
                    $("#" + name + i + " img" + ".userimg").attr("src", ip + data["data"]["comments"][i - 1]["userImageUrl"]);
                    $("#" + name + i + " p").text(data["data"]["comments"][i - 1]["bookCommentContent"]);
                    $("#" + name + i + " span" + ".username").text(data["data"]["comments"][i - 1]["userName"]);
                }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.responseText);
        }
    });

})

function bind_comments(data, commentslen) {
    var str = "";
    var name = "comment";
    for (var i = 1; i <= commentslen; i++) {
        str += "<tr>";
        str += "<td id=" + name + i + ">";
        str += "<img class=\'userimg\' src=\' \'>";
        str += "<span class=\'username\'></span>";
        str += " <p class=\'content\'></p>";
        str += "<div class=\'reviweicon\'>";
        str += "<span style=\'float: right;\'>赞</span><img src=\'../img/all/赞.png\' style=\'width: 18px;height: 18px;float: right;\'>";
        str += "<span style=\'float: right;margin-right: 15px\'>评论</span><img src=\'../img/all/评论(1).png\' style=\'width: 18px;height: 18px;float: right;\'>";
        str += "</div>";
        str += "</td>";
        str += "</tr>";
    }
    return str;
}