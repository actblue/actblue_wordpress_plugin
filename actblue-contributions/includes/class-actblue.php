<?php
/**
 * The file that defines the core plugin class.
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://secure.actblue.com/
 * @since      1.0.0
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
	 * @since  1.0.0
	 * @access protected
	 * @var    ActBlue_Loader
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since  1.0.0
	 * @access protected
	 * @var    string
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since  1.0.0
	 * @access protected
	 * @var    string
	 */
	protected $version;

	/**
	 * The instance containing the admin functionality.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    ActBlue_Admin
	 */
	private $plugin_admin;

	/**
	 * The instance containing the public functionality.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    ActBlue_Public
	 */
	private $plugin_public;

	/**
	 * The instance containing the block functionality.
	 *
	 * @since  1.0.0
	 * @access private
	 * @var    ActBlue_Blocks
	 */
	private $plugin_blocks;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->version     = ACTBLUE_PLUGIN_VERSION;
		$this->plugin_name = 'actblue-contributions';

		$this->enable_oembed();
		$this->load_dependencies();
	}

	/**
	 * Adds the ActBlue oEmbed endpoint to the list of allowed oEmbed endpoints.
	 *
	 * @since  1.0.0
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
	 * Send an ActBlue user-agent for http requests to ActBlue endpoints. This
	 * should be used as the callback for the `http_headers_useragent` filter.
	 * Because of this, the method needs to be public so the filter can access it.
	 *
	 * @param string $user_agent User agent to send with the request.
	 * @param string $url        URL being requested.
	 *
	 * @return string
	 *
	 * @link   https://developer.wordpress.org/reference/hooks/http_headers_useragent/
	 * @since  1.3.0
	 * @access public
	 */
	public function send_actblue_useragent( $user_agent, $url ) {
		$provider_url       = actblue_get_url( '/cf/oembed' );
		$is_actblue_request = 0 === strpos( $url, $provider_url );

		// If the request is NOT one to the ActBlue url, just return the default user-agent.
		if ( ! $is_actblue_request ) {
			return $user_agent;
		}

		$actblue_user_agent = 'WordPress/' . get_bloginfo( 'version' ) . "; ActBlueContributions/{$this->version}; " . get_site_url();
		return $actblue_user_agent;
	}

	/**
	 * Reports the source of the embed code to the ActBlue service
	 *
	 * @param string $tag The generated tag code.
	 * @param string $handle The name of the script tag handle.
	 * @param string $src The url of the script.
	 *
	 * @return string
	 *
	 * @link   https://developer.wordpress.org/reference/hooks/script_loader_tag/
	 * @since  4.1.0
	 * @access public
	 */
	public function add_source_to_script( $tag, $handle, $src ) {
		if ( $this->plugin_name . '-vendor' === $handle ) {
			$tag = '<script src="' . esc_url( $src ) . '" data-ab-source="wordpress_plugin-' . $this->version . '"></script>'; // phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript
		}
		return $tag;
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 * - ActBlue_Admin. Defines all hooks for the admin area.
	 * - ActBlue_Public. Defines all hooks for the public side of the site.
	 * - ActBlue_Blocks. Defines all hooks for editor blocks.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since  1.0.0
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

		/**
		 * The class responsible for anything to do with blocks.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'blocks/class-actblue-blocks.php';
		$this->plugin_blocks = new ActBlue_Blocks( $this->plugin_name, $this->version );
	}

	/**
	 * Registers setup hooks. This is where we can add filters or actions that
	 * handle any setup tasks for the ActBlue plugin.
	 *
	 * @since  1.3.0
	 * @access private
	 */
	private function register_setup_hooks() {
		/**
		 * Manage the user agent sent for http requests.
		 *
		 * @link https://developer.wordpress.org/reference/functions/add_filter/
		 */
		add_filter( 'http_headers_useragent', array( $this, 'send_actblue_useragent' ), 10, 2 );

		/**
		 * Adds the data attribute to the actblue.js script tag, which informs
		 * ActBlue about the platform.
		 */
		add_filter( 'script_loader_tag', array( $this, 'add_source_to_script' ), 10, 3 );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since  1.0.0
	 * @access private
	 */
	private function register_public_hooks() {
		add_action( 'wp_enqueue_scripts', array( $this->plugin_public, 'enqueue_scripts' ) );
	}

	/**
	 * Register any block hooks.
	 *
	 * @since  1.0.0
	 * @access private
	 */
	private function register_blocks() {
		add_action( 'enqueue_block_editor_assets', array( $this->plugin_blocks, 'enqueue_admin' ) );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since 1.0.0
	 */
	public function run() {
		$this->register_setup_hooks();
		$this->register_public_hooks();
		$this->register_blocks();
	}
}
