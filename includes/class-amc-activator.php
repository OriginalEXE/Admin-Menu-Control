<?php

/**
 * Fired during plugin activation
 *
 * @link       https://github.com/OriginalEXE
 * @since      1.0.0
 *
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/includes
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {

	die;

}

/**
 * Fired during plugin activation.
 *
 * All code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/includes
 */
class AMC_Activator {

	/**
	 * Main class method.
	 *
	 * Register post types, flush rewrite rules.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {

		flush_rewrite_rules();

	}

}
