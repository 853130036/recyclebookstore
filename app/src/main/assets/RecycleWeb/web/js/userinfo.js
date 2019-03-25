$(document).ready(function () {

    var msg = {
        "id": localStorage.userId
    }

    $.ajax({
        type: "post",
        url: "http://192.168.43.154:8080/user/information",
        async: true,
        contentType: "application/json",
        data: JSON.stringify(msg),
        success: function (data) {
            console.log(data);
            //var userinfo=JSON.parse(data);
            $("#userName").text(data["user_name"]);
            $("#phoneNum").text(data["phone_num"]);
            $("#birthday").text(data["birthday"]);
            $("#sex").text(data["sex"]);
            $("#coin").text(data["recycle_coin"]);
            $("#loveNum").text(data["love_value"]);
            if (data["is_vip"] == "true") {
                $("#vip").text("是");
            } else {
                $("#vip").text("否");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.responseText);
        }
    });



});
