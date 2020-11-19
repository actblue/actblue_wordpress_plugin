<?php
/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://secure.actblue.com/
 * @since      1.0.0
 * @author     ActBlue
 * @package    ActBlue
 * @subpackage ActBlue/public
 */

/**
 * Defines the plugin name, version, and functions for enqueuing admin-specific
 * stylesheet and JavaScript.
 */
class ActBlue_Public {
	/**
	 * The ID of this plugin.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    string
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    string
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since 1.0.0
	 *
	 * @param string $plugin_name The name of this plugin.
	 * @param string $version     The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Register the stylesheets for the public-facing site. This function should be added
	 * as a callback when using the `wp_enqueue_scripts` hook.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/actblue-public.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the public-facing site. This function should be added
	 * as a callback when using the `wp_enqueue_scripts` hook.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/actblue-public.js', array( 'jquery' ), $this->version, false );
	}

}
