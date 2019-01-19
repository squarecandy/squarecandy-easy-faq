jQuery(document).ready(function($) {
	$('.squarecandy_accordion_content_section').each(function() {

		$(this).find(' :header:not(h6)').each(function() { // select all the heading in .squarecandy_accordion_content_section other than h6
			if (!$(this).hasClass('squarecandy_accordion_closed')) {
				$(this).addClass('squarecandy_accordion_closed'); //make these heading "closed"
				$(this).nextUntil(':header').css({
					'display': 'none'
				}); //hide everything up until the next heading
				var textsize = $(this).css('font-size'); //get the font size in order to more accurately position the visual cue
				var halftextsize = parseInt(textsize) / 2;
				var backgroundpos = Math.round(halftextsize) - 10;
				var padding = $(this).css('padding-top'); //get the padding in order to help us position the visual cue
				var padding = parseInt(padding);
				var backgroundpos = Math.round(halftextsize) - 10 + padding;
				$(this).css({
					'background-position-y': backgroundpos
				}); //position the visual cue

				$(this).click(function() {
					//whenever one of these headings is clicked,
					if ($(this).hasClass('squarecandy_accordion_opened')) {

						//check to see if it's opened. If so,...
						$(this).nextUntil(':header').slideUp(300); //slide up the content beneath it and mark this heading "closed"
						$(this).removeClass('squarecandy_accordion_opened').addClass('squarecandy_accordion_closed');
					} else { //if it isn't opened,
						$(this).parents('.squarecandy_accordion_content_section').eq(0).find('.squarecandy_accordion_opened').not(this).each(function() { //if so...
							$(this).nextUntil(':header').slideUp(300); //foldup other content and mark the headings as closed
							$(this).removeClass('squarecandy_accordion_opened').addClass('squarecandy_accordion_closed');
						})
						$(this).nextUntil(':header').slideDown(300); //then roll out the content and mark the heading as opened
						$(this).removeClass('squarecandy_accordion_closed').addClass('squarecandy_accordion_opened');
					}

				})
			}
		});

	});
});
