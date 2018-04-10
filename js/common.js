$(document).ready(function(){

	(function setFootPadding() {
		$('.wrapper, .wrapper__full-height').css('padding-bottom', $('.footer').innerHeight());
		$(window).on('winResized', setFootPadding);
	})();

	$('#slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.scroll-pane').jScrollPane();

	flexImg();
	coverImg();

	$(window).on('winResized', function() {
		flexImg();
		coverImg();
	});

	//headerFix
	$(window).scroll(function () {
		if (!$('body').hasClass('is-popup-opened')) {
			var winScrTop = $(window).scrollTop();
			if (winScrTop > 21) {
				$('.header').addClass('header_fixed');
			} else {
				$('.header').removeClass('header_fixed');
			}
		}
	});

	//fixed block
	$('.fix-block').each(function() {
		var _$ = $(this),
		ofsT = _$.offset().top,
		ofsL = _$.offset().left,
		wd = _$.width();
		_$.css({width: wd, top: ofsT, left: ofsL}).addClass('fix-block_fixed');
	});

	//forms
	ValidateForm.submit('#form1', function(form, callback) {
		var $f = $(form);
		Popup.message('#message-popup', 'Форма отправлена', function() {
			callback(true, true);
		});
		/*$.ajax({
			url: $f.attr('action'),
			type:"POST",
			dataType:"json",
			data: $f.serialize(), //new FormData(form),
			success: function(response){
				if (response.status == 'sent') {
					Popup.message('#message-popup', 'Форма отправлена', function() {
						callback(true, true);
					});
				}
			},
			error: function() {
				alert('Error');
			}
		});*/
		
	});

	ValidateForm.submit('#form2', function(form, callback) {
		var $f = $(form);
		Popup.message('#message-popup', 'Форма отправлена', function() {
			callback(true, true);
		});
	});

	ValidateForm.submit('#form3');

	$(window).on('winResized', function() {
		console.log('window resized: '+ winW +'x'+ winH);
	});

});

