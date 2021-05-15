const { BasePage } = require("./BasePage");

class TimelinePage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Search an specific item
   * @param {string} item Name of the item to be searched
   */
  async searchItem(item) {
    await this.page.type('input[placeholder="何かお探しですか？"]', item);
    await Promise.all([
      this.page.waitForNavigation(),
      await this.page.press('input[placeholder="何かお探しですか？"]', "Enter"),
    ]);
  }
}

module.exports = { TimelinePage };
