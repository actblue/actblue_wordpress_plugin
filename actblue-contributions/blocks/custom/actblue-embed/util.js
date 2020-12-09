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

const ASPECT_RATIOS = [
	// Common video resolutions.
	{ ratio: "2.33", className: "wp-embed-aspect-21-9" },
	{ ratio: "2.00", className: "wp-embed-aspect-18-9" },
	{ ratio: "1.78", className: "wp-embed-aspect-16-9" },
	{ ratio: "1.33", className: "wp-embed-aspect-4-3" },
	// Vertical video and instagram square video support.
	{ ratio: "1.00", className: "wp-embed-aspect-1-1" },
	{ ratio: "0.56", className: "wp-embed-aspect-9-16" },
	{ ratio: "0.50", className: "wp-embed-aspect-1-2" },
];

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
