$(document).ready(function () {
    $("#update").click(function () {
        $("#donateSuccess").click();
        setTimeout(function () {
            location.href = "backToMain";
        }, 1000);
        // var donateinfo = {
        //     "bookName": $("#bookName").val(),
        //     "athor": $("#athor").val(),
        //     "stationNum": $("#stationNum").val()
        // }
        // $.ajax({
        //     type: "post",
        //     url: "",
        //     async: true,
        //     contentType: "application/json",
        //     data: JSON.stringify(info),
        //     success: function (data) {
        //         $("#donateSuccess").click();
        //     },
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         alert(XMLHttpRequest.status);
        //         alert(XMLHttpRequest.readyState);
        //         console.log(XMLHttpRequest.responseText);
        //     }

        // });

    });
});
