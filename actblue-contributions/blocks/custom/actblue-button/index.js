/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import icon from "../../icons/actblue";

const attributes = {
	title: {
		type: "string",
		source: "attribute",
		selector: "a",
		attribute: "title",
	},
	text: {
		type: "string",
		source: "html",
		selector: "a",
	},
	backgroundColor: {
		type: "string",
	},
	textColor: {
		type: "string",
	},
	customBackgroundColor: {
		type: "string",
	},
	customTextColor: {
		type: "string",
	},
	placeholder: {
		type: "string",
	},
	borderRadius: {
		type: "number",
	},
	gradient: {
		type: "string",
	},
	customGradient: {
		type: "string",
	},

	// ActBlue form settings.
	token: {
		type: "string",
	},

	// amount: {
	// 	type: "string",
	// },
};

export const name = "actblue/button";

export const settings = {
	name,
	icon,
	title: "ActBlue Button",
	description: "Add a button for an ActBlue contribution.",
	category: "layout",
	keywords: [__("link")],
	example: {
		attributes: {
			className: "is-style-fill",
			backgroundColor: "vivid-green-cyan",
			text: __("Call to Action"),
		},
	},
	supports: {
		align: false,
		alignWide: false,
	},
	styles: [
		{ name: "fill", label: __("Fill"), isDefault: true },
		{ name: "outline", label: __("Outline") },
	],
	parent: ["actblue/buttons"],
	attributes,
	edit,
	save,
};
