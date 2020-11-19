<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://secure.actblue.com/
 * @since      1.0.0
 * @author     ActBlue
 * @package    ActBlue
 * @subpackage ActBlue/admin
 */

/**
 * Defines the plugin name, version, and two example hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 */
class ActBlue_Admin {
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
	 * Adds the admin menu page.
	 *
	 * @since 1.0.0
	 *
	 * @link https://developer.wordpress.org/reference/functions/add_menu_page/
	 * @link https://developer.wordpress.org/reference/functions/add_options_page/
	 *
	 * @usage
	 *
	 *   In the main ActBlue class, enqueue this method as the callback for the
	 *   `admin_menu` hook.
	 */
	public function add_settings_page() {
		/*
		 * We can add a top-level menu page with `add_menu_page`.
		*/

		// Or, we can create a subpage inside `Settings`.
		add_options_page(
			'ActBlue Settings', // Page's meta <title>.
			'ActBlue', // Menu link text.
			'manage_options', // User capability required to access the page.
			'actblue-settings', // Page slug.
			array( $this, 'render_settings_page' ), // Callback function to render page.
			100 // Priority.
		);
	}

	/**
	 * Register the settings keys.
	 *
	 * @since 1.0.0
	 *
	 * @link https://developer.wordpress.org/reference/functions/register_setting/
	 * @link https://developer.wordpress.org/reference/functions/add_settings_section/
	 * @link https://developer.wordpress.org/reference/functions/add_settings_field/
	 *
	 * @usage
	 *
	 *   In the main ActBlue class, enqueue this method as the callback for the
	 *   `admin_init` hook.
	 */
	public function register_settings() {
		// Slug of the page we're rendering these settings on.
		$slug = 'actblue-settings';

		// The ID of the section we're adding fields to.
		$section_id = 'actblue_settings_section';

		register_setting(
			'actblue_settings_group', // Settings group name.
			'actblue_settings', // Option name.
			array( // Args.
				'type'        => 'array',
				'description' => 'ActBlue settings',
				'default'     => array(
					'token' => '',
					'title' => '',
				),
			)
		);

		add_settings_section(
			$section_id, // ID of the section.
			'Settings', // Title of the section.
			'', // Optional callback to render content at the top of the section.
			$slug
		);

		add_settings_field(
			'actblue_token',
			'Token',
			array( $this, 'render_token_field' ), // Function which prints the field.
			$slug,
			$section_id
		);
	}

	/**
	 * Renders the settings page markup.
	 *
	 * @since 1.0.0
	 */
	public function render_settings_page() {
		include plugin_dir_path( __FILE__ ) . 'templates/actblue-settings-page.php';
	}

	/**
	 * Renders the token field.
	 *
	 * @since 1.0.0
	 */
	public function render_token_field() {
		$text = get_option( 'actblue_settings' );

		printf(
			'<input type="text" id="actblue_token" name="actblue_settings[token]" value="%s" />',
			esc_attr( $text['token'] )
		);
	}
}
