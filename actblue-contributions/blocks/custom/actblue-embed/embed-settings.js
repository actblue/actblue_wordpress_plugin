/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { PanelBody, TextControl, Button } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

const EmbedSettings = ({ refcode, onChange = null, onUpdate = null }) => {
	const [refcodeInput, setRefcode] = useState(refcode);

	if (!onChange) {
		onChange = (value) => setRefcode(value);
	}

	return (
		<InspectorControls>
			<PanelBody
				title={__("ActBlue Settings")}
				className="actblue-embed-settings__panel"
			>
				<TextControl
					label="Refcode"
					value={onUpdate ? refcodeInput : refcode}
					onChange={onChange}
					help="Add a refcode to this embed form."
				/>

				{onUpdate && (
					<Button isSecondary onClick={() => onUpdate(refcodeInput)}>
						Update
					</Button>
				)}
			</PanelBody>
		</InspectorControls>
	);
};

export default EmbedSettings;
