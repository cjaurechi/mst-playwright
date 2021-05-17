const { MyPagePage } = require("./MyPagePage");

class ShippingAddressPage extends MyPagePage {
  constructor(page) {
    super(page);
  }

  async createNewShippingAddress({ data }) {
    /**
     * As I don't have access to the web app, I'm using the provided screenshots
     * as a reference to infer the web elements selectors. Ideally I'd use representative
     * selectors that won't change soon, such as placeholder or text. To be even more
     * specific, I'd start by checking the web element (Input, button, div) and then
     * move into the placeholder text or actual text.
     */

    await this.page.click("text=配送先住所を追加する");
    await this.page.fill('input[placeholder="姓（全角）"]', data.lastame);
    await this.page.fill('input[placeholder="名（全角）"]', data.firstname);
    await this.page.fill(
      'input[placeholder="姓カナ（全角）"]',
      data.lastname_kana
    );
    await this.page.fill(
      'input[placeholder="名カナ（全角）"]',
      data.firstname_kana
    );
    await this.page.fill('input[placeholder="郵便番号（数字）"]', data.zipcode);
    await this.page.fill('input[placeholder="都道府県"]', data.prefecture);
    await this.page.fill('input[placeholder="市区町村"]', data.municipality);
    await this.page.fill('input[placeholder="住所"]', data.address);
    await this.page.click('button >> text="登録する"');
  }

  async deleteShippingAddress({ data }) {
    /**
     * I'm not familiar with Mercari's Shipping Address page and as the test only
     * provides screenshots for the mobile app I'll assume there is a delete
     * button right next to the element that contains the address.
     */

    const address = await this.page.$(
      `button:right-of(:text("${data.address}")`
    );
    await address.click();
    /**
     * Once again I'm assuming there is a confirmation message showing up on the UI
     * and the user must manually click on '削除する' to confirm the address to be deleted.
     */
    await this.page.click("text=削除する");
  }
}

module.exports = { ShippingAddressPage };
