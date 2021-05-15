const { chromium } = require("playwright");
const userData = require("../data/userData.json");
const shippingAddress = require("../data/shippingAddress.json");
const { TimelinePage } = require("../pageObject/TimelinePage");
const { LoginPage } = require("../pageObject/LoginPage");
const { MyPagePage } = require("../pageObject/MyPagePage");
const { ShippingAddressPage } = require("../pageObject/ShippingAddressPage");
const { verifyAddress } = require("../utils/assertions");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const timelinePage = new TimelinePage(page);
  await timelinePage.navigate(userData.baseUrl);
  await timelinePage.clickLogin();
  
  const loginPage = new LoginPage(page);
  await loginPage.login(userData.username, userData.password);

  await timelinePage.clickMyPage();

  const myPagePage = new MyPagePage(page);
  await myPagePage.clickPersonalInformation();
  await myPagePage.clickShippingAddress();

  const shippingAddressPage = new ShippingAddressPage(page);
  await shippingAddressPage.createNewShippingAddress(shippingAddress);
  await verifyAddress(shippingAddress);

  await context.close();
  await browser.close();
})();
