/**
 * WordPress dependencies
 */
import { createBlock } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { name } from "./index";

const ActBlueEmbedTransforms = {
	from: [
		{
			type: "raw",
			isMatch: (node) =>
				node.nodeName === "P" &&
				/^\s*(https?:\/\/secure\.actblue\.com\S+)\s*$/i.test(
					node.textContent
				),
			transform: (node) => {
				return createBlock(name, {
					url: node.textContent.trim(),
				});
			},
		},
	],
};

export default ActBlueEmbedTransforms;
