function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
$(document).ready(function () {
    // $.ajax({
    //     type: "post",
    //     url: ip + url_getcomments,
    //     async: false,
    //     contentType: "application/json",
    //     data: JSON.stringify({
    //         "talk_id": getUrlParam("talkId"),
    //         "parent_comment_id": "0"
    //     }),
    //     success: function (data) {
    //         if (data["success"] == true) {
    //             $("#post_content .userimg").attr("src", talk_data["userImg"]);
    //             $("#post_content .username").text(talk_data["userName"]);
    //             $("#post_content h4").text(talk_data["title"]);
    //             $("#post_content p").text(talk_data["content"]);
    //         }
    //     },
    //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //         alert(XMLHttpRequest.status);
    //         alert(XMLHttpRequest.readyState);
    //         console.log(XMLHttpRequest.responseText);
    //     }
    // });
})