function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

$(document).ready(function () {

    var bookcaseId = getUrlParam("bookcaseId");
    $("#bookcaseId").text(bookcaseId);
    $.ajax({
        type: "post",
        url: ip + url_gainbook,
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            "bookcaseId": bookcaseId,
            "user_id": localStorage.userId,
            "token": localStorage.token
            // "bookcaseId": 1,
            // "user_id": 1,
            // "token": "d67038e5b78644df909529abcb8070b5"
        }),

        success: function (data) {
            if (data["success"] == true) {
                literature_sort(data);
                mood_sort(data);
                novel_sort(data);
                magazine_sort(data);
                travel_sort(data);
                science_sort(data);
                $(".rent").click(function () {
                    var str = $(this).prev().attr("href");
                    var bookTypeId = str.substring(20, str.length);
                    console.log(bookTypeId);
                    $.ajax({
                        type: "post",
                        url: ip + url_rent,
                        async: true,
                        contentType: "application/json",
                        data: JSON.stringify({
                            "bookTypeId": bookTypeId,
                            "user_id": localStorage.userId,
                            "token": localStorage.token

                        }),
                        timeout: 6000,
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
                        }
                    });
                });
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            console.log(XMLHttpRequest.responseText);
        }
    });

})

function literature_sort(data) {
    var j = 0;
    var literature = new Array();
    for (var i = 0; i < data["data"].length; i++) {
        console.log(data["data"][i]);
        if (data["data"][i]["bookClass"] == "文学") {
            literature[j] = data["data"][i];
            j++;

        }
    }
    // 加载布局
    var str = "";
    var name = "literatures";
    str = getString(literature, name);
    $("#literaturebook").append(str);
    // 绑定数据 
    for (var i = 1; i <= literature.length; i++) {
        $("#" + name + i + " h6").text(literature[i - 1]["bookName"]);
        $("#" + name + i + " img").attr("src", ip + literature[i - 1]["imageUrl"]);
    }
}

function mood_sort(data) {
    var mood = new Array();
    var j = 0;
    for (var i = 0; i < data["data"].length; i++) {
        if (data["data"][i]["bookClass"] == "情感") {
            mood[j] = data["data"][i];
            j++;
        }
    }
    var str = "";
    var name = "moods";
    str = getString(mood, name);
    $("#moodbook").append(str);
    for (var i = 1; i <= mood.length; i++) {
        $("#" + name + i + " h6").text(mood[i - 1]["bookName"]);
        $("#" + name + i + " img").attr("src", ip + mood[i - 1]["imageUrl"]);
    }
}

function novel_sort(data) {
    var novel = new Array();
    var j = 0;
    for (var i = 0; i < data["data"].length; i++) {
        if (data["data"][i]["bookClass"] == "小说") {
            novel[j] = data["data"][i];
            j++;
        }
    }
    var str = "";
    var name = "novels";
    str = getString(novel, name);
    $("#novelbook").append(str);
    for (var i = 1; i <= novel.length; i++) {
        $("#" + name + i + " h6").text(novel[i - 1]["bookName"]);
        $("#" + name + i + " img").attr("src", ip + novel[i - 1]["imageUrl"]);
    }
}

function magazine_sort(data) {
    var magezine = new Array();
    var j = 0;
    for (var i = 0; i < data["data"].length; i++) {
        if (data["data"][i]["bookClass"] == "杂志") {
            magezine[j] = data["data"][i];
            j++;
        }
    }
    var str = "";
    var name = "magazines";
    str = getString(magezine, name);
    $("#magazinebook").append(str);
    for (var i = 1; i <= magezine.length; i++) {
        $("#" + name + i + " h6").text(magezine[i - 1]["bookName"]);
        $("#" + name + i + " img").attr("src", ip + magezine[i - 1]["imageUrl"]);
    }
}

function travel_sort(data) {
    var travel = new Array();
    var j = 0;
    for (var i = 0; i < data["data"].length; i++) {
        if (data["data"][i]["bookClass"] == "旅游") {
            travel[j] = data["data"][i];
            j++;
        }
    }
    var str = "";
    var name = "travels";
    str = getString(travel, name);
    $("#travelbook").append(str);
    for (var i = 1; i <= travel.length; i++) {
        $("#" + name + i + " h6").text(travel[i - 1]["bookName"]);
        $("#" + name + i + " img").attr("src", ip + travel[i - 1]["imageUrl"]);
    }
}

function science_sort(data) {
    var science = new Array();
    var j = 0;
    for (var i = 0; i < data["data"].length; i++) {
        if (data["data"][i]["bookClass"] == "科普") {
            science[j] = data["data"][i];
            j++;
        }
    }
    var str = "";
    var name = "sciences";
    str = getString(science, name);
    $("#sciencebook").append(str);
    for (var i = 1; i <= science.length; i++) {
        $("#" + name + i + " h6").text(science[i - 1]["bookName"]);
        $("#" + name + i + " img").attr("src", ip + science[i - 1]["imageUrl"]);
    }
}

function getString(data, name) {
    var str = "";
    for (var i = 1; i <= data.length; i++) {
        if (((i - 1) % 3) == 0) {
            str += "<tr>";
        }
        str += "<td id=" + name + i + ">";
        str += "<a href=\'details.html?typeId=" + data[i - 1]["typeId"] + "\'><img src=\'\' >";
        str += "<h6></h6>";
        str += "</a>";
        str += "<button class=\'rent\'>";
        str += "借阅";
        str += "</button>";
        str += "</td>";
        if (i % 3 == 0 || i == data.length) {
            str += "</tr>";
        }
    }
    return str;
}