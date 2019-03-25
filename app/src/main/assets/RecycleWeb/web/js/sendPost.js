$(document).ready(function(){

    $("#shareContent").click(function(){
        var msg={
            "user_id":"2",
            "token":"e0bd3497596a44a2a7e83fd0d498629b",
            "talk_title":$("#title").val(),
            "talk_content":$("#content").val()
        };
        console.log($("#title").val());
        console.log($("#content").val());
        $.ajax({
            type: "post",
            url: "http://118.24.94.230:8080/active/talk/publish",
            async: true,
            contentType: "application/json",
            data: JSON.stringify(msg),
            success: function (data) {
                console.log(data["success"]);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                console.log(XMLHttpRequest.responseText);
            }
        });
    });

});
