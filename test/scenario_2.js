const { chromium } = require("playwright");
const testData = require("../data/testData.json");
const { TimelinePage } = require("../pageObject/Timeline");
const { assert } = require("../utils/assertions");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const timelinePage = new TimelinePage(page);

  // Navigates to Mercari website
  await timelinePage.goToPage(testData.url);

  // Searches for an specific item
  await timelinePage.searchItem(testData.item);

  // Gets the title of the item in the specified position
  const itemTitle = await timelinePage.getItemTitle(3);

  // Validates the searched item name is included on the item title
  await assert(itemTitle, testData.item);

  await browser.close();
})();
