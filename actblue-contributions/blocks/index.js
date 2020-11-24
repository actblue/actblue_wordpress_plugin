/**
 * WordPress dependencies
 */
import domReady from "@wordpress/dom-ready";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { name, getBlockSettings } from "./custom/actblue-embed";

// We need to run this on domReady so that the block data has been initialized.
domReady(() => {
	registerBlockType(name, getBlockSettings());
});
