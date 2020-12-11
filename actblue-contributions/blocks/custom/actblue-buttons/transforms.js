/**
 * WordPress dependencies
 */
import { createBlock } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { name } from "./index";

const ActBlueButtonsTransforms = {
	from: [
		{
			type: "block",
			blocks: ["core/buttons"],
			transform: (attributes, innerBlocks) => {
				const newInnerBlocks = innerBlocks.map((block) =>
					createBlock("actblue/button", block.attributes)
				);

				// Creates the buttons block
				return createBlock(name, {}, newInnerBlocks);
			},
		},
	],
	to: [
		{
			type: "block",
			blocks: ["core/buttons"],
			transform: (attributes, innerBlocks) => {
				const newInnerBlocks = innerBlocks.map((block) =>
					createBlock("core/button", block.attributes)
				);

				return createBlock("core/buttons", attributes, newInnerBlocks);
			},
		},
	],
};

export default ActBlueButtonsTransforms;
