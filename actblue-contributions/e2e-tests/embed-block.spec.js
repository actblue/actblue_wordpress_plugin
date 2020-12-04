import {
	createNewPost,
	enablePageDialogAccept,
	getEditedPostContent,
	insertBlock,
} from "@wordpress/e2e-test-utils";

import { selectBlockByName } from "./helpers";

jest.setTimeout(30000);

describe("Wrapper block", () => {
	beforeAll(async () => {
		await enablePageDialogAccept();
	});
	beforeEach(async () => {
		await createNewPost();
	});

	// Tests can be added here by using the it() function

	it("Embed block is available", async () => {
		await insertBlock("ActBlue Embed");

		// Check if block was inserted
		expect(await page.$('[data-type="actblue/embed"]')).not.toBeNull();

		expect(await getEditedPostContent()).toMatchSnapshot();
	});

	it("Add embed url", async () => {
		await insertBlock("ActBlue Embed");
		await selectBlockByName("actblue/embed");

		// Type in the embed URL.
		await page.type(
			'input[aria-label="ActBlue Embed URL"]',
			"https://secure.actblue.com/donate/actblue-1-embed"
		);

		// Click the "Embed" button.
		const [embedBtn] = await page.$x(
			'//div[@data-type="actblue/embed"]//button[contains(text(), "Embed")]'
		);
		await embedBtn.click();

		// wait for 1 second for the embed to load.
		await page.waitFor(1000);

		await page.screenshot({
			path: "e2e-tests/__screenshots__/after-click.png",
		});

		expect(await getEditedPostContent()).toMatchSnapshot();
	});
});
