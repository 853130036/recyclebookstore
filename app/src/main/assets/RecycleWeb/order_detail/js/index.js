function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
$(document).ready(function () {
    $.ajax({
        type: "post",
        url: ip + url_return,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            "user_id": localStorage.userId,
            "token": localStorage.token,
            "orderId": getUrlParam("orderId")

        }),
        timeout: 6000,
        success: function (data) {
            if (data["success"] == true) {
                $(".order_price").text("订单金额：￥" + data["data"]["cost"]);
                $(".order_author").text(data["data"]["bookAuthor"]);
                $(".order_id").text("订单编号：" + (parseInt(data["data"]["orderId"]) + 10000));
                $(".order_name").text(data["data"]["bookName"]);
                $("img").attr("src", ip + data["data"]["bookImageUrl"])
                if (data["data"]["orderState"] != "0") {
                    $(".detail3").css("display", "none");
                }
                $(".detail3 a").click(function () {
                    $.ajax({
                        type: "post",
                        url: ip + url_changeState,
                        async: true,
                        contentType: "application/json",
                        data: JSON.stringify({
                            "user_id": localStorage.userId,
                            "token": localStorage.token,
                            "orderId": getUrlParam("orderId"),
                            "nextOrderState": 1

                        }),
                        timeout: 6000,
                        success: function (data) {
                            console.log(data)
                            if (data["success"] == true) {
                                $("#true").click();
                                setTimeout(function () {
                                    location.href = "jumpToOrderList";
                                }, 500);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest.status);
                            alert(XMLHttpRequest.readyState);
                        }
                    });
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
        }
    });
})