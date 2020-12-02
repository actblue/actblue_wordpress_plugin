/**
 * WordPress dependencies
 */
import {
	__experimentalAlignmentHookSettingsProvider as AlignmentHookSettingsProvider,
	InnerBlocks,
} from "@wordpress/block-editor";

const ALLOWED_BLOCKS = ["actblue/button"];
const BUTTONS_TEMPLATE = [["actblue/button"]];
const UI_PARTS = {
	hasSelectedUI: false,
};

// Inside buttons block alignment options are not supported.
const alignmentHooksSetting = {
	isEmbedButton: true,
};

function ActBlueButtonsEdit({ className }) {
	return (
		<div className={`${className} wp-block-buttons`}>
			<AlignmentHookSettingsProvider value={alignmentHooksSetting}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={BUTTONS_TEMPLATE}
					__experimentalUIParts={UI_PARTS}
					__experimentalMoverDirection="horizontal"
				/>
			</AlignmentHookSettingsProvider>
		</div>
	);
}

export default ActBlueButtonsEdit;
