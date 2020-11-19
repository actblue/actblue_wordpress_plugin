<?php
/**
 * Class SettingsTest.
 *
 * @package Actblue
 */

/**
 * Test case for the settings.
 */
class ActBlueTest extends WP_UnitTestCase {

	/**
	 * Test the actblue_get_url() function.
	 */
	public function test_host_url() {
		$url = actblue_get_url( '/cf/assets/actblue.js' );
		$expected = 'https://secure.actblue.com/cf/assets/actblue.js';

		$this->assertEquals( $expected, $url );
	}
}
