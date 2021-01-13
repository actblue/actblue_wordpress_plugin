/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import transforms from "./transforms";
import icon from "../../icons/actblue";

const attributes = {
	url: {
		type: "string",
	},
	caption: {
		type: "string",
		source: "html",
		selector: "figcaption",
	},
	type: {
		type: "string",
	},
	allowResponsive: {
		type: "boolean",
		default: true,
	},

	// ActBlue arguments
	refcode: {
		type: "string",
	},
};

export { icon };
export const title = __("ActBlue Embed");
export const name = "actblue/embed";

export const settings = {
	title,
	icon,
	description: __("Embed an ActBlue contribution form."),
	category: "embed",
	responsive: false,
	keywords: [],
	supports: {
		align: true,
	},
	transforms,
	attributes,
	edit,
	save,
};
