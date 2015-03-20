<?php

/**
 * Enqueue assets needed in WordPress admin
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
 * Enqueue assets needed in WordPress admin.
 *
 * @since      1.0.0
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/admin
 */
class AMC_Admin_Assets {

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
		$this->amc_registry->set( 'class_amc_admin_assets', $this );

		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );

	}

	/**
	 * Enqueue all assets only when they are actually needed.
	 */
	public function enqueue_assets( $hook ) {

		if ( 'settings_page_admin-menu-control' !== $hook ) {

			// We are not on our admin page, bail out
			return;

		}

		wp_enqueue_style( 'amc-admin-plugin-page', AMC_PLUGIN_URL . 'admin/css/admin-plugin-page.css', array(), AMC_VERSION );

	}

}

new AMC_Admin_Assets();