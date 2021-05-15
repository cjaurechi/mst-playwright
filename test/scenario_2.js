const { chromium } = require("playwright");
const expect = require("expect");
const testData = require("../data/testData.json");
const { TimelinePage } = require("../pageObject/Timeline");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const timelinePage = new TimelinePage(page);

  await timelinePage.goToPage(testData.url);
  await timelinePage.searchProduct(testData.product);
  const productTitle = await timelinePage.getProductTitle(3);
  expect(productTitle.toLowerCase()).toContain(testData.product.toLowerCase());

  await browser.close();
})();
