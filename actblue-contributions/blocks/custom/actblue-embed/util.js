/**
 * Internal dependencies
 */
import { ASPECT_RATIOS } from "./constants";

/**
 * External dependencies
 */
import classnames from "classnames/dedupe";
import memoize from "memize";

/**
 * WordPress dependencies
 */
import { renderToString } from "@wordpress/element";
import { createBlock } from "@wordpress/blocks";

export const getPhotoHtml = (photo) => {
	// 100% width for the preview so it fits nicely into the document, some "thumbnails" are
	// actually the full size photo. If thumbnails not found, use full image.
	const imageUrl = photo.thumbnail_url ? photo.thumbnail_url : photo.url;
	const photoPreview = (
		<p>
			<img src={imageUrl} alt={photo.title} width="100%" />
		</p>
	);
	return renderToString(photoPreview);
};

/**
 * Returns class names with any relevant responsive aspect ratio names.
 *
 * @param {string}  existingClassNames Any existing class names.
 *
 * @return {string} Deduped class names.
 */
export function getClassNames(existingClassNames = "") {
	// Remove all of the aspect ratio related class names.
	const aspectRatioClassNames = {
		"wp-has-aspect-ratio": false,
	};
	for (let ratioIndex = 0; ratioIndex < ASPECT_RATIOS.length; ratioIndex++) {
		const aspectRatioToRemove = ASPECT_RATIOS[ratioIndex];
		aspectRatioClassNames[aspectRatioToRemove.className] = false;
	}
	return classnames(existingClassNames, aspectRatioClassNames);
}

/**
 * Fallback behaviour for unembeddable URLs.
 * Creates a paragraph block containing a link to the URL, and calls `onReplace`.
 *
 * @param {string}   url       The URL that could not be embedded.
 * @param {Function} onReplace Function to call with the created fallback block.
 */
export function fallback(url, onReplace) {
	const link = <a href={url}>{url}</a>;
	onReplace(createBlock("core/paragraph", { content: renderToString(link) }));
}

/***
 * Gets block attributes based on the preview and responsive state.
 *
 * @param {Object} preview The preview data.
 * @param {Object} currentClassNames The block's current class names.
 *
 * @return {Object} Attributes and values.
 */
export const getAttributesFromPreview = memoize(
	(preview, currentClassNames) => {
		if (!preview) {
			return {};
		}

		const attributes = {};
		// Some plugins only return HTML with no type info, so default this to 'rich'.
		let { type = "rich" } = preview;
		// If we got a provider name from the API, use it for the slug, otherwise we use the title,
		// because not all embed code gives us a provider name.
		const { html } = preview;

		if (html || "photo" === type) {
			attributes.type = type;
		}

		attributes.className = getClassNames(currentClassNames);

		return attributes;
	}
);
