const { BasePage } = require("./BasePage");

class MyPagePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickPersonalInformation() {
    await this.page.click("text=個人情報設定");
    /** Ideally I'd verify that something exists after navigating to this
     * page?
     */
  }

  async clickShippingAddress() {
    await this.page.click("text=発送元・お届け先住所");
  }
}

module.exports = { MyPagePage };
