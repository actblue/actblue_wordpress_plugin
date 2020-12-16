/**
 * External dependencies
 */
import classnames from "classnames/dedupe";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Placeholder } from "@wordpress/components";
import { RichText, BlockIcon } from "@wordpress/block-editor";
import { Component } from "@wordpress/element";

class EmbedPreview extends Component {
	constructor() {
		super(...arguments);
		this.hideOverlay = this.hideOverlay.bind(this);
		this.state = {
			interactive: false,
		};
	}

	static getDerivedStateFromProps(nextProps, state) {
		if (!nextProps.isSelected && state.interactive) {
			// We only want to change this when the block is not selected, because changing it when
			// the block becomes selected makes the overlap disappear too early. Hiding the overlay
			// happens on mouseup when the overlay is clicked.
			return { interactive: false };
		}

		return null;
	}

	hideOverlay() {
		// This is called onMouseUp on the overlay. We can't respond to the `isSelected` prop
		// changing, because that happens on mouse down, and the overlay immediately disappears,
		// and the mouse event can end up in the preview content. We can't use onClick on
		// the overlay to hide it either, because then the editor misses the mouseup event, and
		// thinks we're multi-selecting blocks.
		this.setState({ interactive: true });
	}

	render() {
		const {
			preview,
			url,
			type,
			caption,
			onCaptionChange,
			isSelected,
			className,
			icon,
			label,
		} = this.props;
		const { interactive } = this.state;

		const html = preview.html;
		const cannotPreview = false;

		// Disabled because the overlay div doesn't actually have a role or functionality
		// as far as the user is concerned. We're just catching the first click so that
		// the block can be selected without interacting with the embed preview that the overlay covers.
		/* eslint-disable jsx-a11y/no-static-element-interactions */
		const embedWrapper = (
			<div className="wp-block-embed__wrapper">
				<div dangerouslySetInnerHTML={{ __html: html }} />
				{!interactive && (
					<div
						className="block-library-embed__interactive-overlay"
						onMouseUp={this.hideOverlay}
					/>
				)}
			</div>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions */

		return (
			<figure
				className={classnames(className, "wp-block-embed", {
					"is-type-video": "video" === type,
				})}
			>
				{cannotPreview ? (
					<Placeholder
						icon={<BlockIcon icon={icon} showColors />}
						label={label}
					>
						<p className="components-placeholder__error">
							<a href={url}>{url}</a>
						</p>
						<p className="components-placeholder__error">
							{__(
								"Embedded content from actblue.com can't be previewed in the editor."
							)}
						</p>
					</Placeholder>
				) : (
					embedWrapper
				)}
				{(!RichText.isEmpty(caption) || isSelected) && (
					<RichText
						tagName="figcaption"
						placeholder={__("Write caption…")}
						value={caption}
						onChange={onCaptionChange}
						inlineToolbar
					/>
				)}
			</figure>
		);
	}
}

export default EmbedPreview;
