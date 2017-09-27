
/* Form action bar */

(function ($) {

    $.formbar = function init(){
        var c = $('#content');
        var action_bar = $('.form-action-bar');
        
        if (action_bar.length) {

            window.onscroll = doResize;
            doResize();

            c.resize(function(event) {
                c.unbind('resize');
                doResize();
                c.resize(arguments.callee);
            });
        }
        if (window.__admin_ismobile__) {
            $(window).bind('resize', function (e) {
                var rate = $(window).height() / $(window).width();
                var action_bar = $('.form-action-bar');
                if (rate < 1) {
                    action_bar.css('display', 'none');
                } else {
                    action_bar.css('display', 'block');
                }
            });
        }
    }

    function doResize() {
        var c = $('#content');
        var action_bar = $('.form-action-bar');

        if (action_bar.length) {
            action_bar.removeClass('fixed');
            var aheight = action_bar.offset().top - action_bar.outerHeight();
            var cheight = c.offset().top;
            var height = cheight + aheight;

            var s = (document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight;
            if (s < height) {
                action_bar.addClass('fixed');
            }
            else {
                action_bar.removeClass('fixed');
            }
        }
    }

})(jQuery);