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

	/**
	 * Adds the admin menu page.
	 *
	 * @since 0.1.0
	 *
	 * @link https://developer.wordpress.org/reference/functions/add_menu_page/
	 * @link https://developer.wordpress.org/reference/functions/add_options_page/
	 */
	public function add_settings_page() {
		/*
		 * We can add a top-level menu page with `add_menu_page`.

		add_menu_page(
			'ActBlue Settings', // Page's meta <title>.
			'ActBlue', // Menu link text.
			'manage_options', // User capability required to access the page.
			'actblue-settings', // Page slug.
			array( $this, 'render_settings_page' ), // Callback function to render page.
			'dashicons-schedule', // Icon for the menu item.
			100 // Priority.
		);
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
	 * @since 0.1.0
	 *
	 * @link https://developer.wordpress.org/reference/functions/register_setting/
	 * @link https://developer.wordpress.org/reference/functions/add_settings_section/
	 * @link https://developer.wordpress.org/reference/functions/add_settings_field/
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

		add_settings_field(
			'actblue_title',
			'Title',
			array( $this, 'render_title_field' ), // Function which prints the field.
			$slug,
			$section_id
		);
	}

	/**
	 * Renders the settings page markup.
	 *
	 * @since 0.1.0
	 */
	public function render_settings_page() {
		include plugin_dir_path( __FILE__ ) . 'templates/actblue-settings-page.php';
	}

	/**
	 * Renders the token field.
	 *
	 * @since 0.1.0
	 */
	public function render_token_field() {
		$text = get_option( 'actblue_settings' );

		printf(
			'<input type="text" id="actblue_token" name="actblue_settings[token]" value="%s" />',
			esc_attr( $text['token'] )
		);
	}

	/**
	 * Renders the title field.
	 *
	 * @since 0.1.0
	 */
	public function render_title_field() {
		$text = get_option( 'actblue_settings' );

		printf(
			'<input type="text" id="actblue_title" name="actblue_settings[title]" value="%s" />',
			esc_attr( $text['title'] )
		);
	}

}
