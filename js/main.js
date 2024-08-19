jQuery( document ).ready( function ( $ ) {
	$( '.squarecandy_accordion_content_section' ).each( function () {
		// select all the heading in .squarecandy_accordion_content_section other than h6
		const $headers = $( this ).find( ' :header:not(h6)' );

		// make the headings focusable
		$headers.attr( 'tabindex', 0 );
		// make the headings keyboard accessible
		$headers.attr( 'role', 'button' );
		// make the headings aria-expandable
		$headers.attr( 'aria-expanded', false );

		// make the headings clickable with the keyboard
		$headers.on('keydown', function(event) { if (event.which === 13 || event.which === 32) { jQuery(this).click() } });

		$headers.each( function () {
			if ( ! $( this ).hasClass( 'squarecandy_accordion_closed' ) ) {
				// make these heading "closed"
				$( this ).addClass( 'squarecandy_accordion_closed' );
				// hide everything up until the next heading
				$( this ).nextUntil( ':header' ).css( {
					display: 'none',
				} );
				// get the font size in order to more accurately position the visual cue
				const textsize = $( this ).css( 'font-size' );
				const halftextsize = parseInt( textsize ) / 2;
				// get the padding in order to help us position the visual cue
				const padding = parseInt( $( this ).css( 'padding-top' ) );
				const backgroundpos = Math.round( halftextsize ) - 10 + padding;
				// position the visual cue
				$( this ).css( {
					'background-position-y': backgroundpos,
				} );

				// whenever one of these headings is clicked...
				$( this ).click( function () {
					// check to see if it's opened. If so,...
					if ( $( this ).hasClass( 'squarecandy_accordion_opened' ) ) {
						// slide up the content beneath it and mark this heading "closed"
						$( this ).nextUntil( ':header' ).slideUp( 300 );
						$( this ).removeClass( 'squarecandy_accordion_opened' ).addClass( 'squarecandy_accordion_closed' );
						$( this ).attr( 'aria-expanded', false );
					} else {
						// if it isn't opened
						// then roll out the content and mark the heading as opened
						$( this ).nextUntil( ':header' ).slideDown( 300 );
						$( this ).removeClass( 'squarecandy_accordion_closed' ).addClass( 'squarecandy_accordion_opened' );
						$( this ).attr( 'aria-expanded', true );
					}
				} );
			}
		} );
	} );
} );
