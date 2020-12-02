/**
 * WordPress dependencies
 */
import { getBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies.
 */
import icon from "../../icons/actblue";

export const name = "actblue/embed";

export const getSettings = () => {
	const settings = getBlockType("core/embed");

	return {
		...settings,
		name,
		icon,
		title: "ActBlue Embed",
		description: "Embed an ActBlue contribution form.",
	};
};
