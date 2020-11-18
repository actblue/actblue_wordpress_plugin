<?php
/**
 * The file that defines the core plugin class.
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://secure.actblue.com/
 * @since      0.1.0
 * @author     ActBlue
 * @package    ActBlue
 * @subpackage ActBlue/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 */
class ActBlue {
	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since  0.1.0
	 * @access protected
	 * @var    ActBlue_Loader
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since  0.1.0
	 * @access protected
	 * @var    string
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since  0.1.0
	 * @access protected
	 * @var    string
	 */
	protected $version;

	/**
	 * The instance containing the admin functionality.
	 *
	 * @since  0.1.0
	 * @access private
	 * @var    ActBlue_Admin
	 */
	private $plugin_admin;

	/**
	 * The instance containing the public functionality.
	 *
	 * @since  0.1.0
	 * @access private
	 * @var    ActBlue_Public
	 */
	private $plugin_public;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since 0.1.0
	 */
	public function __construct() {
		$this->version     = ACTBLUE_PLUGIN_VERSION;
		$this->plugin_name = 'actblue';

		$this->enable_oembed();
		$this->load_dependencies();
	}

	/**
	 * Adds the ActBlue oEmbed endpoint to the list of allowed oEmbed endpoints.
	 *
	 * @since  0.1.0
	 * @access private
	 *
	 * @link https://developer.wordpress.org/reference/functions/wp_oembed_add_provider/
	 */
	private function enable_oembed() {
		$provider_url = actblue_get_url( '/cf/oembed' );

		// This first parameter indicates the string that WordPress looks for to
		// initiate the call to the oEmbed provider. For that reason, we'll leave
		// that pattern consistent.
		wp_oembed_add_provider( 'https://secure.actblue.com/*', $provider_url );
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 * - ActBlue_Loader. Orchestrates the hooks of the plugin.
	 * - ActBlue_Admin. Defines all hooks for the admin area.
	 * - ActBlue_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since  0.1.0
	 * @access private
	 */
	private function load_dependencies() {
		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-actblue-admin.php';
		$this->plugin_admin = new ActBlue_Admin( $this->plugin_name, $this->version );

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-actblue-public.php';
		$this->plugin_public = new ActBlue_Public( $this->plugin_name, $this->version );
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since  0.1.0
	 * @access private
	 */
	private function register_admin_hooks() {
		add_action( 'admin_enqueue_scripts', array( $this->plugin_admin, 'enqueue_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this->plugin_admin, 'enqueue_scripts' ) );
		add_action( 'admin_menu', array( $this->plugin_admin, 'add_settings_page' ) );
		add_action( 'admin_init', array( $this->plugin_admin, 'register_settings' ) );

		add_filter(
			'wp_kses_allowed_html',
			function( $allowed_tags ) {
				$allowed_tags['div'] = array(
					'name' => true,
					'id' => true,
					'class' => true,
					'style' => true,
					'sandbox' => true,
				);

				$allowed_tags['iframe'] = array(
					'name' => true,
					'id' => true,
					'class' => true,
					'style' => true,
					'sandbox' => true,
				);

				return $allowed_tags;
			}
		);
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since  0.1.0
	 * @access private
	 */
	private function register_public_hooks() {
		add_action( 'wp_enqueue_scripts', array( $this->plugin_public, 'enqueue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this->plugin_public, 'enqueue_scripts' ) );

		add_filter(
			'body_class',
			function( $classes ) {
				$classes[] = 'actblue-active';
				return $classes;
			}
		);
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since 1.0.0
	 */
	public function run() {
		$this->register_admin_hooks();
		$this->register_public_hooks();
	}
}
