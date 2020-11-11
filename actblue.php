<?php
/**
 * Plugin bootstrap.
 *
 * @link    https://secure.actblue.com/
 * @package ActBlue
 *
 * @wordpress-plugin
 * Plugin Name:      ActBlue
 * Plugin URI:       https://secure.actblue.com/
 * Description:      Enhance the ActBlue experience.
 * Author:           ActBlue
 * Author URI:       https://secure.actblue.com/
 * License:          GPL-2.0+
 * License URI:      http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:      actblue
 * Domain Path:      /languages
 * Version:          0.1.0
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Current plugin version.
 */
define( 'ACTBLUE_PLUGIN_VERSION', '1.0.0' );

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
 * @since 0.1.0
 */
function actblue_plugin__run() {
	$actblue_plugin = new ActBlue();
	$actblue_plugin->run();
}
actblue_plugin__run();
