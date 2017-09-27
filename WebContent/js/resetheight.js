   // Note: You will also need to change this variable in the "variable.less" file.
	$.navbar_height = 49;

    $.footer_height = 45;

	/*
	 * APP DOM REFERENCES
	 * Description: Obj DOM reference, please try to avoid changing these
	 */
	$.root_ = $('body');
	$.left_panel = $('#left-panel');
    $.footer = $('#footer');

/*
* NAV OR #LEFT-BAR RESIZE DETECT
* Description: changes the page min-width of #CONTENT and NAV when navigation is resized.
* This is to counter bugs for min page width on many desktop and mobile devices.
* Note: This script uses JSthrottle technique so don't worry about memory/CPU usage
*/

// Fix page and nav height
function nav_page_height() {
	var setHeight = $('#main').height();
	//menuHeight = $.left_panel.height();

	var windowHeight = $(window).height() - $.navbar_height ;
	//set height
	if (setHeight > windowHeight) {// if content height exceedes actual window height and menuHeight
		$.left_panel.css('min-height', setHeight + $.footer_height + 'px');
		$.root_.css('min-height', setHeight + $.navbar_height + $.footer_height + 'px');
        $.footer.css('top', setHeight + $.navbar_height + $.footer_height -5 + 'px');

	} else {
		$.left_panel.css('min-height', windowHeight - $.footer_height+ 'px');
		$.root_.css('min-height', windowHeight + $.footer_height + 'px');
        $.footer.css('top', windowHeight + $.navbar_height - $.footer_height -5 + 'px');
	}
}

$('#main').resize(function() {
	nav_page_height();
	check_if_mobile_width();
});

$('nav').resize(function() {
	nav_page_height();
});

function check_if_mobile_width() {
	if ($(window).width() < 979) {
		$.root_.addClass('mobile-view-activated');
	} else if ($.root_.hasClass('mobile-view-activated')) {
		$.root_.removeClass('mobile-view-activated');
	}
}



