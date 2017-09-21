var remoteUrl = "http://106.14.139.83:8080";

function ajax(setting) {
    var param = processSetting(setting);
    var errorFunc = param.error;
    param.error = function (data) {

        if (data.status == 400) {
            errorFunc && errorFunc(data.responseJSON);
        } else if (data.status == 401) {
            window.location.href = "login.html";
        }else if(data.status == 404){
            console.log(data);
        }
        else if (data.status == 500) {
            console.log(data);
            window.location.href = "error.html";
        }
    };
    $.ajax(param);
}


function ajaxWithError(setting) {
    var param = processSetting(setting);
    $.ajax(param);
}


function processSetting(setting){
    setting.url = remoteUrl + setting.url;
    if (!setting.headers) {
        setting.headers = {};
    }
    var token = localStorage.getItem("token");
    if (token) {
        setting.headers.Authorization = 'Bearer' + token;
    }
    if (!setting.contentType) {
        setting.contentType = 'application/json';
    }
    if (!setting.dataType) {
        setting.dataType = 'json';
    }
    if (setting.contentType === 'application/json' && setting.type.toLowerCase() === 'post'
        && typeof setting.data === "object") {
        setting.data = JSON.stringify(setting.data);
    }
    return setting;
}