/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import * as embedBlock from "./custom/actblue-embed";
import * as buttonBlock from "./custom/actblue-button";

[embedBlock, buttonBlock].forEach(({ name, settings }) => {
	registerBlockType(name, settings);
});
