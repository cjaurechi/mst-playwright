const { chromium } = require("playwright");
const userData = require("../data/userData.json");
const shippingAddress = require("../data/shippingAddress.json");
const { TimelinePage } = require("../pageObject/TimelinePage");
const { LoginPage } = require("../pageObject/LoginPage");
const { MyPagePage } = require("../pageObject/MyPagePage");
const { ShippingAddressPage } = require("../pageObject/ShippingAddressPage");
const { verifyAddress } = require("../utils/assertions");

(async () => {
  /**
   * For this scenario I'm assuming the user doesn't have any previous shipping address
   * saved on his profile as we're testing the "add new shipping address" happy path.
   */
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

  /** 
   * I'm assuming there is only one address (The recently created one) and that's
   * why I'm using page.$('.address-box') assuming it's the only element there. I'm
   * also assuming address-box is the class of the element containing the address.
   */
  const newShippingAddress = page.$(".address-box");
  await verifyAddress(newShippingAddress, shippingAddress);

  /** 
   * Ideally we delete the newly created address at the end of the test. If we were using
   * jest-playwright or Cypress we could use an "after" hook to do this and closing both
   * browser and context instances.
   */
  await shippingAddressPage.deleteShippingAddress(shippingAddress);

  await context.close();
  await browser.close();
})();
