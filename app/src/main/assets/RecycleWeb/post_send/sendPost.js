$(document).ready(function () {

    $("#shareContent").click(function () {
        if ($("#title").val() == "" || $("#content").val() == "") {
            $("#false").click();
        } else {
            var msg = {
                "user_id": localStorage.userId,
                "token": localStorage.token,
                "talk_title": $("#title").val(),
                "talk_content": $("#content").val()
            };
            $.ajax({
                type: "post",
                url: ip + url_post,
                async: true,
                contentType: "application/json",
                data: JSON.stringify(msg),
                success: function (data) {
                    if (data["success"] == true) {
                        $("#true").click();
                        setTimeout(function () {
                            location.href = "jumpToMain";
                        }, 500);
                    }
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
