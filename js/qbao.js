new Vue({
    el: '#app',
    data: {
        i18n: {}
        // ltr: true
    },
    methods:{
        changeLanguage: function(lang) {
            lang = lang.substring(0, 5);
            console.log(lang);
            lang = lang.toLowerCase();
            if (lang === 'zh-cn') {
                this.i18n = window.i18n_zhj;
            }
            else if (lang === 'zh-tw') {
                this.i18n = window.i18n_zhf;
            }
            lang = lang.substring(0, 2);
             if (lang === 'en') {
                this.i18n = window.i18n_en;
                move("803px","294","38%");
            }
            else if (lang === 'ja') {
                this.i18n = window.i18n_ja;
                move("775","298","36%");
            }
            else if (lang === 'ko') {
                this.i18n = window.i18n_ko;
                $("#moveid").css("height","754");
                $(".z_box").mouseenter(function(){
                    $(".sjindu").css("height","37%");
                })
                $(".z_box").mouseleave(function(){
                    $(".sjindu").css("height","0");
                })
            }
            else if (lang === 'ru') {
                this.i18n = window.i18n_ru;
                move("800","314","38%");
            }
            else if (lang === 'es') {
                this.i18n = window.i18n_es;
                move("800","314","38%");
            }
            else if (lang === 'de') {
                this.i18n = window.i18n_de;
                move("851","320","38%");
            }
            else if (lang === 'fr') {
                this.i18n = window.i18n_fr;
                move("875","352","40%");
            }
            else if (lang === 'pt') {
                this.i18n = window.i18n_pt;
                move("825","315","40%");
            }
            else if (lang === 'th') {
                this.i18n = window.i18n_thai;
                $("#moveid").css("height","754");
                $(".z_box").mouseenter(function(){
                    $(".sjindu").css("height","34%");
                })
                $(".z_box").mouseleave(function(){
                    $(".sjindu").css("height","0");
                })
            }
        }
    },
    created: function () {
        var lang = localStorage.getItem('i18n') || navigator.language || navigator.browserLanguage || 'zh_CN';
        this.changeLanguage(lang);
    }
})
function move(h1,h2,h3) {
    $("#moveid").css("height",h1);
    $(".service-box").css("height",h2);
    $(".z_box").mouseenter(function(){
        $(".sjindu").css("height",h3);
    })
    $(".z_box").mouseleave(function(){
        $(".sjindu").css("height","0");
    })
}
// 移动功能
function change(url){
     $(".myImg").attr("src",url);
}
// 判断是否登录
var url=window.location.search;
var loc=url.substring(url.indexOf("=")+1,url.length);
if(loc==="true"){
    $(".avatar").hide();
    $(".default").show();
    $(".nav_userbox_name").html(localStorage.getItem("userName"));
    console.log(localStorage.getItem("header"));
    if(localStorage.getItem("header")=="default.png"){
        $(".default > a >img").attr("src","images/default.png");
    }else{
        $(".default > a >img").attr("src",'localStorage.getItem("header")');
    }
}else{
    $(".default").hide();
    $(".avatar").show();
}
function logout(){
    localStorage.clear();
    window.location.href="login.html";

}

