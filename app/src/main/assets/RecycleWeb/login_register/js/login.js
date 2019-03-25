
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
$(document).ready(function () {
    if (getUrlParam("exit") == "true") {
        localStorage.clear();
    }
    var pwd;
    var userName;
    if (localStorage.userName != null && localStorage.password != null) {
        pwd = localStorage.password;
        userName = localStorage.userName;
        var msg = {
            "userName": userName,
            "password": pwd
        };
        setTimeout(function () {
            $.ajax({
                type: "post",
                url: ip + url_login,
                async: true,
                contentType: "application/json",
                data: JSON.stringify(msg),
                timeout: 3000,
                success: function (data) {
                    if (data["success"] == true) {
                        localStorage.token = data["data"]["token"];
                        localStorage.userName = data["data"]["user_name"];
                        localStorage.userId = data["data"]["user_id"];
                        location.href = "jumpToMain";
                    }


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    console.log(XMLHttpRequest.responseText);
                }
            });
        }, 1000);
    } else {
        $("#wrapper").css("display", "block");
        $("#loading").css("display", "none");
        $("#register").click(function () {
            location.href = "jumpToRegister";
        })
        $("#login").click(function () {
            pwd = document.getElementById('password').value;
            userName = $("#name").val();
            var msg = {
                "userName": userName,
                "password": pwd
            };
            console.log(msg);
            $.ajax({
                type: "post",
                url: ip + url_login,
                async: true,
                contentType: "application/json",
                data: JSON.stringify(msg),
                timeout: 3000,
                success: function (data) {
                    if (data["success"] == true) {
                        localStorage.userName = userName;
                        localStorage.password = pwd;
                        localStorage.token = data["data"]["token"];
                        localStorage.userName = data["data"]["user_name"];
                        localStorage.userId = data["data"]["user_id"];
                        location.href = "jumpToMain";
                    } else if (data["success"] == false) {
                        $("#false").click();
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    console.log(XMLHttpRequest.responseText);
                }
            });
        });
    }

});

