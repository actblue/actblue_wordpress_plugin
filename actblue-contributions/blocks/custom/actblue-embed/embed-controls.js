/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Button, ToolbarGroup } from "@wordpress/components";
import { BlockControls } from "@wordpress/block-editor";
import { pencil } from "@wordpress/icons";

const EmbedControls = (props) => {
	const { showEditButton, switchBackToURLInput } = props;
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{showEditButton && (
						<Button
							className="components-toolbar__control"
							label={__("Edit URL")}
							icon={pencil}
							onClick={switchBackToURLInput}
						/>
					)}
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};

export default EmbedControls;
