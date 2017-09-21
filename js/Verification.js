 //验证
var checkAll = {
    str: {
        UserAuthentication:/^[A-Za-z0-9_\u4e00-\u9fa5]{1,16}$/,
        passwordA:/^[a-zA-Z0-9 &!#$%()*+,-=.\/:;?@\[\]^_`<>{|}~]+$/,
        emailA:/^\w+([-.]\w+)*@\w+([-]\w+)*\.(\w+([-]\w+)*\.)*[a-z]{2,3}$/,
        userId:/^\d{6}$/,
    },
    passwordStr: {
        UPPER : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        LOWER : "abcdefghijklmnopqrstuvwxyz",
        NUMBER : "0123456789",
        CHARACTER : "~`!@#$%^&*()_-+={}[]|;:,<>.?/"
    },
    msg: {
        msg0 : jsMsg.msg0,
        msg1 : jsMsg.msg1,
        msg2 : jsMsg.msg2,
        msg3 : jsMsg.msg3,
        msg4 : jsMsg.msg4,
        msg5 : jsMsg.msg5,
        msg6 : jsMsg.msg6,
        msg7 : jsMsg.msg7,
        msg8 : jsMsg.msg8,
        msg9 : jsMsg.msg9,
    },
    onoff:null,
    /*对应校验条目*/
    checkItem1: function(value){
        if(value == " " || value == ""){
            return 0;
        }else{
            return 1;
        }
    },
    checkLength: function(value){
        if(value.length > 16 || value.length<1){
            return 0;
        }else{
            return 1;
        }
    },
    checkItem2: function(value){
        if(value == " " || value == ""){
            return 0;
        }else{
            if (this.str.UserAuthentication.test(value)) {
                return 1;
            }else{
                return 0;
            }
        }
    },
    checkUserId:function(value){
        if(value == " " || value == ""){
            return 0;
        }else if(value.length > 6 || value.length<1){
            return 0;
        }else{
            if (this.str.userId.test(value)) {
                return 1;
            }else{
                return 0;
            }
        }
    },
    checkItem4:function(value){
        if(value == " " || value == ""){
            return 0;
        }else if(value.length < 6 || value.length >20){
            return 0;
        }else{
            if (this.str.passwordA.test(value)) {
                return 1;
            }else{
                return 0;
            }
        }
    },
    checkItem5: function(value){
        if(value == ""){
            return 0;
        }else{
            var item3Result = {UPPER:0,LOWER:0,NUMBER:0,CHARACTER:0};
            for (j in this.passwordStr) {
                var strKey = j;
                var strValue = this.passwordStr[strKey];
                for (k = 0; k < value.length; k++) {
                    if (strValue.indexOf(value.charAt(k)) > -1) {
                        item3Result[strKey] = 1;
                    }
                }
            }
            if(item3Result.UPPER + item3Result.LOWER + item3Result.NUMBER +item3Result.CHARACTER > 1){
                return 1;
            }else{
                return 0;
            }
        }
    },
    checkboxed:function(value){
        if(value){
            return 1;
        }else{
            return 0;
        }
    },
    radios:function(){
        $('#Useragreement').click(function(){
            if($(this).attr("checked")){
                $(this).removeAttr("checked")
            }else{
                $(this).attr("checked",true)
            }

        })
    },
    checkemail:function(value){
        if(value == " " || value == ""){
            return 0;
        }else{
            if(this.str.emailA.test(value)){
                return 1;
            }else{
                return 0;
            }
        }
    },
    init : function(){
        var that = this;
        // 用户名
        jQuery('#username').bind('keyup',function(event){
            var value = jQuery(this).val();
            console.log(value.length);
            $('#username').prev().addClass('active');
            if(that.checkItem1(value) === 0){
                $('#username').parent().parent().find(".user-name-tip").html(that.msg.msg3).removeClass("gray-color").addClass("red-color");
                $('#username').parent().addClass('text-wrong-style');
                $('#username').next().addClass('hide');
            }else if(that.checkLength(value) === 0){
                $('#username').parent().parent().find(".user-name-tip").html(that.msg.msg4).removeClass("gray-color").addClass("red-color");
                $('#username').parent().addClass('text-wrong-style');
                $('#username').next().addClass('hide');
            }else if(that.checkItem2(value) === 0){
                $('#username').parent().parent().find(".user-name-tip").html(that.msg.msg0).removeClass("gray-color").addClass("red-color");
                $('#username').parent().addClass('text-wrong-style');
                $('#username').next().addClass('hide');
            }else{
                $('#username').parent().parent().find(".user-name-tip").html('').removeClass("red-color").addClass("gray-color");
                $('#username').parent().removeClass('text-wrong-style');
                $('#username').next().removeClass('hide');
            }
        });
        jQuery('.checkbox-wrap label').on('click',function(){
            if(that.checkboxed($('#Useragreement').attr('checked')) == 0){
                $(this).parent().find('.form-tip').html(that.msg.msg9).addClass("red-color");
            }else{
                $(this).parent().find('.form-tip').html('').removeClass("red-color");
            }
        })
        // 钱包id
        jQuery('#userId').bind('keyup',function(){
            $('#userId').prev().addClass('active');
            var value = jQuery(this).val();
            if(that.checkUserId(value)=== 0 ){
                $('#userId').parent().parent().find('.form-tip').html(that.msg.msg1).addClass("red-color");
                $('#userId').parent().addClass('text-wrong-style');
                $('#userId').next().addClass('hide');
            }else{
                $('#userId').parent().parent().find('.form-tip').html('').removeClass("red-color");
                $('#userId').parent().removeClass('text-wrong-style');
                $('#userId').next().removeClass('hide');
            }
        });
        // 密码
        jQuery('#password,#Login-password').bind('keyup blur',function(){
            var value = jQuery(this).val();
            $('#password').prev().addClass('active');
            if(that.checkItem4(value) === 0){
                $('#password').parent().parent().find('.form-tip').html(that.msg.msg2).addClass("red-color");
                $('#password').parent().addClass('text-wrong-style');
                $('#password').next().addClass('hide');
            }
            else if(that.checkItem5(value) === 0){
                $('#password').parent().parent().find('.form-tip').html(that.msg.msg8).addClass("red-color");
                $('#password').parent().addClass('text-wrong-style');
                $('#password').next().addClass('hide');
            }else{
                $('#password').parent().parent().find('.form-tip').html('').removeClass("red-color");
                $('#password').parent().removeClass('text-wrong-style');
                $('#password').next().removeClass('hide');
            }
        });
        //重新确认密码
        $('#re_password').bind('keyup blur',function(){
            $('#re_password').prev().addClass('active');
            var value = jQuery(this).val();
            if(value !== $('#password').val()){
                $('#re_password').parent().parent().find('.form-tip').html(that.msg.msg7).addClass("red-color");
                $('#re_password').parent().addClass('text-wrong-style');
                $('#re_password').next().addClass('hide');
            }else if($('#password').val()==""){
                $('#re_password').parent().parent().find('.form-tip').html(that.msg.msg6).addClass("red-color");
                $('#re_password').parent().addClass('text-wrong-style');
                $('#re_password').next().addClass('hide');
            }else{
                $('#re_password').parent().parent().find('.form-tip').html("").removeClass("red-color");
                $('#re_password').parent().removeClass('text-wrong-style');
                $('#re_password').next().removeClass('hide');
            }
        })
        // 邮箱
        jQuery('#email,#pwdemail').bind('keyup',function(){
            $('#email,#pwdemail').prev().addClass('active');
            var value = jQuery(this).val();
            if(that.checkemail(value) == 0 ){
                $('#email,#pwdemail').parent().parent().find('.form-tip').html(that.msg.msg5).addClass("red-color");
                $('#email,#pwdemail').parent().addClass('text-wrong-style');
                $('#email,#pwdemail').next().addClass('hide');
            }else{
                $('#email,#pwdemail').parent().parent().find('.form-tip').html('').removeClass("red-color");
                $('#email,#pwdemail').parent().removeClass('text-wrong-style');
                $('#email,#pwdemail').next().removeClass('hide');
            }
        });
        jQuery('#email').bind('blur',function(){
            var email = $('#email').val();
            if(that.checkemail(email)== 1){
                ajax({
                    url:"/account/checkIsEmail",
                    type:"get",
                    data:{email:email},
                    success:function(data){
                        if(data.result){
                            $('#email').parent().parent().find('.form-tip').html('').removeClass("red-color");
                            $('#email ').attr('pass','y');
                            that.onoff = 1;
                        }else{
                            $('#email').parent().parent().find('.form-tip').html(jsMsg.htmlEmailReg).addClass("red-color");
                            $('#email').attr('pass','n');
                        }
                    },
                })
            }
        })
        // 注册
        function ruguo(){
            if(that.checkItem1($('#username').val()) === 0 || that.checkItem2($('#username').val()) == 0){
                $('#username').parent().parent().find(".user-name-tip").html(that.msg.msg3).removeClass("gray-color").addClass("red-color");
                $('#username').parent().addClass('text-wrong-style');
            }
            if(that.checkItem4($('#password').val()) === 0){
                $('#password').parent().parent().find('.form-tip').html(that.msg.msg2).addClass("red-color");
                $('#password').parent().addClass('text-wrong-style');
            }
            if(that.checkemail($('#email').val()) === 0){
                $('#email').parent().parent().find('.form-tip').html(that.msg.msg5).addClass("red-color");
                $('#email').parent().addClass('text-wrong-style');
            }
            if(that.checkUserId($('#userId').val()) === 0){
                $('#userId').parent().parent().find('.form-tip').html(that.msg.msg5).addClass("red-color");
                $('#userId').parent().addClass('text-wrong-style');
            }
            if($('#re_password').val() === ""){
                $('#re_password').parent().parent().find('.form-tip').html(that.msg.msg6).addClass("red-color");
                $('#re_password').parent().addClass('text-wrong-style');
            }
        }
        jQuery('#emailregister').bind('click',function(){
            var accountName=$("#username").val();
            var password=$("#password").val();
            var re_password=$("#re_password").val();
            var email=$("#email").val();
            console.log(email);
            var checkItem=that.checkItem1(accountName) === 1 && that.checkItem2(accountName) == 1 &&
                that.checkItem4(password) == 1&&
                that.checkItem5(password) == 1 && that.checkemail(email) == 1 &&
                password==re_password && that.checkboxed($('#Useragreement').attr('checked')) == 1;
                if(checkItem){
                    $("#emailregister").val("正在发送邮件,请稍等...");
                    if($("#emailregister").val()=="正在发送邮件,请稍等..."){$(this).attr('disabled',false);}
                    $(this).attr('disabled',true);
                    var password=md5($("#password").val());
                    ajax({
                        url:"/account/saveUser",
                        type:"post",
                        data:{accountName:accountName,email:email,password:password,sourceType:2},
                        success:function(data){
                            console.log(data);
                            window.location.href='reg_commit.html';
                            localStorage.setItem("email",email);
                        },
                        error:function(data){
                            alert(data.message);
                            location.replace(document.referrer);
                        }
                    })
                }else{
                 ruguo();
                }
                return false;
            });
        //钱包ID注册
        jQuery('#idregister').bind('click',function(){
            var accountName=$("#username").val();
            var password=$("#password").val();
            var re_password=$("#re_password").val();
            var email=$("#email").val();
            var userId=$("#userId").val();
            console.log(email);
            var checkItem=that.checkItem1(accountName) === 1 && that.checkItem2(accountName) == 1 &&
                that.checkItem4(password) == 1&&
                that.checkItem5(password) == 1 && that.checkemail(email) == 1 &&
                password==re_password && that.checkboxed($('#Useragreement').attr('checked')) == 1;
            if(checkItem && (that.checkUserId(userId) === 1)){
                $("#idregister").val("正在发送邮件,请稍等...");
                if($("#idregister").val()=="正在发送邮件,请稍等..."){$(this).attr('disabled',false);}
                $(this).attr('disabled',true);
                var password=md5($("#password").val());
                ajax({
                    url:"/account/saveAccount",
                    type:"post",
                    data:{accountName:accountName,email:email,password:password,accountNo:userId},
                    success:function(data){
                        window.location.href='reg_commit.html';
                        localStorage.setItem("email",email);
                    },
                    error:function(data){
                        alert(data.message);
                        location.replace(document.referrer);
                    }
                })
            }else{
                ruguo();
            }
            return false;
        });
        //找回密码
        jQuery('#pwdemail').bind('keyup blur',function(){
            var pwdemail=$('#pwdemail').val();
            if(that.checkemail(pwdemail) === 0){
                $('#pwdemail').parent().parent().find('.form-tip').html(that.msg.msg5).addClass("red-color");
                $('#pwdemail').parent().addClass('text-wrong-style');
            }else{
                $('#pwdemail').parent().parent().find('.form-tip').html('').removeClass("red-color");
                $('#pwdemail').parent().removeClass('text-wrong-style');
                $('#pwdemail').prev().addClass('active');
            }
        });
        // 点击下一步验证
        jQuery('.passcard-btn').bind('click',function(){
            var pwdemail=$('#pwdemail').val();
            if(that.checkemail(pwdemail) === 1){
                $(this).attr('disabled',true);
                ajax({
                    url:"/account/resetPwdEmail",
                    type:"get",
                    data:{email:pwdemail},
                    success:function(data) {
                        localStorage.setItem("email",pwdemail);
                        window.location.href="reg_commit.html";
                    },
                    error:function(data) {
                        $('#pwdemail').parent().parent().find('.form-tip').html(data.message).addClass("red-color");
                    },
                })
            }else{
                if(that.checkemail($('#pwdemail').val()) === 0 ){
                    $('#pwdemail').parent().parent().find(".form-tip").html(that.msg.msg5).removeClass("gray-color").addClass("red-color");
                    $('#pwdemail').parent().addClass('text-wrong-style');
                }
                if($('#pwdemail').val() ===""){
                    $('#pwdemail').parent().parent().find(".form-tip").html(that.msg.msg5).removeClass("gray-color").addClass("red-color");
                    $('#pwdemail').parent().addClass('text-wrong-style');
                }
            }
            return false;
        });
        // 修改密码  确认密码
        $('#setpassword').bind('keyup blur',function(){
            $('#setpassword').prev().addClass('active');
            var value = jQuery(this).val();
            if(that.checkItem4(value) == 0){
                $('#setpassword').parent().parent().find('.form-tip').html(that.msg.msg2).addClass("red-color");
                $('#setpassword').parent().addClass('text-wrong-style');
            }
            else if(value == $('#confirmpassword').val()){
                $('#confirmpassword').parent().parent().find('.form-tip').html("").removeClass("red-color");
                $('#confirmpassword').parent().removeClass('text-wrong-style');
            }
            else if(that.checkItem5(value) == 0){
                $('#setpassword').parent().parent().find('.form-tip').html(that.msg.msg8).addClass("red-color");
                $('#setpassword').parent().addClass('text-wrong-style');
            }else{
                $('#setpassword').parent().parent().find('.form-tip').html("").removeClass("red-color");
                $('#setpassword').parent().removeClass('text-wrong-style');
            }
        })
        $('#confirmpassword').bind('keyup blur',function(){
            $('#confirmpassword').prev().addClass('active');
            var value = jQuery(this).val();
            if(value != $('#setpassword').val()){
                $('#confirmpassword').parent().parent().find('.form-tip').html(that.msg.msg7).addClass("red-color");
                $('#confirmpassword').parent().addClass('text-wrong-style');
            }else{
                $('#confirmpassword').parent().parent().find('.form-tip').html("").removeClass("red-color");
                $('#confirmpassword').parent().removeClass('text-wrong-style');
            }
        })
        $('#modifyPass').bind('click',function(){
            var setpassword=$('#setpassword').val();
            var confirmpassword=$('#confirmpassword').val();
            if(setpassword != confirmpassword){
                $('#confirmpassword').parent().parent().find('.form-tip').html(that.msg.msg7).addClass("red-color");
                $('#confirmpassword').parent().addClass('text-wrong-style');

            }else if(that.checkItem5(setpassword) == 0){
                $('#setpassword').parent().parent().find('.form-tip').html(that.msg.msg8).addClass("red-color");
                $('#setpassword').parent().addClass('text-wrong-style');
            }else if(that.checkItem4(setpassword) == 1 && that.checkItem5(confirmpassword) == 1 && setpassword == confirmpassword){
                $(this).attr('disabled',true);
                ajax({
                    url:"/account/resetPwd",
                    type:"get",
                    data:{password:md5($('#setpassword').val()),accountNo:GetQueryString("account"),code:GetQueryString("code")},
                    success:function(data) {
                        $('#loginform').submit();
                        window.location.href="change_password_commit.html";
                    },
                    error:function(data) {
                    },
                })
            }else{
                $('#setpassword').parent().parent().find('.form-tip').html(that.msg.msg2).addClass("red-color verify-tips-text");
                $('#setpassword').parent().addClass('text-wrong-style');
            }
        })
        // 判断是否是钱包用户首次登录,进行注册
        var url=window.location.search ;
        var loc=url.substring(url.indexOf("=")+1,url.length);
        if(loc=="true"){
            $("#UId").show();
            $("#emailregister").addClass("hide");
            $("#idregister").removeClass("hide");
            jQuery('#userId').bind('blur',function(){
                var userId = $('#userId').val();
                if(that.checkUserId(userId)== 1){
                    ajax({
                        url:"/account/findAccountName",
                        type:"get",
                        data:{accountNo:userId},
                        success:function(data){
                            $("#username").val(data.accountName).prev().addClass('active');
                        },
                        error:function(data){
                            $('#userId').parent().parent().find('.form-tip').html(data.message).addClass("red-color");
                        }
                    })
                }
            })
        }else{
            $("#UId").hide();
        }
    }
};
checkAll.init();
checkAll.radios();
