/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { SVG, Path } from "@wordpress/primitives";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";

const attributes = {
	url: {
		type: "string",
	},
	caption: {
		type: "string",
		source: "html",
		selector: "figcaption",
	},
	type: {
		type: "string",
	},
	providerNameSlug: {
		type: "string",
	},
	allowResponsive: {
		type: "boolean",
		default: true,
	},
};

export const icon = () => (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.32 27.69">
		<Path
			d="M23.33,27.69l-2.56-6H9.14L6.58,27.62H0L11.91,0h5.95L29.77,27.62H23.33ZM15,8.24l-3.46,8h6.92Zm29.91,7.41A6.26,6.26,0,0,1,46.31,20a7.45,7.45,0,0,1-2,5.12c-1.52,1.73-4.15,2.56-8,2.56h-4.5L24.3,10.11V0H35a16.79,16.79,0,0,1,4.84.69,6.89,6.89,0,0,1,3.05,1.8,7.23,7.23,0,0,1,1.87,4.85,5.61,5.61,0,0,1-2.08,4.84,6.52,6.52,0,0,1-1,.7,4.42,4.42,0,0,1-1,.48A7.09,7.09,0,0,1,44.86,15.65ZM30.46,5.26v6h3a10.15,10.15,0,0,0,3.8-.55,2.41,2.41,0,0,0,1.25-2.42,2.5,2.5,0,0,0-1.18-2.43,8.8,8.8,0,0,0-3.87-.62ZM38.7,21.81A2.68,2.68,0,0,0,40,19.24a2.44,2.44,0,0,0-1.38-2.56,12.08,12.08,0,0,0-4.5-.62H30.46v6.37h4.29A9.89,9.89,0,0,0,38.7,21.81Z"
			fill="#00a9e0"
		/>
	</SVG>
);

export const title = __("ActBlue Embed");
export const name = "actblue/embed";

export const settings = {
	title,
	icon,
	description: __("Embed an ActBlue contribution form."),
	category: "embed",
	responsive: false,
	keywords: [],
	supports: {
		align: true,
	},
	attributes,
	edit,
	save,
};
