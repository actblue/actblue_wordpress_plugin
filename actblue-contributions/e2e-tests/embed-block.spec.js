import {
	clickBlockToolbarButton,
	clickButton,
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

		await page.$eval(
			'input[aria-label="ActBlue Embed URL"]',
			(el) =>
				(el.value = "https://secure.actblue.com/donate/actblue-1-embed")
		);

		const [embedBtn] = await page.$x(
			'//div[@data-type="actblue/embed"]//button[contains(text(), "Embed")]'
		);
		await embedBtn.click();

		expect(await getEditedPostContent()).toMatchSnapshot();
	});
});
