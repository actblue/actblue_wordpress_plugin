/**
 * Event listener for when the document is ready. This serves as replacement for
 * JQuery's `$(document).ready()` function.
 *
 * @see http://youmightnotneedjquery.com/#ready
 *
 * @param {Function} callback the function to call when the DOM is ready.
 *
 * @return void
 */
const onDocumentReady = (callback) => {
	if (document.readyState !== "loading") {
		callback();
	} else {
		document.addEventListener("DOMContentLoaded", callback, { once: true });
	}
};

/**
 * Handle the click of a donation button.
 *
 * @param {Object} event Click object.
 *
 * @return void
 */
const handleButtonClick = (event) => {
	const { token, refcode } = event.currentTarget.dataset;

	if (!token) {
		console.warn(
			"Warning: the ActBlue token for this button is invalid. Please be sure to add the URL to a valid ActBlue embeddable form in the editor."
		);
		return;
	}

	window.actblue.requestContribution({ token, refcodes: { refcode } });
	event.preventDefault();
};

/**
 * Initialize.
 *
 * @return void
 */
const actblueInit = () => {
	if (
		typeof window.actblue !== "object" ||
		typeof window.actblue.requestContribution !== "function"
	) {
		console.warn("The actblue.js script is not loaded, but is required.");
		return;
	}

	const buttons = document.querySelectorAll(".js-actblue-donation-button");

	buttons.forEach((btn) => {
		btn.addEventListener("click", handleButtonClick);
	});
};
onDocumentReady(actblueInit);
