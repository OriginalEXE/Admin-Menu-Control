<?php

/**
 * Register menu item in WordPress admin
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
 * Register menu item in WordPress admin.
 *
 * All code related to registering menu items in WordPress admin menu.
 *
 * @since      1.0.0
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/admin
 */
class AMC_Admin_Menu {

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

		add_action( 'admin_menu', array( $this, 'register_plugin_page' ) );

	}

	/**
	 * Register the main admin menu item for plugin configuration and control.
	 *
	 * @since 1.0.0
	 */
	public function register_plugin_page() {

		$class_amc_admin_pages = $this->amc_registry->get( 'class_amc_admin_pages' );

		// Change the submenu item to 'Dashboard'
		add_submenu_page(
			'options-general.php',
			__( 'Admin Menu Control', 'admin-menu-control' ),
			__( 'Admin Menu Control', 'shoutforms' ),
			'manage_options',
			'admin-menu-control',
			array( $class_amc_admin_pages, 'plugin_page' )
		);

	}

}

new AMC_Admin_Menu();