<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://secure.actblue.com/
 * @since      0.1.0
 * @author     ActBlue
 * @package    ActBlue
 * @subpackage ActBlue/admin
 */

/**
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 */
class ActBlue_Admin {
	/**
	 * The ID of this plugin.
	 *
	 * @since  0.1.0
	 * @access private
	 * @var    string
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since  0.1.0
	 * @access private
	 * @var    string
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since 0.1.0
	 *
	 * @param string $plugin_name The name of this plugin.
	 * @param string $version     The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the admin area. This function should be added as
	 * a callback when using the `admin_enqueue_scripts` hook.
	 *
	 * @since 0.1.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/actblue-admin.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area. This function should be added as
	 * a callback when using the `admin_enqueue_scripts` hook.
	 *
	 * @since 0.1.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/actblue-admin.js', array( 'jquery' ), $this->version, false );
	}

}
