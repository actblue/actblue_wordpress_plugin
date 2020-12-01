<?php
/**
 * The file that defines a proxy for cross origin requests.
 *
 * @link       https://secure.actblue.com/
 * @since      2.0.0
 * @author     ActBlue
 * @package    ActBlue
 * @subpackage ActBlue/includes
 */

/**
 * A proxy class. This is used to perform a cross-origin request to the ActBlue API.
 */
class ActBlue_Proxy {
	/**
	 * The ID of this plugin.
	 *
	 * @since  2.0.0
	 * @access private
	 * @var    string
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since  2.0.0
	 * @access private
	 * @var    string
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since 2.0.0
	 *
	 * @param string $plugin_name The name of this plugin.
	 * @param string $version     The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {
		$this->plugin_name = $plugin_name;
		$this->version     = $version;
	}

	/**
	 * Proxy the ActBlue API.
	 */
	public function fetch() {
		if ( ! isset( $_REQUEST['url'] ) ) {
			return wp_send_json_error( 'No url provided' );
		}

		$url      = esc_url_raw( wp_unslash( $_REQUEST['url'] ) );
		$response = wp_remote_get( $url );

		if ( is_wp_error( $response ) ) {
			return wp_send_json_error( $response->get_error_message() );
		}

		$code = wp_remote_retrieve_response_code( $response );

		if ( 200 !== $code ) {
			return wp_send_json_error( wp_remote_retrieve_response_message( $response ) );
		}

		$body = json_decode( wp_remote_retrieve_body( $response ) );

		return wp_send_json_success( $body );
	}
}
