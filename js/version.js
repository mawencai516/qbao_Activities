$(function(){
$('#Login-user').keyup(function(){
    $(this).parent().addClass('text-wrong-style');
    $(this).prev().addClass('active');
});
$('#Login-password').keyup(function(){
    $(this).parent().addClass('text-wrong-style');
    $(this).prev().addClass('active');
});
jQuery('#login-btn').bind('click',function(){
    var user=$("#Login-user").val();
    var password=md5($("#Login-password").val());
    console.log(password);
    $(this).attr('disabled',true);
    ajax({
            url:"/account/login",
            type:"post",
            data:{noOrEmail:user,password:password},
            success:function(data){
                $("#login-btn").val("登录中...");
                 window.location.href='index.html?login=true';
                 console.log(data);
                localStorage.setItem("userName",data.userName);
                localStorage.setItem("header",data.header);
                localStorage.setItem("token",data.token);
            },
            error:function(data){
                console.log(data);
                $("#error-tips").removeClass("hide");
                $("#error-tips > span").html(data.message);

            }
    })
});
})