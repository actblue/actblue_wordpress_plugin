/**
 * WordPress dependencies
 */
import { InnerBlocks } from "@wordpress/block-editor";

export default function save() {
	return (
		<div className="wp-block-buttons">
			<InnerBlocks.Content />
		</div>
	);
}
