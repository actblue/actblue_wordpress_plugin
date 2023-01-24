=== ActBlue Contributions ===
Contributors: actblue,upstatement
Donate link: https://secure.actblue.com/
Tags: donate,donation,fundraising,giving,charity,nonprofit,contribute,contributions
Requires at least: 4.5
Tested up to: 6.0
Requires PHP: 5.6
Stable tag: 1.5.3
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Easily embed your ActBlue contribution forms on any WordPress page. Designed and built by Upstatement.

== Description ==

This plugin makes it possible to display your ActBlue Embed forms on your WordPress site by dropping a contribution form link in any WordPress editor.

= Features =
- Adds an ActBlue Form editor block, which can accept contributions from your own site.
- Adds an ActBlue Buttons editor block, which creates a button that will open a form in a modal.
- Registers a custom [oEmbed](https://wordpress.org/support/article/embeds/) provider for ActBlue embed forms
- Adds the `actblue.js` script tag to all of your pages to power analytics and conversion features

This plugin was designed and built in collaboration with <a href="https://upstatement.com/">Upstatement</a>.

= About ActBlue =

[ActBlue](https://secure.actblue.com/) is a nonprofit organization dedicated to empowering small-dollar donors. Its online fundraising platform makes it easy for grassroots supporters to make their voices heard and helps thousands of Democratic campaigns, progressive organizations, and nonprofits build people-powered movements.

== Security ==

WordPress’s [mission](https://wordpress.org/about/) to democratize publishing and embrace of [open source](https://opensource.org/osd-annotated) has led it to be adopted by individuals and organizations of all shapes and sizes. The downside of [this ubiquity](https://w3techs.com/technologies/details/cm-wordpress), when paired with the ease of its [famous five-minute install](https://wordpress.org/support/article/how-to-install-wordpress/), is that it’s a frequent target of attacks and malware.

Additionally, use of the ActBlue Contributions plugin increases your responsibilities as a WordPress site operator/administrator. Your site will act as a conduit through which contributions flow. It is possible that a malicious WordPress plugin may hijack and redirect those contributions or contributor personal information to a malicious site other than ActBlue, so you must exercise increased care when configuring and operating your site.

Here are a few tips to minimize the risks associated with using the ActBlue Contributions plugin with WordPress:

= Keep it secure =

- If you’re not using a fully managed service like wordpress.com, make sure you’re using a trusted WordPress [hosting provider](https://wordpress.org/hosting/) with a proven track record of security. Look for hosts that have a dedicated support team, provide SSL, manage WordPress updates, and proactively scan for vulnerabilities, misconfigurations, and attacks.
- Use [HTTPS](https://wordpress.org/support/article/https-for-wordpress/) URLs for your entire site, especially WordPress core files (starting with `wp-`). **ActBlue embeds won’t work on non-HTTPS URLs**.
- Protect access to the WordPress Dashboard by using [strong passwords](https://krebsonsecurity.com/password-dos-and-donts/) and [Two-Factor Authentication](https://wordpress.org/plugins/two-factor/) (2FA)
- Limit the number of admin users by [using user roles](https://www.wpbeginner.com/beginners-guide/wordpress-user-roles-and-permissions/)
- [Limit login attempts](https://wordpress.org/plugins/limit-login-attempts-reloaded/) to prevent account credential brute force attacks
- [Disable file editing](https://wordpress.org/support/article/hardening-wordpress/#disable-file-editing) from within the WordPress Dashboard
- Keep a WordPress [activity log](https://wordpress.org/plugins/wp-security-audit-log/) and web request logs and review them regularly for unexpected events. These may be an indication that an admin is behaving maliciously, or that an attacker has gained access to an admin account.
- Be wary of email messages requesting that you log into your WordPress account (i.e. [phishing attacks](https://securityintelligence.com/news/new-wordpress-phishing-campaigns-target-user-credentials/)) and/or upload plugins manually
- Protect against denial-of-service and other attacks by putting up a Web Application Firewall (WAF) such as [Cloudflare](https://www.cloudflare.com/waf/) in front of your site.
- Set up routine audits of your site codebase using a malware scanning plugin such as [WordFence](https://wordpress.org/plugins/wordfence/), [iThemes Security](https://wordpress.org/plugins/better-wp-security/), or [Sucuri Security](https://wordpress.org/plugins/sucuri-scanner/).
- Continuously back up up your site through your hosting provider or a plugin like [VaultPress](https://wordpress.org/plugins/vaultpress/) or [UpdraftPlus](https://wordpress.org/plugins/updraftplus/).

= Be careful when installing third-party themes or plugins =

- Only install plugins from trusted sources like the official WordPress.org plugin repository.
- Do your due diligence — does it work with the latest version of WordPress? Has it been updated in the last two years? How many people are using it and are they happy with it? All of these questions are easily answered by reviewing the WP.org plugin listing and support forum.
- Minimize the number of installed plugins on your site.

= Keep it up-to-date =

- Enable [automatic updates](https://wordpress.org/support/article/updating-wordpress/#automatic-background-updates) for WordPress core and third-party plugins or themes.
- Make sure custom theme or plugin components are tested against new WordPress releases.
- Make sure your server OS and system packages like PHP and MySQL are up-to-date. A good managed hosting provider like [Kinsta](https://kinsta.com/) and [SiteGround](https://www.siteground.com/) will handle all of this for you.

= Learn More =

- https://wordpress.org/support/article/hardening-wordpress/
- https://kinsta.com/blog/wordpress-security/
- https://sucuri.net/guides/wordpress-security/
- https://www.wpbeginner.com/wordpress-security/
- https://www.wpwhitesecurity.com/guide-choose-right-plugin-wordpress/

== Installation ==

1. Upload the `actblue` directory to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.

== Frequently Asked Questions ==

= How do I create an embeddable contribution form? =

Embeddable contribution forms are currently available to admins of 501(c)(3) and 501(c)(4) nonprofit organizations.

If you're not already registered with ActBlue, head over to the [ActBlue site to get started](https://secure.actblue.com/pending_entities/new). Instructions for setting up your embeddable contribution form can be found on the [support site](https://support.actblue.com/campaigns/working-with-contribution-forms/embeddable-forms-buttons-for-nonprofits/).

= How do I customize the behavior of my contribution form? =

You can customize the behavior of your form through the ActBlue platform.

You can learn more about available customization options in the [embed support guide](https://support.actblue.com/campaigns/working-with-contribution-forms/embeddable-forms-buttons-for-nonprofits/).

= How do I get help? =

If you're having issues with the plugin, please log in with your WP.org account and open a ticket in the [plugin support forum](https://wordpress.org/support/plugin/actblue/).

If you have a question about the ActBlue platform, visit our [support site](https://support.actblue.com/). If you're still stuck, don't hesitate to [send us an email](mailto:integrations@actbluetech.com?subject=%5BWordPress.org%5D%20Support%20for%20ActBlue%20Plugin).

== Screenshots ==

1. Just paste your ActBlue form link in the WordPress editor.
2. The link will automatically be replaced with the live form.

== Changelog ==

= 1.5.2 =
* Tested up to Wordpress 6.0
* Updates dependencies

= 1.5.1 =
* Tested up to Wordpress 5.8.1
* Provide data-ab-source attribute to actblue.js script tag

= 1.4.1 =
* Compatibility with WordPress 5.7

= 1.4.0 =
* ActBlue buttons can pre-select an amount in the form modal that opens
* ActBlue buttons changes style on click, to demonstrate that a form modal is loading

= 1.3.0 =
* Adds refcode support for buttons and embeddable forms
* Reports plugin version to ActBlue on embed
* Bugfixes

= 1.2.1 =
* Updates readme with current features.

= 1.2.0 =
* Adds a custom Gutenberg block for ActBlue contribution buttons.

= 1.1.0 =
* Adds a custom Gutenberg block for ActBlue contribution form embeds.

= 1.0.0 =
* Adds the ActBlue script to public-facing pages.
* Adds the ActBlue oEmbed endpoint to the list of allowed providers.

== Upgrade Notice ==
