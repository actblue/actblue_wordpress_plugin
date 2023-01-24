<?php
/**
 * Plugin bootstrap.
 *
 * @link    https://secure.actblue.com/
 * @package ActBlue
 *
 * @wordpress-plugin
 * Plugin Name:      ActBlue Contributions
 * Description:      Easily embed your ActBlue contribution forms on any WordPress page. Designed and built by Upstatement.
 * Author:           <a href="https://secure.actblue.com/">ActBlue</a>, <a href="https://upstatement.com">Upstatement</a>
 * Author URI:       https://secure.actblue.com/
 * License:          GPL-2.0+
 * License URI:      http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:      actblue
 * Domain Path:      /languages
 * Version:          1.5.3
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Current plugin version.
 */
define( 'ACTBLUE_PLUGIN_VERSION', '1.5.3' );

/**
 * Defines the ActBlue host.
 */
define( 'ACTBLUE_HOST', 'https://secure.actblue.com' );

/**
 * Defines the directory for this plugin.
 */
define( 'ACTBLUE_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Defines the uri for this plugin.
 */
define( 'ACTBLUE_PLUGIN_URI', trailingslashit( plugins_url( '', __FILE__ ) ) );

/**
 * Utility function for returning the correct ActBlue endpoint url based on the
 * environment context.
 *
 * @param string $route The route at the ActBlue host to hit. This parameter should
 *                      include a leading slash.
 *
 * @return string The fully qualified url to make a request to ActBlue.
 */
function actblue_get_url( $route ) {
	if ( defined( 'ACTBLUE_ENV' ) && 'development' === ACTBLUE_ENV && defined( 'ACTBLUE_STAGING_HOST' ) ) {
		return ACTBLUE_STAGING_HOST . $route;
	}

	return ACTBLUE_HOST . $route;
}

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-actblue.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page lifecycle.
 *
 * @return void
 *
 * @since 1.0.0
 */
function actblue_plugin__run() {
	$actblue_plugin = new ActBlue();
	$actblue_plugin->run();
}
actblue_plugin__run();
