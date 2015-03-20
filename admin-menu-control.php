<?php

/**
 * Plugin Name:       Admin Menu Control
 * Description:       Take control of the admin menu.
 * Version:           1.0.0
 * Author:            OriginalEXE
 * Author URI:        https://github.com/OriginalEXE
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       admin-menu-control
 * Domain Path:       /languages
 * 
 * @since   1.0.0
 * @package AdminMenuControl
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {

	die;

}

/**
 * Define plugin constants.
 *
 * @since 1.0.0
 */
function amc_define_constants() {

	/**
	 * Plugin version.
	 *
	 * @since 1.0.0
	 * @var   string AMC_VERSION
	 */
	if ( ! defined( 'AMC_VERSION' ) ) {

		define( 'AMC_VERSION', '1.0.0' );

	}

	/**
	 * Plugin folder path.
	 *
	 * @since 1.0.0
	 * @var   string AMC_PLUGIN_DIR
	 */
	if ( ! defined( 'AMC_PLUGIN_DIR' ) ) {

		define( 'AMC_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

	}

	/**
	 * Plugin folder url.
	 *
	 * @since 1.0.0
	 * @var   string AMC_PLUGIN_URL
	 */
	if ( ! defined( 'AMC_PLUGIN_URL' ) ) {

		define( 'AMC_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

	}

	/**
	 * Plugin root file.
	 *
	 * @since 1.0.0
	 * @var   string AMC_PLUGIN_FILE
	 */
	if ( ! defined( 'AMC_PLUGIN_FILE' ) ) {

		define( 'AMC_PLUGIN_FILE', __FILE__ );

	}

}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-userswp-activator.php
 */
function amc_plugin_activated() {

	require_once AMC_PLUGIN_DIR . 'includes/class-amc-activator.php';
	AMC_Activator::activate();

}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-userswp-deactivator.php
 */
function amc_plugin_deactivated() {

	require_once AMC_PLUGIN_DIR . 'includes/class-amc-deactivator.php';
	AMC_Deactivator::deactivate();

}

register_activation_hook( __FILE__, 'amc_plugin_activated' );
register_deactivation_hook( __FILE__, 'amc_plugin_deactivated' );

/**
 * The core plugin class that is used to define internationalization,
 * dashboard-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-admin-menu-control.php';

/**
 * Begins execution of the plugin.
 *
 * @since 1.0.0
 */
function amc_run_plugin() {

	amc_define_constants();

	$plugin = new Admin_Menu_Control();

}

amc_run_plugin();