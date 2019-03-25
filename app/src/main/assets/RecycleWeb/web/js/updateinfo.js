$(document).ready(function () {

    var msg = { "id": localStorage.userId }

    $.ajax({
        type: "post",
        url: "http://192.168.43.154:8080/user/information",
        async: true,
        contentType: "application/json",
        data: JSON.stringify(msg),
        success: function (data) {
            console.log(data);
            $("#userName").val(data["user_name"]);
            $("#password").val(data["password"]);
            $("#phoneNum").val(data["phone_num"]);
            $("#birthday").val(data["birthday"]);
            $("#sex").val(data["sex"]);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.responseText);
        }
    });
    $("#update").click(function () {
        var pwd = document.getElementById('password').value;
        var options = $("#sex option:selected");
        var info = {
            "id":localStorage.userId,
            "user_name": $("#userName").val(),
            "password": pwd,
            "phone_num": $("#phoneNum").val(),
            "sex": options.text(),
            "birthday": $("#birthday").val()
        }
        $.ajax({
            type: "post",
            url: "http://192.168.43.154:8080/user/changeinformation",
            async: true,
            contentType: "application/json",
            data: JSON.stringify(info),
            success: function (data) {
                if(data["success"]!="success")
                {
                    $("#updateSuccess").click();
                    setTimeout(function(){
                        location.href = "back";
                    },1000);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                console.log(XMLHttpRequest.responseText);
            }
        });
    });
});

