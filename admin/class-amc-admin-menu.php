<?php

/**
 * All functionality relates to WordPress admin menu
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
 * All functionality relates to WordPress admin menu.
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

		// Store class instance to registry
		$this->amc_registry->set( 'class_amc_admin_menu', $this );

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

	/**
	 * Grab and format the menu data.
	 *
	 * @since 1.0.0
	 */
	public function get_admin_menu() {

		global $menu, $submenu;

		$menu_items = array();

		foreach ( $menu as $menu_item ) {

			$menu_items[] = array(
				'title' => ( empty( $menu_item[0] ) ) ? '<hr>' : trim( preg_replace( '/<(\w+)[^>]*>.*<\/\1>/i', '', $menu_item[0] ) ),
				'url'   => $menu_item[2],
				'depth' => 0,
			);

			if ( ! empty( $submenu[ $menu_item[2] ] ) ) {

				foreach ( $submenu[ $menu_item[2] ] as $submenu_item ) {

					$menu_items[] = array(
						'title' => ( empty( $submenu_item[0] ) ) ? '<hr>' : trim( preg_replace( '/<(\w+)[^>]*>.*<\/\1>/i', '', $submenu_item[0] ) ),
						'url'   => $submenu_item[2],
						'depth' => 1,
					);

				}

			}

		}

		return $menu_items;

	}

	/**
	 * Grab a list of all registered admin pages.
	 *
	 * @since 1.0.0
	 */
	public function get_admin_pages() {

		global $menu, $submenu;

		$pages = array();
		$subpages = array();

		foreach ( $menu as $menu_item ) {

			// We don't need separators
			if ( empty( $menu_item[0] ) ) {

				continue;

			}

			$pages[] = array(
				'title' => trim( preg_replace( '/<(\w+)[^>]*>.*<\/\1>/i', '', $menu_item[0] ) ),
				'url'   => $menu_item[2],
			);

			if ( ! empty( $submenu[ $menu_item[2] ] ) ) {

				foreach ( $submenu[ $menu_item[2] ] as $submenu_item ) {

					$subpages[] = array(
						'title' => trim( preg_replace( '/<(\w+)[^>]*>.*<\/\1>/i', '', $menu_item[0] ) ) . ' : ' . trim( preg_replace( '/<(\w+)[^>]*>.*<\/\1>/i', '', $submenu_item[0] ) ),
						'url'   => $submenu_item[2],
					);

				}

			}

		}

		usort( $pages, array( $this, 'usort_alphabetical' ) );
		usort( $subpages, array( $this, 'usort_alphabetical' ) );

		return array_merge( $pages, $subpages );

	}

	/**
	 * Used in usort to sort list alphabetically.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function usort_alphabetical( $a, $b ) {

		return strcasecmp( $a['title'], $b['title'] );

	}

}

new AMC_Admin_Menu();