/**
 * WordPress dependencies
 */
import { registerBlockVariation } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { settings as actblueEmbedSettings } from "./extends/actblue-embed";

registerBlockVariation("core/embed", actblueEmbedSettings);
