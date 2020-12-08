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
	 * Register the JavaScript for the public-facing site. This function should be added
	 * as a callback when using the `wp_enqueue_scripts` hook.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_scripts() {
		$actblue_src = actblue_get_url( '/cf/assets/actblue.js' );
		wp_enqueue_script( $this->plugin_name . '-vendor', $actblue_src, array(), $this->version, false );

		// Enqueue the local plugin script.
		wp_enqueue_script(
			$this->plugin_name . '-plugin',
			ACTBLUE_PLUGIN_URI . 'build/actblue-contributions.js',
			array( $this->plugin_name . '-vendor' ),
			$this->version,
			false
		);
	}
}
