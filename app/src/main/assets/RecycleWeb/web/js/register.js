$(document).ready(function () {

    $("#sure").click(function(){
    
    })
    $("#register").click(function () {
        var pwd = document.getElementById('password').value;
        var pwd1 = document.getElementById('surepassword').value;
        var sexs=document.getElementsByName('sex');
        var sex;
        for(var i=0;i<sexs.length;i++)
        {
            if(sexs[i].checked==true){
                    if(i==0){
                        sex="男";
                    }else{
                        sex="女";
                    }
                }
        }
        if (pwd != pwd1) {
           $("#passwordnum").click();
        }else{
            var msg = {
                "userName": $("#username").val(),
                "password": pwd,
                "phoneNum": $("#phoneNum").val(),
                "sex": sex
            };
            $.ajax({
                type: "post",
                url: "http://118.24.94.230:8080/user/regist",
                async: true,
                contentType: "application/json",
                data: JSON.stringify(msg),
                success: function (data) {
                    if(data["success"]==true){
                        $("#success").click();
                    }
                    console.log(data["success"]);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    console.log(XMLHttpRequest.responseText);
                }
            });
        }    
    });

});