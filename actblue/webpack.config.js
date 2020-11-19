/**
 *
 * Custom webpack config for block styles/scripts.
 * @see https://developer.wordpress.org/block-editor/packages/packages-scripts/
 */
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	entry: {
		blocks: "./blocks",
	},
};
