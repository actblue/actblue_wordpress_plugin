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

export const name = "actblue/buttons";

export const settings = {
	title: __("ActBlue Buttons"),
	description: __(
		"Prompt visitors to take action with a group of ActBlue donation buttons."
	),
	category: "layout",
	icon,
	keywords: [__("link")],
	supports: {
		align: true,
		alignWide: false,
	},
	edit,
	save,
	transforms,
};
