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
  await timelinePage.navigate(userData.baseUrl);
  await timelinePage.searchItem(userData.item);
  
  const searchResultPage = new SearchResultPage(page);

  const itemTitle = await searchResultPage.getItemTitle(3);

  await assert(itemTitle, userData.item);

  await context.close();
  await browser.close();
})();
