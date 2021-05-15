const { chromium } = require("playwright");
const userData = require("../data/userData.json");
const { TimelinePage } = require("../pageObject/TimelinePage");
const { SearchResultPage } = require('../pageObject/SearchResultPage');
const { assert } = require("../utils/assertions");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const timelinePage = new TimelinePage(page);
  // Navigates to Mercari website
  await timelinePage.navigate(userData.baseUrl);
  // Searches for an specific item
  await timelinePage.searchItem(userData.item);
  
  const searchResultPage = new SearchResultPage(page);
  // Gets the title of the item in the specified position
  const itemTitle = await searchResultPage.getItemTitle(3);

  // Validates the searched item name is included on the item title
  await assert(itemTitle, userData.item);

  await context.close();
  await browser.close();
})();
