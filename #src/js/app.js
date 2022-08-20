'use strict';

//=include ../../node_modules/jquery/dist/jquery.js
//=include ../../node_modules/device.js/dist/device.umd.js
//=include ../../node_modules/swiper/swiper-bundle.js

//=include ../modules/cheg.scrollbar/functions.js
//=include ../modules/cheg.scrolllock/functions.js
//=include ../modules/cheg.menu/functions.js
//=include ../modules/cheg.popups/functions.js
//=include ../modules/cheg.checkwebp/functions.js

let winHeight,
	scrollOffset = 80,
	popupOpened = false,
	popupOpenedPos = 0,
	scrollPos = 0,
	animDuration = 200,
	pageLoaded = false,
	formTitle = '',
	deviceIs = device.device;

deviceIs.addClasses(document.documentElement);

(function () {
	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
	} else {
		$('html').addClass('no-touch');
	}

	winHeight = $(window).height();
	scrollPos = $(window).scrollTop();

	// Main init
	init();

	//popup('request');

	// Click on burger
	$(document).on('click', '.menu-toggle', function () {
		if (!menuOpened) {
			menuOpen();
		} else {
			menuClose();
		}
	});



	if (deviceIs.desktop) {
		$(window).on('resize', function () {
			vhFix();
		});
	} else {

	}

	if (deviceIs.mobile || deviceIs.tablet) {
		$(window).on('orientationchange', function () {
			vhFix();
		});
	}

	$(window).on('resize', function () {
		winHeight = $(window).height();
		scrollPos = $(window).scrollTop();

		scrollbarWidth();
		units();

		if (menuOpened) {
			menuClose();
		}
	});
	$(window).on('scroll', function () {
		scrollPos = $(window).scrollTop();
	});

	$(window).trigger('resize').trigger('scroll');

	// Reject input any symbol if not 0-9, (), -, +
	$(document).on('input change paste keyup', 'input.phone-number, .send-form .ui-form-field[data-field-type="phone"] input', function () {
		$(this).val(this.value.replace(/[^0-9\+ ()\-]/, ''));
	});

	// Scroll to element
	$(document).on('click', 'a[href^="#"]', function (e) {
		e.preventDefault();
		var target = $(this).attr('href');
		if ($(target).length) {
			var targetPos = $(target).offset().top - scrollOffset;
			$('html, body').animate({
				scrollTop: targetPos
			}, 500);
		}
	});

	//=include ../modules/cheg.popups/init.js
})(jQuery);

$(window).on('load', function () {
	setTimeout(function () {
		$('body').addClass('body--page-loaded');
		pageLoaded = true;
		$(window).trigger('scroll');
	}, 300);
});

/*! vh fix */
function vhFix() {
	$('body').append('<div class="vh-fix" style="position:fixed;width:1px;left:-9999px;top:0;bottom:0;pointer-events:none;opacity:0;visibility:hidden;" />');

	var vh = $('.vh-fix').height() * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');

	$('.vh-fix').remove();
}

/*! Яндекс.Карты */
function yandexMap(block) {
	var id = block.attr('id'),
		mapArr = JSON.parse(block.attr('data-map-arr')),
		center = mapArr[0].coords,
		marker = block.attr('data-map-marker');

	ymaps.ready(function() {
		initYMap(center, id, mapArr, marker);
	});

	block.data('init', true);
}
function initYMap(coords, id, arr, marker) {
	var map = new ymaps.Map(id, {
		center: coords,
		zoom: 16
	});

	var pixelCenter = map.getGlobalPixelCenter(coords);
	var geoCenter = map.options.get('projection').fromGlobalPixels(pixelCenter, map.getZoom());
	map.setCenter(geoCenter);

	$.each(arr,function(i) {
		var mapArrItem = arr[i];

		var mapPlacemark = new ymaps.Placemark(mapArrItem['coords'], {
			hintContent:'<div class="map-ball-hint"><div>'+mapArrItem['hint']+'</div></div>'
		}, {
			iconLayout: 'default#image',
			iconImageHref: marker,
			iconImageSize: marker ? [32, 48] : [34, 40],
			iconImageOffset: marker ? [-16, -48] : [-17, -40],
			balloonOffset: marker ? [0, -60] : [0, -40],
			hideIconOnBalloonOpen:false,
			balloonMaxWidth:200
		});

		map.geoObjects.add(mapPlacemark);
	});

	map.controls.add(new ymaps.control.ZoomControl());
	map.behaviors.disable('scrollZoom');

	if (arr.length > 1) {
		map.setBounds(map.geoObjects.getBounds());
		map.setZoom(map.getZoom()-2);
	}
}

/*! Units */
function units() {
	scrollOffset = 78;

	if (window.matchMedia('(max-width:1000px)').matches) {
		scrollOffset = 50;
	}

	let contO = ($(window).width() - $('.header .inner').width()) / 2;
	document.documentElement.style.setProperty('--contO', contO + 'px');
}

/*! Intro */
function introInit(block) {
	let slider = block.find('.intro__slider'),
		sliderS,
		sliderOpts = {
			slidesPerView: 1,
			loop: true,
			speed: 500,
			grabCursor: false,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			init: true,
			pagination: {
				el: block.find('.intro-nav__list').get(0),
				clickable: true,
				renderBullet: function(i, className) {
					return '<div class="intro-nav__item ' + className + '"></div>';
				}
			}
		};

	if (window.matchMedia('(min-width:1001px)').matches) {
		sliderOpts.effect = 'fade';
		sliderOpts.noSwiping = true;
		sliderOpts.noSwipingClass = 'swiper-slide';
	} else {
		sliderOpts.effect = 'slide';
	}

	sliderS = new Swiper(slider.get(0), sliderOpts);

	block.data('init', true);
}

/*! Init */
function init() {
	units();

	// Intro
	$('.intro').each(function () {
		if ($(this).data('init') !== true) {
			introInit($(this));
		}
	});

	// Popups
	$('.popup').each(function () {
		if ($(this).data('init') !== true) {
			popupsInit($(this));
		}
	});

	// Map
	$('.ya-map').each(function () {
		if ($(this).data('init') !== true) {
			yandexMap($(this));
		}
	});
}