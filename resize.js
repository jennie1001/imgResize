/*
resizeImg 2013-05-30
jQuery plugin to resize images to fill out a container.
Copyright (c) 2013 Jennie Andersson jennie.andersson@eniro.com

ex:
  $('.resize').resizeImg({fluid:true});

	// OPTIONS:
			backgroundFill		: true 		//Fills out container. False: Image keeps its aspect ratio
			verticalPosition	: '50%'		// 'center' //	'top'	//	'bottom' // '50%'  // '10%'
			horizontalPosition	: '50%'		// 'center' //	'left'	//	'right' // '50%'  // '10%'
			width				: ''		// Only for use with fluid: false
			height				: ''		// Only for use with fluid: false
			fluid				: false 	// Images scales proportionally
			columns				: '4'		// Only for use with fluid: true
			showErrors			: false
*/

/*jslint browser: true*/
/*global $, jQuery, showError, setBkgImg, console*/

(function ($) {
	"use strict";
	$.fn.resizeImg = function(options) {

		var settings = $.extend({
			backgroundFill		: true,
			verticalPosition	: '50%',
			horizontalPosition	: '50%',
			width				: '',
			height				: '',
			fluid				: false,
			columns				: '4',
			showErrors			: false
		}, options );

		return this.each(function() {

			var $imgContainer	= $(this),
				$img			= $imgContainer.find('img'),
				imgSrc			= $img.attr('src'),
				cssClass		= 'resize-img',
				errorMsg		= '',
				error			= false;

			if ($img.length === 0) {
				errorMsg = $imgContainer.attr('class') + ' has no img-tag';
				error = true;
			} else if ($img.attr('src').length === 0) {
				errorMsg = 'The image is missing src';
				error = true;
			}

			if (error) {
				if (settings.showErrors) {
					showError();
				} else {
					return false;
				}
			} else {
				setBkgImg();
			}

			function setBkgImg () {
				var setBasicCss = function ($el) {
					$el.css({
						backgroundImage: 'url(' + encodeURI(imgSrc) + ')',
						backgroundSize: (settings.backgroundFill) ? 'cover' : 'contain',
						backgroundPosition: (settings.horizontalPosition) + ' ' + (settings.verticalPosition)
					});
				};

				if (settings.fluid) {
					var $el		= $('<span>'),
						width	= 100/parseInt((settings.columns), 10);

					cssClass = cssClass + ' resize-img-fluid';

					$imgContainer.addClass('resize-img-fluid-outer');
					$el.addClass(cssClass);

					setBasicCss($el);

					$img.wrap($el);

					$imgContainer.css({
						width: width + '%'
					});

				} else {
					$imgContainer.addClass(cssClass);

					setBasicCss($imgContainer);

					$imgContainer.css({
						width: parseInt((settings.width), 10),
						height: parseInt((settings.height), 10)
					});
				}

			}

			function showError () {
				console.error(errorMsg);
				$imgContainer.addClass('resize-img-error');
			}

		});
	};

}( jQuery ));
