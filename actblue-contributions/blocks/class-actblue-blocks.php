<?php
/**
 * The file that handles the loading of block assets.
 *
 * @link       https://secure.actblue.com/
 * @since      1.0.0
 * @author     ActBlue
 * @package    ActBlue
 * @subpackage ActBlue/blocks
 */

/**
 * The block plugin class. This will enqueue editor and front-end assets.
 */
class ActBlue_Blocks {
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
	 * Register the JavaScript for the blocks. This function should be added as a
	 * callback when using the `enqueue_block_editor_assets` hook.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_scripts() {
		// $blocks_asset = include plugin_dir_path( __FILE__ ) . 'build/'

		error_log(print_r('hello', true));

		// wp_enqueue_script(
		// 	$this->plugin_name . '-blocks',
		// 	plugins_url( '/build/blocks.js', __FILE__ ),
		// 	$blocks_asset['dependencies'],
		// 	$this->version
		// );
	}

}
