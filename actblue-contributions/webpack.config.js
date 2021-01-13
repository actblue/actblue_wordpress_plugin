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
		editor: "./blocks/editor.scss",
		["actblue-contributions"]: "./public/js/actblue-contributions.js",
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.scss$/,
				use: [
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
						},
					},
				],
			},
		],
	},
};
