/**
 * Internal dependencies
 */
import EmbedControls from "./embed-controls";
import EmbedLoading from "./embed-loading";
import EmbedPlaceholder from "./embed-placeholder";
import EmbedPreview from "./embed-preview";

/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component, renderToString } from "@wordpress/element";
import { createBlock } from "@wordpress/blocks";
import { compose } from "@wordpress/compose";
import { withSelect, withDispatch } from "@wordpress/data";
import { PanelBody, TextControl, Button } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

import { icon } from "./index";
import urlWithQueryConfiguration from "./urlWithQueryConfiguration";

/**
 * Fallback behaviour for unembeddable URLs.
 * Creates a paragraph block containing a link to the URL, and calls `onReplace`.
 *
 * @param {string}   url       The URL that could not be embedded.
 * @param {Function} onReplace Function to call with the created fallback block.
 */
function fallback(url, onReplace) {
	const link = <a href={url}>{url}</a>;
	onReplace(createBlock("core/paragraph", { content: renderToString(link) }));
}

class EmbedEditMain extends Component {
	constructor() {
		super(...arguments);
		this.switchBackToURLInput = this.switchBackToURLInput.bind(this);
		this.setUrl = this.setUrl.bind(this);
		this.handleIncomingPreview = this.handleIncomingPreview.bind(this);

		this.state = {
			editingURL: false,
			url: this.props.attributes.url,
		};

		if (this.props.preview) {
			this.handleIncomingPreview();
		}
	}

	/**
	 * Sets block attributes based on the current attributes and preview data.
	 */
	handleIncomingPreview() {
		const { setAttributes } = this.props;
		setAttributes(this.props.attributes);
	}

	componentDidUpdate(prevProps) {
		const hasPreview = undefined !== this.props.preview;
		const hadPreview = undefined !== prevProps.preview;
		const previewChanged =
			prevProps.preview &&
			this.props.preview &&
			this.props.preview.html !== prevProps.preview.html;
		const switchedPreview = previewChanged || (hasPreview && !hadPreview);
		const switchedURL =
			this.props.attributes.url !== prevProps.attributes.url;

		if (switchedPreview || switchedURL) {
			if (this.props.cannotEmbed) {
				// We either have a new preview or a new URL, but we can't embed it.
				if (!this.props.fetching) {
					// If we're not fetching the preview, then we know it can't be embedded, so try
					// removing any trailing slash, and resubmit.
					this.resubmitWithoutTrailingSlash();
				}
				return;
			}
			this.handleIncomingPreview();
		}
	}

	resubmitWithoutTrailingSlash() {
		this.setState(
			(prevState) => ({
				url: prevState.url.replace(/\/$/, ""),
			}),
			this.setUrl
		);
	}

	setUrl(event) {
		if (event) {
			event.preventDefault();
		}
		const { url } = this.state;
		const { setAttributes } = this.props;
		if (url.indexOf("https://secure.actblue.com") !== 0) {
			console.error(
				"Can not use ActBlue Embed block to embed non-ActBlue urls"
			);
			return;
		}
		this.setState({ editingURL: false });
		setAttributes({ url });
	}

	switchBackToURLInput() {
		this.setState({ editingURL: true });

		// When switching back to set a new URL, clear any ActBlue settings that
		// were previously set.
		this.props.clearActBlueSettings();
	}

	render() {
		const { url, editingURL } = this.state;
		const {
			fetching,
			setAttributes,
			isSelected,
			preview,
			cannotEmbed,
			tryAgain,
		} = this.props;

		if (fetching) {
			return <EmbedLoading />;
		}

		const label = "ActBlue URL";

		// No preview, or we can't embed the current URL, or we've clicked the edit button.
		if (!preview || cannotEmbed || editingURL) {
			return (
				<EmbedPlaceholder
					icon={icon}
					label={label}
					onSubmit={this.setUrl}
					value={url}
					cannotEmbed={cannotEmbed}
					onChange={(event) =>
						this.setState({ url: event.target.value })
					}
					fallback={() => fallback(url, this.props.onReplace)}
					tryAgain={tryAgain}
				/>
			);
		}

		const { caption, type } = this.props.attributes;
		const className = classnames(
			this.props.attributes.className,
			this.props.className
		);

		return (
			<>
				<EmbedControls
					showEditButton={preview && !cannotEmbed}
					switchBackToURLInput={this.switchBackToURLInput}
				/>
				<EmbedPreview
					preview={preview}
					className={className}
					url={url}
					type={type}
					caption={caption}
					onCaptionChange={(value) =>
						setAttributes({ caption: value })
					}
					isSelected={isSelected}
					icon={icon}
					label={label}
				/>
			</>
		);
	}
}

/**
 * This class holds the entire embed block, including the block UI and the settings
 * for the block in the sidebar. New settings to be passed with the url to the
 * oEmbed endpoint can be added to the `<InspectorControls>` component.
 *
 * There are a number of available UI components in the @wordpress/components
 * package that can be used to handle text inputs, buttons, selects, etc.
 *
 * @link https://developer.wordpress.org/block-editor/components/
 */
class EmbedEdit extends Component {
	constructor() {
		super(...arguments);
		this.clearActBlueSettings = this.clearActBlueSettings.bind(this);
	}

	/**
	 * Set up a function to clear the settings in the event that we want to start
	 * over, like if the user decides to input a new embed url.
	 */
	clearActBlueSettings() {
		this.props.setAttributes({ refcode: "" });
	}

	render() {
		return (
			<>
				<EmbedEditMain
					{...this.props}
					clearActBlueSettings={this.clearActBlueSettings}
				/>

				{/*
				The following component holds content that will go in the editor
				sidebar when an `ActBlue Embed` block is selected.
				*/}
				<InspectorControls>
					<PanelBody
						title={__("ActBlue Settings")}
						className="actblue-embed-settings__panel"
					>
						<TextControl
							label="Refcode"
							value={this.props.attributes.refcode}
							onChange={(value) =>
								this.props.setAttributes({
									refcode: value,
								})
							}
							help="Add a refcode to this embed form."
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	}
}

export default compose(
	withSelect((select, ownProps) => {
		const { url: baseUrl } = ownProps.attributes;
		const url = urlWithQueryConfiguration({
			url: baseUrl,
			preview: "true",
		});
		const core = select("core");
		const {
			getEmbedPreview,
			isPreviewEmbedFallback,
			isRequestingEmbedPreview,
		} = core;

		const preview = undefined !== url && getEmbedPreview(url);
		const previewIsFallback =
			undefined !== url && isPreviewEmbedFallback(url);
		const fetching = undefined !== url && isRequestingEmbedPreview(url);

		// The external oEmbed provider does not exist. We got no type info and no html.
		const badEmbedProvider =
			!!preview && undefined === preview.type && false === preview.html;
		// Some WordPress URLs that can't be embedded will cause the API to return
		// a valid JSON response with no HTML and `data.status` set to 404, rather
		// than generating a fallback response as other embeds do.
		const wordpressCantEmbed =
			!!preview && preview.data && preview.data.status === 404;
		const validPreview =
			!!preview && !badEmbedProvider && !wordpressCantEmbed;
		const cannotEmbed =
			undefined !== url && (!validPreview || previewIsFallback);
		return {
			preview: validPreview ? preview : undefined,
			fetching,
			cannotEmbed,
		};
	}),
	withDispatch((dispatch, ownProps) => {
		const { url } = ownProps.attributes;
		const coreData = dispatch("core/data");
		const tryAgain = () => {
			coreData.invalidateResolution("core", "getEmbedPreview", [url]);
		};
		return {
			tryAgain,
		};
	})
)(EmbedEdit);
