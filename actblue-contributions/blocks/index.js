/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import * as embedBlock from "./custom/actblue-embed";
import * as buttonsBlock from "./custom/actblue-buttons";
import * as buttonBlock from "./custom/actblue-button";

[embedBlock, buttonsBlock, buttonBlock].forEach(({ name, settings }) => {
	registerBlockType(name, settings);
});
