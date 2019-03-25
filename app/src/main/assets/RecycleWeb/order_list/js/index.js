function getOrderList(state, myScroll) {
    $.ajax({
        type: "post",
        url: ip + url_checkOrder,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            "user_id": localStorage.userId,
            "token": localStorage.token
        }),
        timeout: 6000,
        success: function (data) {
            if (data["success"] == true) {
                $("#wrapper").css("visibility", "visible");
                $("#loading").css("visibility", "hidden");
                // 已加载全部
                // $("#upflash").removeClass("animation-rotate");
                // $("#upflash img").css("display", "none");
                // $("#pullUp p").css("display", "block");
                for (var i = 0; i < data["data"].length; i++) {
                    var str = "";
                    str += "<div class=\'block\' id=\'block" + (i + 1) + "\'>";
                    str += "                    <div class=\'order_list\'>";
                    str += "                        <!--订单编号-->";
                    str += "                        <div class=\'shop_title\'>";
                    str += "                            <div class=\'fl order_id\'>";
                    // 订单编号
                    str += "                               </div>";
                    str += "                        </div>";
                    str += "                        <!--分包商品信息-->";
                    str += "                        <div class=\'cart_item prd_ebook\'>";
                    str += "                            <!--电子书加签-->";
                    str += "                            <!--包裹图片-->";
                    // 订单图片
                    str += "                            <img src=\'./images/book1.JPG\' class=\'fl pro_pic\'>";
                    str += "                            <!--包裹详情-->";
                    str += "                            <div class=\'detail\'>";
                    str += "                                <!--包裹状态-->";
                    str += "                                <div class=\'fr prd_state order_state\'>";
                    str += "                                    <!--状态文字-->";
                    // 订单状态
                    str += "                                    <div class=\'prd_state_title\'>";
                    str += "                                        正在租借 </div>";
                    str += "                                </div>";
                    str += "                                <!--包裹名称显示，多件产品，显示包裹编号，一件产品显示产品名称-->";
                    // 书籍名称
                    str += "                                <p class=\'fl prd_tit order_name\'>";
                    str += "                                    </p>";
                    // 作者
                    str += "                                <p class=\'fl prd_tit order_author\'>";
                    str += "                                   </p>";
                    str += "                            </div>";
                    str += "                            <!--操作按键-->";
                    str += "                            <div class=\'detail3\'>";
                    str += "                                <a>评价</a>";
                    str += "                            </div>";
                    str += "                        </div>";
                    str += "                    </div>";
                    str += "                </div>";
                    $(".wrapbox").append(str);
                    $("#block" + (i + 1) + " .order_id").text(data["data"][i]["orderId"]);
                    $("#block" + (i + 1) + " .order_name").text(data["data"][i]["bookName"]);
                    $("#block" + (i + 1) + " .order_author").text(data["data"][i]["bookAuthor"]);
                    $("#block" + (i + 1) + " img").attr("src", ip + data["data"][i]["bookImageUrl"]);
                    var orderState;
                    switch (data["data"][i]["orderState"]) {
                        case 0:
                            orderState = "正在租借";
                            break;
                        case 1:
                            orderState = "待评价";
                            break;
                        case 2:
                            orderState = "已完成";
                            break;
                        default:
                            break;
                    }
                    $("#block" + (i + 1) + " .order_state").text(orderState);
                }
                if (state != "init") {
                    myScroll.refresh();
                }
                $(".block").click(function () {
                    var orderId = parseInt($(this).find(".order_id").text()) - 10000;
                    location.href = "index.html?orderId=" + orderId;
                });
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.responseText);
        }
    });
}
(function ($) {

    getOrderList("init", myScroll);
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
        setTimeout(function () {
            (function reloadPage() {
                $(".wrapbox").empty();
                getOrderList("load", myScroll);
            })();
        }, 0);
    }
    function pullUpAction() {
        setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
            //TODO 上拉添加数据
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