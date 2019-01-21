<?php
/*
Plugin Name: Square Candy Easy FAQ Accordions
Description: Fork of the Easy FAQ with Expanding Text plugin for use with Theory One Design and Square Candy themes.
Version: 4.0.0
Author: bgentry, squarecandy
Author URI: http://bryangentry.us
Plugin URI: https://bitbucket.org/squarecandy/squarecandy-easy-faq
Bitbucket Plugin URI: https://bitbucket.org/squarecandy/squarecandy-easy-faq

Thanks to the original plugin author http://bryangentry.us
*/


// check if the page has accordions and needs to load the scripts and styles
add_action('wp', 'determine_is_faq');
function determine_is_faq()
{
	global $wp_query;
	$loadfaq = 0; // set this at 0 to make sure it wasn't just hanging out with a value of 1 before
	//now let's go through each post in the query and see whether it needs the animations
	foreach ($wp_query->posts as $eachpost) {
		$id = $eachpost->ID;
		$faq_checkbox=get_post_meta($id, 'make_faq_page', true); //see whether the "make faq" check box was checked on this post
		$faq_shortcode_checkbox=get_post_meta($id, 'make_faq_shortcode', true);
		if ( $faq_shortcode_checkbox == 'yes') { // if this post needs the faq animations,
			$loadfaq = 1;
		}
	}
	if ($loadfaq == 1) {
		//if the current post, page, or one of the posts returned by the current query needs the animations....
		wp_enqueue_script('faqmaker', plugins_url('faqmaker.js', __FILE__), array('jquery'));
		wp_enqueue_style('faqstyle', plugins_url('faqstyle.css', __FILE__));
		add_filter('the_content', 'faq_filter', 1);
	}
}

// filter to add accordions to the entire page
// add the .squarecandy_accordion_content_section div around the countent
function faq_filter($content) {
	//first, we need to check again whether the current page needs the animation, so that the animation is not given unnecessarily to posts on an archive / index page
	global $post;

	$faq_checkbox=get_post_meta($post->ID, 'make_faq_page', true);
	$faq_shortcode_checkbox=get_post_meta($post->ID, 'make_faq_shortcode', true);

	if ( $faq_checkbox=='yes' && $faq_shortcode_checkbox!=='yes') {
		//this code adds a script to call our javascript function with arguments set on the admin page
		$content = '<div class="squarecandy_accordion_content_section">'.$content;
		$content.='</div>';
	}
	return $content;
}

// Options Meta Box on the wp-admin edit page screen

add_action('do_meta_boxes', 'add_faq_check_boxes');

function add_faq_check_boxes()
{
	// this is set to only load on Pages - @TODO make an options screen to allow enabling on different types of posts.
	add_meta_box('faqcheck', 'Use Accordions on this Page', 'make_faq_check_box', 'page', 'side', 'low', 1);
}

function make_faq_check_box($post)
{
	wp_nonce_field('faq_nonce_action', 'faq_nonce_name');
	$faq_checked = get_post_meta($post->ID, 'make_faq_page', true);
	$checked = ($faq_checked=='yes') ? 'checked="checked"' : '';
	$faq_shortcode_checked = get_post_meta($post->ID, 'make_faq_shortcode', true);
	$checked_shortcode = ($faq_shortcode_checked=='yes') ? 'checked="checked"' : '';
	?>
	<p>
		<input id="make_faq_page" name="make_faq_page" type="checkbox" value="yes" <?php echo $checked; ?>>
		<label for="make_faq_page"><strong>Full Page Accordion</strong></label><br>
		Check this box if you want to apply the accordion drop-down effect to the entire page.
	</p>
	<p>
		<input id="make_faq_shortcode" name="make_faq_shortcode" type="checkbox" value="yes" <?php echo $checked_shortcode; ?>>
		<label form="make_faq_shortcode"><strong>Shortcode Accordions</strong></label><br>
		Check this box to apply the drop-down effect only to sections on the page wrapped in the shortcodes
			<code>[accordion_start]</code> and <code>[accordion_end]</code>.
	</p>
	<?php  // @TODO - add click to copy for the shortcodes, or click to insert into body
}

// Save the Checkbox Options

add_action('save_post', 'save_faq_check_box');

function save_faq_check_box($post_id)
{
	// lots of various situations to bail out early:

	$screen = get_current_screen();
	if (
		defined('DOING_AUTOSAVE') && DOING_AUTOSAVE || // this is an autosave and not a regular save button press
		$screen->action != '' || // check if this is the "add new" screen, or other actions which you don't want to process as a submission
		$screen->base != 'post' || // check that we are in the basic post edit screen
		$screen->post_type != 'page'  // check that the type of post we are editing is PAGE
	) {
		return;
	}

	// verify this came from the our screen and with proper authorization,
	// because save_post can be triggered at other times
	if (!wp_verify_nonce($_POST['faq_nonce_name'], 'faq_nonce_action')) {
		return;
	}

	// Check permissions
	if ('page' == $_POST['post_type']) {
		if (!current_user_can('edit_page', $post_id)) {
			return;
		}
	} else {
		if (!current_user_can('edit_post', $post_id)) {
			return;
		}
	}

	// OK, we're authenticated: we need to find and save the data
	$faq = (isset($_POST['make_faq_page'])) ? $_POST['make_faq_page'] : "";
	update_post_meta($post_id, 'make_faq_page', $faq);

	$faq_shortcode = (isset($_POST['make_faq_shortcode'])) ? $_POST['make_faq_shortcode'] : "";
	update_post_meta($post_id, 'make_faq_shortcode', $faq_shortcode);
}

add_shortcode('accordion_start', 'squarecandy_accordion_shortcode_start');
add_shortcode('accordion_end', 'squarecandy_accordion_shortcode_end');

function squarecandy_accordion_shortcode_start()
{
	return '<div class="squarecandy_accordion_content_section">';
}

function squarecandy_accordion_shortcode_end()
{
	return '</div>';
}