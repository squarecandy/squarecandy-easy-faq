jQuery( document ).ready( function( $ ) {
	$( '.squarecandy_accordion_content_section' ).each( function() {
		// select all the heading in .squarecandy_accordion_content_section other than h6
		$( this )
			.find( ' :header:not(h6)' )
			.each( function() {
				if ( ! $( this ).hasClass( 'squarecandy_accordion_closed' ) ) {
					// make these heading "closed"
					$( this ).addClass( 'squarecandy_accordion_closed' );
					// hide everything up until the next heading
					$( this )
						.nextUntil( ':header' )
						.css( {
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
					$( this ).click( function() {
						// check to see if it's opened. If so,...
						if ( $( this ).hasClass( 'squarecandy_accordion_opened' ) ) {
							// slide up the content beneath it and mark this heading "closed"
							$( this )
								.nextUntil( ':header' )
								.slideUp( 300 );
							$( this )
								.removeClass( 'squarecandy_accordion_opened' )
								.addClass( 'squarecandy_accordion_closed' );
						} else {
							// if it isn't opened,
							// foldup other content and mark the headings as closed
							$( this )
								.parents( '.squarecandy_accordion_content_section' )
								.eq( 0 )
								.find( '.squarecandy_accordion_opened' )
								.not( this )
								.each( function() {
									$( this )
										.nextUntil( ':header' )
										.slideUp( 300 );
									$( this )
										.removeClass( 'squarecandy_accordion_opened' )
										.addClass( 'squarecandy_accordion_closed' );
								} );
							// then roll out the content and mark the heading as opened
							$( this )
								.nextUntil( ':header' )
								.slideDown( 300 );
							$( this )
								.removeClass( 'squarecandy_accordion_closed' )
								.addClass( 'squarecandy_accordion_opened' );
						}
					} );
				}
			} );
	} );
} );
