# Square Candy Plugin Starter

Easily create a Frequently Asked Questions page with answers that slide down when the questions are clicked. Shortcode is available, not required.

Fork of the Easy FAQ with Expanding Text plugin for use with Theory One Design and Square Candy themes.

Thanks to the original plugin author [Bryan Gentry](http://bryangentry.us).

Thanks to [Theory One Design](https://www.theoryonedesign.com/) for sponsoring and inspiring this fork's development

## End Users

* To make every heading (h2, h3, etc.) on a page into an accordion bar, check the "Full Page Accordion" box on the edit screen of the page.
* To make just one part of the page into an accordion, place `[accordion_start]` before your accordion content and `[accordion_end]` at the end of the section. All headings between these two shortcodes will become the clickable bar area, and all other content between the headers will become the expanding content.

## Developers

### Status

#### develop
![](https://github.com/squarecandy/squarecandy-easy-faq/workflows/WordPress%20Standards/badge.svg?branch=develop&event=push)

#### master
![](https://github.com/squarecandy/squarecandy-easy-faq/workflows/WordPress%20Standards/badge.svg)

### Filters

The plugin works on pages only by default. You can expand it to additional posts types by filtering the post types array on `squarecandy_filter_accordion_post_types` like this:

```php
add_filter( 'squarecandy_filter_accordion_post_types', 'mycustom_accordion_post_types');
function mycustom_accordion_post_types( $faq_post_types ) {
	$additional_post_types = array( 'custom-post-type', 'post', 'another-custom-post-type-slug' );
	return $faq_post_types + $additional_post_types;
}
```

### Getting Started

* run `npm install` in the plugin directory
* run `grunt` to listen for changes to your scss files and to compile them immediately as you work
* All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.
* always run `grunt preflight` to make sure all linting passes before you commit.

### [Developer Guide](https://developers.squarecandy.net)

For more detailed information about coding standards, development philosophy, how to run linting, how to release a new version, and more, visit the [Square Candy Developer Guide](https://developers.squarecandy.net).
