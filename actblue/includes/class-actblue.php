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

		$this->load_dependencies();
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
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since  0.1.0
	 * @access private
	 */
	private function register_public_hooks() {
		add_action( 'wp_enqueue_scripts', array( $this->plugin_public, 'enqueue_scripts' ) );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since 1.0.0
	 */
	public function run() {
		$this->register_public_hooks();
	}
}
