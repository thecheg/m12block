/*! Popups */
/*! Open popup */
function popup(id, form, h1, h2, btn) {
	if ($('#' + id).length) {
		popupOpenedPos = $(window).scrollTop();

		$('body').addClass('body--popup-opened');
		scrollLock();

		$('.popup').removeClass('active');
		let popup = $('.popup#' + id);

		popup.scrollTop(0).addClass('active');
		popupOpened = true;
	}
}

/*! Open video popup */
function videoPopup(id, videoUrl) {
	if ($('#' + id).length) {
		popupOpenedPos = $(window).scrollTop();

		$('body').addClass('body--popup-opened');
		scrollLock();

		$('.popup').removeClass('active');
		var popup = $('.popup#' + id);
		popup.find('.popup__video').html('<iframe src="' + videoUrl + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
		popup.scrollTop(0).addClass('active');
		popupOpened = true;
	}
}

/*! Close popup */
function popupClose() {
	$('.popup').removeClass('active');

	setTimeout(function () {
		scrollLock('unlock');
		$('body').removeClass('body--popup-opened');
	}, animDuration);

	if (deviceIs.ios) {
		$(window).scrollTop(popupOpenedPos);
	}
	$('.popup__video').html('');

	$('.popup .send-form').each(function () {
		clearForm($(this));
	});

	popupOpened = false;
}

/*! TY popup */
function thx(thx) {
	$('.popup').removeClass('active');
	if (!thx) {
		thx = 'thx';
	}
	popup(thx);

	$('.popup .send-form').each(function () {
		clearForm($(this));
	});
}

/*! Popups */
function popupsInit(popup) {
	let mod = popup.attr('data-popup-close') ? 'popup__close--' + popup.attr('data-popup-close') : '';
	popup.find('.popup__close-container')
		.prepend(`<div class="cross-btn popup__close ${mod} noselect" />`);

	popup.data('init', true);
}