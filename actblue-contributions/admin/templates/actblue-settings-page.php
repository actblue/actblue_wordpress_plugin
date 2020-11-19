<?php
/**
 * The view for the settings page in the admin.
 *
 * @link       https://secure.actblue.com/
 * @since      1.0.0
 * @author     ActBlue
 * @package    ActBlue
 * @subpackage ActBlue/admin
 */

?>

<div class="wrap">
	<h1>ActBlue</h1>

	<form method="post" action="options.php">
		<?php settings_fields( 'actblue_settings_group' ); ?>
		<?php do_settings_sections( 'actblue-settings' ); ?>
		<?php submit_button(); ?>
	</form>
</div>
