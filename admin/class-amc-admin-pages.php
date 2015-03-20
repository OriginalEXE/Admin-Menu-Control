<?php

/**
 * Display partials for plugin admin pages
 *
 * @link       https://github.com/OriginalEXE
 * @since      1.0.0
 *
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/admin
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {

	die;

}

/**
 * Display partials for plugin admin pages.
 *
 * All code related to displaying plugin admin pages.
 *
 * @since      1.0.0
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/admin
 */
class AMC_Admin_Pages {

	/**
	 * AMC_Registry instance.
	 *
	 * @since  1.0.0
	 * @access protected
	 * @var    object $amc_registry Holds instance of the AMC_Registry class.
	 */
	protected $amc_registry;

	/**
	 * Register all hooks for this class.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		$this->amc_registry = AMC_Registry::get_instance();

		// Store class instance to registry
		$this->amc_registry->set( 'class_amc_admin_pages', $this );

	}

	/**
	 * Display main plugin page.
	 *
	 * @since 1.0.0
	 */
	public function plugin_page() {

		// load partial
		require_once AMC_PLUGIN_DIR . 'admin/partials/amc-admin-plugin-page-display.php';

	}

}

new AMC_Admin_Pages();