var isPopuped = false;
var eventId,beginDate,endDate,surpls;
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var id = GetQueryString("id");
var accountNo = GetQueryString("accountNo");
var hb=$(".hb"),
    lock_hb=$("#lock_hb");
$(function(){
    // 获取本轮剩于
    ajaxWithError({
            url:"/event/getSurplus",
            type:"get",
            data:{id:id},
            success:function(data){
                surpls=data.result;
                $(".remaining").number(data.result,0);
            },
            error:function(data){
                if (!isPopuped) {
                    prompt(data.responseJSON.message);
                }
            }
        })
    //获取用户总额和锁定币
    ajaxWithError({
        url:"/eventApply/getExpectedApplyInfo",
        type:"get",
        data:{accountNo:accountNo,eventId:id},
        success:function(data){
            eventId=data.id;
            beginDate=data.event.beginDate;
            endDate=data.event.endDate;
            // 倒计时
            show_time();
            //活动时间
            $(".beginMouth").html(beginDate.substr(5,2));
            $(".beginDay").html(beginDate.substr(8,2));
            $(".beginTime").html(beginDate.substr(10,6));
            $(".endMouth").html(endDate.substr(5,2));
            $(".endDay").html(endDate.substr(8,2));
            $(".endTime").html(endDate.substr(10,6));
            $(".sum").html(Math.floor(data.applyAmount));
            $(".obtain").number(data.expectedIncome,0);
            if(data.applyStatus==0){
                hb.removeClass("hide");
                lock_hb.addClass("hide");
                if(surpls==0){
                    if (!isPopuped) {
                        prompt('活动代币已经派送完毕！无法锁定！');
                    }
                }else if(data.expectedIncome==0){
                    if (!isPopuped) {
                        prompt('您的总额不足！无法锁定！');
                    }
                }
            }else if(data.applyStatus==1){
                $(".unlock").removeClass("hide");
                hb.addClass("hide");
                lock_hb.removeClass("hide");

            }
        },
        error:function(data){
            if (!isPopuped) {
                prompt(data.responseJSON.message);
            }
        }
    })
    // 点击完成跳转到锁定成功页面
    $(".lock_btn").on("click",function(){
        ajaxWithError({
            url:"/eventApply/createEventApply",
            type:"post",
            data:{accountNo:accountNo,eventId:id},
            success:function(data){
                eventId=data.id;
                console.log(eventId);
                hb.addClass("hide");
                lock_hb.removeClass("hide");
                $(".unlock").addClass("hide");
                // if(isAndroid()){
                //     window.SignUpToNative.signUpMethod(true);
                // }else if(isIOS()){
                //     signUpMethod(true);
                // }
                ajaxWithError({
                    url:"/event/getSurplus",
                    type:"get",
                    data:{id:id},
                    success:function(data){
                        $(".remaining").number(data.result,0);
                    },
                    error:function(){
                    }
                })
            },
            error:function(data){
                if (!isPopuped) {
                    prompt(data.responseJSON.message);
                }
            }
        })
    })
    // 点击解除锁定跳转立即锁定页面
    $(".unlock_btn").on("click",function(){

        ajaxWithError({
            url:"/eventApply/cancelEventApply?id=" + eventId,
            type:"post",
            success:function(){
                hb.removeClass("hide");
                lock_hb.addClass("hide");
                // if(isAndroid()){
                //     window.SignUpToNative.signUpMethod(false);
                // }else if(isIOS()){
                //     signUpMethod(false);
                // }
            },
            error:function(data){
                if (!isPopuped) {
                    prompt(data.responseJSON.message);
                }
            }
        })
    })
})
function prompt(message){
    $(".prompt").removeClass("hide");
    $(".prompt").html(message);
    $(".lock").hide();
    $(".unlock").hide();
}
function show_time() {
   var timer=setTimeout("show_time()", 1000);
    var time_start =(new Date()).getTime(); //设定当前时间
    var time_end = moment(endDate).toDate().getTime(); //设定目标时间
    var time_distance = time_end - time_start;
    if(time_distance<=0){
        $(".time_d").html('0');
        $(".time_h").html("0");
        $(".time_m").html("0");
        $(".time_s").html("0");
        clearTimeout(timer);
        if (!isPopuped) {
            prompt('抱歉！活动结束！请期待下次活动吧！');
        }
    }else{
        var int_day = Math.floor(time_distance / 86400000)
        time_distance -= int_day * 86400000;
        var int_hour = Math.floor(time_distance / 3600000)
        time_distance -= int_hour * 3600000;
        var int_minute = Math.floor(time_distance / 60000)
        time_distance -= int_minute * 60000;
        var int_second = Math.floor(time_distance / 1000)
        if (int_day < 10) {int_day = "0" + int_day;}
        if (int_hour < 10) {int_hour = "0" + int_hour;}
        if (int_minute < 10) {int_minute = "0" + int_minute;}
        if (int_second < 10) {int_second = "0" + int_second;}
        $(".time_d").html(int_day);
        $(".time_h").html(int_hour);
        $(".time_m").html(int_minute);
        $(".time_s").html(int_second);
    }

}
// var ua = navigator.userAgent;
// function isAndroid() {
//     return ua.indexOf('Android') > 0;
// }
// function isIOS() {
//     return /(iPhone|iPad|iPod)/i.test(ua);
// }




