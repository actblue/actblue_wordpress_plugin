/**
 * WordPress dependencies
 */
import { getBlockType } from "@wordpress/blocks";

export const name = "actblue/embed";

export const getBlockSettings = () => {
	const settings = getBlockType("core/embed");

	return {
		...settings,
		name,
		title: "ActBlue Embed",
		icon: "block",
		description: "Embed an ActBlue contribution form.",
	};
};
