/**
 * WordPress dependencies
 */
import { InnerBlocks } from "@wordpress/block-editor";

const ALLOWED_BLOCKS = ["actblue/button"];
const BUTTONS_TEMPLATE = [["actblue/button"]];
const UI_PARTS = {
	hasSelectedUI: false,
};

function ActBlueButtonsEdit({ className }) {
	return (
		<div className={`${className} wp-block-buttons`}>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={BUTTONS_TEMPLATE}
				__experimentalUIParts={UI_PARTS}
				__experimentalMoverDirection="horizontal"
			/>
		</div>
	);
}

export default ActBlueButtonsEdit;
