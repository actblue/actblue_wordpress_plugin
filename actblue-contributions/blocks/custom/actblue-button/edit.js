/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useCallback } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import {
	PanelBody,
	RangeControl,
	TextControl,
	withFallbackStyles,
} from "@wordpress/components";
import {
	__experimentalUseGradient,
	ContrastChecker,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	RichText,
	withColors,
} from "@wordpress/block-editor";

const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles((node, ownProps) => {
	const { textColor, backgroundColor } = ownProps;
	const backgroundColorValue = backgroundColor && backgroundColor.color;
	const textColorValue = textColor && textColor.color;
	//avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode =
		!textColorValue && node
			? node.querySelector('[contenteditable="true"]')
			: null;
	return {
		fallbackBackgroundColor:
			backgroundColorValue || !node
				? undefined
				: getComputedStyle(node).backgroundColor,
		fallbackTextColor:
			textColorValue || !textNode
				? undefined
				: getComputedStyle(textNode).color,
	};
});

const MIN_BORDER_RADIUS_VALUE = 0;
const MAX_BORDER_RADIUS_VALUE = 50;
const INITIAL_BORDER_RADIUS_POSITION = 5;

function BorderPanel({ borderRadius = "", setAttributes }) {
	const setBorderRadius = useCallback(
		(newBorderRadius) => {
			setAttributes({ borderRadius: newBorderRadius });
		},
		[setAttributes]
	);
	return (
		<PanelBody title={__("Border settings")}>
			<RangeControl
				value={borderRadius}
				label={__("Border radius")}
				min={MIN_BORDER_RADIUS_VALUE}
				max={MAX_BORDER_RADIUS_VALUE}
				initialPosition={INITIAL_BORDER_RADIUS_POSITION}
				allowReset
				onChange={setBorderRadius}
			/>
		</PanelBody>
	);
}

function ActBlueButtonEdit({
	attributes,
	backgroundColor,
	textColor,
	setBackgroundColor,
	setTextColor,
	fallbackBackgroundColor,
	fallbackTextColor,
	setAttributes,
	className,
}) {
	const { borderRadius, placeholder, text, token } = attributes;

	const {
		gradientClass,
		gradientValue,
		setGradient,
	} = __experimentalUseGradient();

	return (
		<div className={className}>
			<RichText
				placeholder={placeholder || __("Add text…")}
				value={text}
				onChange={(value) => setAttributes({ text: value })}
				withoutInteractiveFormatting
				className={classnames("wp-block-button__link", {
					"has-background": backgroundColor.color || gradientValue,
					[backgroundColor.class]:
						!gradientValue && backgroundColor.class,
					"has-text-color": textColor.color,
					[textColor.class]: textColor.class,
					[gradientClass]: gradientClass,
					"no-border-radius": borderRadius === 0,
				})}
				style={{
					...(!backgroundColor.color && gradientValue
						? { background: gradientValue }
						: { backgroundColor: backgroundColor.color }),
					color: textColor.color,
					borderRadius: borderRadius
						? borderRadius + "px"
						: undefined,
				}}
			/>
			<InspectorControls>
				<PanelBody title={__("ActBlue Settings")}>
					<TextControl
						label="Token"
						value={token}
						onChange={(value) => setAttributes({ token: value })}
					/>

					{/*
					We can add a field for an `Amount` with another text control. We can grab the
					`amount` variable from the attributes passed to this edit function.
					*/}

					{/* <TextControl
						type="number"
						label="Amount"
						value={amount}
						onChange={(value) => setAttributes({ amount: value })}
					/> */}
				</PanelBody>
				<PanelColorGradientSettings
					title={__("Background & Text Color")}
					settings={[
						{
							colorValue: textColor.color,
							onColorChange: setTextColor,
							label: __("Text color"),
						},
						{
							colorValue: backgroundColor.color,
							onColorChange: setBackgroundColor,
							gradientValue,
							onGradientChange: setGradient,
							label: __("Background"),
						},
					]}
				>
					<ContrastChecker
						{...{
							// Text is considered large if font size is greater or equal to 18pt or 24px,
							// currently that's not the case for button.
							isLargeText: false,
							textColor: textColor.color,
							backgroundColor: backgroundColor.color,
							fallbackBackgroundColor,
							fallbackTextColor,
						}}
					/>
				</PanelColorGradientSettings>
				<BorderPanel
					borderRadius={borderRadius}
					setAttributes={setAttributes}
				/>
			</InspectorControls>
		</div>
	);
}

export default compose([
	withColors("backgroundColor", { textColor: "color" }),
	applyFallbackStyles,
])(ActBlueButtonEdit);
