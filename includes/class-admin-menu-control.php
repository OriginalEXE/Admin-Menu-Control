<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the dashboard.
 *
 * @link       https://github.com/OriginalEXE
 * @since      1.0.0
 *
 * @package    UsersWP
 * @subpackage UsersWP/includes
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {

	die;

}

/**
 * The core plugin class.
 *
 * Used to define internationalization, dashboard-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    UsersWP
 * @subpackage UsersWP/includes
 */
class Admin_Menu_Control {

	/**
	 * AMC_Registry instance.
	 *
	 * @since  1.0.0
	 * @access protected
	 * @var    object $amc_registry Holds instance of the AMC_Registry class.
	 */
	protected $amc_registry;

	/**
	 * Defines the core functionality of the plugin.
	 *
	 * Load the dependencies and set the hooks for the Dashboard and
	 * the public-facing side of the site.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {

		$this->load_registry();

		$this->amc_registry = AMC_Registry::get_instance();

		$this->load_dependencies();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the plugin registry.
	 *
	 *
	 * @since  1.0.0
	 * @access private
	 */
	private function load_registry() {

		/**
		 * Registry singleton.
		 */
		require_once AMC_PLUGIN_DIR . 'includes/class-amc-registry.php';

	}

	/**
	 * Load the required dependencies for the plugin functionality.
	 *
	 *
	 * @since  1.0.0
	 * @access private
	 */
	private function load_dependencies() {

		if ( is_admin() ) {

			// Load only files needed in admin view

			if ( ! defined( 'DOING_AJAX' ) || ! DOING_AJAX ) {

				// Only files needed in actual admin view and not during ajax requests
				require_once AMC_PLUGIN_DIR . 'admin/class-amc-admin-pages.php';
				require_once AMC_PLUGIN_DIR . 'admin/class-amc-admin-menu.php';
				require_once AMC_PLUGIN_DIR . 'admin/class-amc-admin-assets.php';

			} else {

				require_once AMC_PLUGIN_DIR . 'admin/class-amc-admin-ajax.php';

			}

		}

	}

	/**
	 * Register all of the hooks related to the dashboard functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {



	}

}
