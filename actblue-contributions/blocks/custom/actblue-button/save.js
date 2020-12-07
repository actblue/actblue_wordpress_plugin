/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import {
	RichText,
	getColorClassName,
	__experimentalGetGradientClass,
} from "@wordpress/block-editor";

const ActBlueButtonSave = ({ attributes }) => {
	const {
		backgroundColor,
		borderRadius,
		customBackgroundColor,
		customTextColor,
		customGradient,
		gradient,
		text,
		textColor,
		title,
		token,
	} = attributes;

	const textClass = getColorClassName("color", textColor);
	const backgroundClass =
		!customGradient &&
		getColorClassName("background-color", backgroundColor);
	const gradientClass = __experimentalGetGradientClass(gradient);

	const buttonClasses = classnames("wp-block-button__link", {
		"has-text-color": textColor || customTextColor,
		[textClass]: textClass,
		"has-background":
			backgroundColor ||
			customBackgroundColor ||
			customGradient ||
			gradient,
		[backgroundClass]: backgroundClass,
		"no-border-radius": borderRadius === 0,
		[gradientClass]: gradientClass,
	});

	const buttonStyle = {
		background: customGradient ? customGradient : undefined,
		backgroundColor:
			backgroundClass || customGradient || gradient
				? undefined
				: customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		borderRadius: borderRadius ? borderRadius + "px" : undefined,
	};

	// The arguments to be passed to the `actblue.requestContribution()` function, stringified so
	// we can pass it into the inline onClick function below. To add the amount, grab the `amount`
	// variable from the attributes passed to this function and add it to the stringified object.
	const contributionArgs = JSON.stringify({ token });

	const onClickInlineFunction = token
		? `if (window.actblue && typeof window.actblue.requestContribution === 'function') { window.actblue.requestContribution(${contributionArgs}) }; return false;`
		: 'console.warn("Warning: the ActBlue token for this button is invalid. Please be sure to add a valid endpoint to this button in the editor."); return false';

	// The use of a `title` attribute here is soft-deprecated, but still applied if it
	// had already been assigned, for the sake of backward-compatibility. A title will no
	// longer be assigned for new or updated button block links.
	return (
		<div className="wp-block-button">
			<RichText.Content
				tagName="a"
				className={buttonClasses}
				href="#"
				title={title}
				style={buttonStyle}
				value={text}
				onClick={onClickInlineFunction}
			/>
		</div>
	);
};

export default ActBlueButtonSave;
