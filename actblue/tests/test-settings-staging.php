<?php
/**
 * Class SettingsTest.
 *
 * @package Actblue
 */

/**
 * Test case for the settings.
 */
class ActBlueStagingTest extends WP_UnitTestCase {
	// These are required to tell PHPUnit _not_ to preserve global state for this
	// test since we're setting ups constants.
	protected $preserveGlobalState = FALSE;
    protected $runTestInSeparateProcess = TRUE;

	/**
	 * Test the actblue_get_url() function in development mode.
	 */
	public function test_host_url_staging() {
		define( 'ACTBLUE_ENV', 'development' );
		define( 'ACTBLUE_STAGING_HOST', 'https://staging.actblue.com' );

		$url = actblue_get_url( '/cf/assets/actblue.js' );
		$expected = 'https://staging.actblue.com/cf/assets/actblue.js';

		$this->assertEquals( $expected, $url );
	}
}
