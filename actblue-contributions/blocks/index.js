/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import * as buttonsBlock from "./custom/actblue-buttons";
import * as buttonBlock from "./custom/actblue-button";

[buttonsBlock, buttonBlock].forEach(({ name, settings }) => {
	registerBlockType(name, settings);
});
