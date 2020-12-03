/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import * as embedBlock from "./custom/actblue-embed";

[embedBlock].forEach(({ name, settings }) => {
	registerBlockType(name, settings);
});
