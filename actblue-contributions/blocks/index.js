/**
 * WordPress dependencies
 */
import domReady from "@wordpress/dom-ready";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import * as embedBlock from "./custom/actblue-embed";
import * as buttonBlock from "./custom/actblue-button";

// We need to run this on domReady so that the block data has been initialized.
domReady(() => {
	// The `settings` parameter needs to be a function so we can get the
	// `core/embed` settings to extend for this block.
	registerBlockType(embedBlock.name, embedBlock.getSettings());

	[buttonBlock].forEach(({ name, settings }) => {
		registerBlockType(name, settings);
	});
});
