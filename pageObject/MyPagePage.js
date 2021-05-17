const { BasePage } = require("./BasePage");
const expect = require("expect");

class MyPagePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickPersonalInformation() {
    await this.page.click("text=個人情報設定");
    /**
     * I'm assuming there is a section title with and ID I could use to assert the user
     * is standing on the correct section.
     */
    expect("#section-title").toContain("個人情報設定");
  }

  async clickShippingAddress() {
    await this.page.click("text=発送元・お届け先住所");
    /**
     * I'm assuming there is a section title with and ID I could use to assert the user
     * is standing on the correct section.
     */
    expect("#section-title").toContain("発送元・お届け先住所");
  }
}

module.exports = { MyPagePage };
