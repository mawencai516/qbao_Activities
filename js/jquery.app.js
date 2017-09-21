/* Theme Name: Skylia
   Author: Themesdesign
   Version: 1.0.0
   Created: April 2017
   File Description:Main JS file of the template
*/
(function ($) {
    'use strict';
    function initLoader() {
        $(window).load(function() {
            $('#status').fadeOut();
            $('#preloader').delay(350).fadeOut('slow');
            $('body').delay(350).css({
                'overflow': 'visible'
            });
        });
    }
    function initFancybox() {
        $(".fancybox").fancybox({
            helpers : {
                overlay : {
                    speedOut : 0,
                    locked: false
                }
            }
        });
    }
    function initScreenshotSlider() {
        $(".owl-screenshot").owlCarousel({
            items : 4,
            itemsDesktop : [1000, 2],
            itemsDesktopSmall : [768, 1],
            itemsTablet: [568, 1],
            lazyLoad: true,
            autoPlay: true,
            pagination : true,
            stopOnHover: true,
            navigation : false
        });
    }
    function initScrollMenu() {
        $(window).scroll(function () {
            var secondFeature = $('#features').offset().top;
            var scroll = $(window).scrollTop();
            if (scroll >= 576) {
                $('.sticky-navigation').css({"background": '#68b8f9'});
            } else {
                $('.sticky-navigation').css({"background": 'transparent'});
            }
            if (scroll >= secondFeature - 200) {
                $(".mobileScreen").css({'background-position': 'center top'});
            }
            return false;
        });
    }
    function initPageScroll() {
        $('.page-scroll').on('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    }
    function initMagnificPopoup() {
        $(document).ready(function() {
            $('.video-play-icon').magnificPopup({
              disableOn: 700,
              type: 'iframe',
              mainClass: 'mfp-fade',
              removalDelay: 160,
              preloader: false,

              fixedContentPos: false
            });
        });
    }
    function init() {
        initLoader();
        initFancybox();
        initScreenshotSlider();
        initScrollMenu();
        initPageScroll();
        initMagnificPopoup();
    }
    init();
})(jQuery);