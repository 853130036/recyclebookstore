$(document).ready(function () {
    $("#login").click(function () {
        var pwd=document.getElementById('password').value; 
        var msg = {
            "userName": $("#name").val(),
            "password": pwd
        };
        
        $.ajax({
            type: "post",
            url: "http://118.24.94.230:8080/user/login",
            async: true,
            contentType: "application/json",
            data: JSON.stringify(msg),
            success: function (data) {
                if(data["success"]==false){
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


});
