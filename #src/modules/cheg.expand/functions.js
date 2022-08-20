/*! Expandable blocks */
function expandInit(ex) {
	var exPrefix = 'ui-expand',
		hidd = ex.find('.' + exPrefix + '__hidden'),
		trig = ex.find('.' + exPrefix + '__trigger'),
		trigText = trig.find('.' + exPrefix + '__trigger-text'),
		closedText = trig.attr('data-closed-text'),
		openedText = trig.attr('data-opened-text');

	trigText.text(closedText);

	trig.on('click', function () {
		if (!ex.hasClass('active')) {
			ex.addClass('active');
			hidd.slideDown(400);
			trigText.text(openedText);
		} else {
			//var exPos = ex.offset().top - scrollOffset - 30;
			//$('html, body').animate({scrollTop:exPos},500);
			ex.removeClass('active');
			hidd.slideUp(400);
			trigText.text(closedText);
		}
	});
}