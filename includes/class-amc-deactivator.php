<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://github.com/OriginalEXE
 * @since      1.0.0
 *
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * All code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/includes
 */
class AMC_Deactivator {

	/**
	 * Main class method.
	 *
	 * De-register post types, flush rewrite rules.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {

		flush_rewrite_rules();

	}

}
