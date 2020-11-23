/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

export const settings = {
	name: "actblue-embed",
	title: "ActBlue Embed",
	icon: "",
	keywords: [],
	description: __("Embed an ActBlue contribution form."),
	patterns: [/^https:\/\/secure.actblue.com\/.+/i],
	attributes: { providerNameSlug: "actblue", responsive: true },
};
