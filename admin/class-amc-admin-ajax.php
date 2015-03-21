<?php

/**
 * All the actions needed during admin AJAX requests
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
 * All the actions needed during admin AJAX requests
 *
 * @since      1.0.0
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/admin
 */
class AMC_Admin_Ajax {

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
	 * @since 1.0.0
	 */
	public function __construct() {

		$this->amc_registry = AMC_Registry::get_instance();

		// Store class instance to registry
		$this->amc_registry->set( 'class_amc_admin_ajax', $this );

	}

}

new AMC_Admin_Ajax();