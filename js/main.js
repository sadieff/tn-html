$(document).ready(function(){

	/**
	 * Menu
	 */

	$(document).on('click', '.header-menu_open', function(){
		$(this).add('nav,.wrap').toggleClass('active');
	});
	$(document).on('click', function(e){
		if (!$(e.target).closest("header").length) {
			$('.header-menu_open,nav,.wrap').removeClass('active');
		}
	});

	/**
	 * Carousels
	 */

	$('.js-mediabox').owlCarousel({
		loop: false,
		margin: 10,
		dots: true,
		dotsClass: "media-dots",
		navContainerClass: "media-nav",
		items: 1,
		responsive : {
			0 : {
				items: 1,
				margin: 10,
				autoWidth: true
			},
			768 : {
				items: 2,
				margin: 40,
				autoWidth: true
			},
			1200 : {
				items: 3
			}
		}
	});

	$('.js-filter-carousel').owlCarousel({
		loop: false,
		margin: 30,
		dots: false,
		nav: false,
		autoWidth: true,
		responsive : {
			0 : {
				margin: 20
			},
			768 : {
				margin: 30
			},
		}
	});

	/*$('.filter-item input[type=text]').each(function(){
		$(this).datepicker({
			range: true,
			onSelect: function(fd, d, picker) {
				let date = fd.split(','),
					dateStart = date[0],
					dateEnd = date[1];
				$('input[name=date-start]').val(dateStart);
				$('input[name=date-end]').val(dateEnd);
			}
		});
	});*/
	$('.filter-item input[name=date-start]').datepicker({
		position: "bottom left"
	});
	$('.filter-item input[name=date-end]').datepicker({
		position: "bottom right"
	});

	/**
	 * Медиагалерея
	 */

	if($('.media-photo-enum').width() > 0) {
		$('.media-item-picture').each(function(){
			let image = $(this).find('img').clone().appendTo(".js-main-media, .js-nav-media");
		});
	}

	let mainMediaSlider = $('.js-main-media');
	mainMediaSlider.owlCarousel({
		loop: false,
		margin: 0,
		dots: false,
		nav: true,
		items: 1
	});

	let navMediaSlider = $('.js-nav-media');
	navMediaSlider.owlCarousel({
		loop: false,
		margin: 10,
		dots: false,
		nav: false,
		autoWidth: true
	});

	mainMediaSlider.on('changed.owl.carousel', function(event) {
		let active = navMediaSlider.find('.owl-item').eq(event.item.index);
		navMediaSlider.trigger('to.owl.carousel', event.item.index);
		active.siblings().removeClass('opened');
		active.addClass('opened');
	});

	$(document).on('click', '.js-nav-media .owl-item', function(){
		$(this).siblings().removeClass('opened');
		$(this).addClass('opened');
		mainMediaSlider.trigger('to.owl.carousel', $(this).index());
	});

	$('.media-item-picture').on('click', function(e){
		navMediaSlider.trigger('to.owl.carousel', $(this).index());
		mainMediaSlider.trigger('to.owl.carousel', $(this).index());

		$.fancybox.open({
			src  : '.js-popup-media',
			type : 'inline',
			attr: {
				scrolling: "none"
			},
			scrolling : 'visible',
			touch: false
		});
	});

	/**
	 * Оборачиваем таблицы для мобильных
	 */

	$('table').wrap('<div class="table"></div>');

	/**
	 * Расставляем элементы по столбцам в новостях
	 */

	columns = {
		columnClass: 'news-column',
		columnElements: '.news-item',
		counter: 0
	};

	if($('.js-columns').width() > 0 && $('body').width() > 767) {
		$('.js-columns').addClass('active');
		columner(columns);
	}
	$(window).resize(function(){
		if($('.js-columns').width() > 0 && $('body').width() > 767) {
			columner(columns);
		}
	});

	function columner (columns){
		if($('.js-columns > .'+columns.columnClass).length < 1) {
			$('.js-columns').append(
				'<div class="' + columns.columnClass + '" data-id="0"></div>' +
				'<div class="' + columns.columnClass + '" data-id="1"></div>'
			);
		}

		if($('.js-columns > '+columns.columnElements).length > 0) {
			$(columns.columnElements).each(function () {
				$(this).appendTo($('.js-columns div[data-id=' + Number(columns.counter) + ']'));
				columns.counter = !columns.counter;
			});
		}
	}

});