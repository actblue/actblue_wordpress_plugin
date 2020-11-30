import { __ } from "@wordpress/i18n";
import edit from "./edit";
import save from "./save";

export const name = "actblue/button";

export const settings = {
	title: "ActBlue Button",
	name,
	icon: "smiley",
	description: "Add a button for an ActBlue contribution.",
	keywords: [__("link")],
	example: {
		attributes: {
			className: "is-style-fill",
			backgroundColor: "vivid-green-cyan",
			text: __("Call to Action"),
		},
	},
	supports: {
		align: true,
		alignWide: false,
	},
	styles: [
		{ name: "fill", label: __("Fill"), isDefault: true },
		{ name: "outline", label: __("Outline") },
	],
	edit,
	save,
};
