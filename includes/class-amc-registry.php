<?php

/**
 * Plugin registry class (singleton)
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
 * Plugin registry class (singleton).
 *
 * @since      1.0.0
 * @package    AdminMenuControl
 * @subpackage AdminMenuControl/includes
 */
class AMC_Registry {

	/**
	 * AMC_Registry instance.
	 *
	 * @since  1.0.0
	 * @access protected
	 * @var    object $instance Holds the only instance of the AMC_Registry class.
	 */
	private static $instance;

	/**
	 * Registry array.
	 *
	 * @since  1.0.0
	 * @access protected
	 * @var    array $registry Holds all of the registry items in key => value format.
	 */
	private $registry = array();

	/**
	 * Get class instance.
	 *
	 * Method for accessing the only instance of this class (singleton).
	 *
	 * @since    1.0.0
	 */
	public static function get_instance() {

		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof AMC_Registry ) ) {

			self::$instance = new AMC_Registry;

		}

		return self::$instance;

	}

	/**
	 * Get item from the registry.
	 *
	 * @since    1.0.0
	 */
	public function get( $key ) {

		if ( isset( $this->registry[ $key ] ) ) {

			return $this->registry[ $key ];

		}

		return null;

	}

	/**
	 * Save item to the registry.
	 *
	 * @since    1.0.0
	 */
	public function set( $key, $value, $force = false ) {

		if ( $force || ! isset( $this->registry[ $key ] ) ) {

			$this->registry[ $key ] = $value;

			return true;

		}

		return false;

	}

}