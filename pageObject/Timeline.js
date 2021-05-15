const { Page } = require("./Page");

class TimelinePage extends Page {
  constructor(page) {
    super(page);
  }

  /**
   * Searches for an specific product
   * @param {string} product Name of the product to be searched
   */
  async searchProduct(product) {
    await this.page.type('input[placeholder="何かお探しですか？"]', product);
    await Promise.all([
      this.page.waitForNavigation(),
      await this.page.press('input[placeholder="何かお探しですか？"]', "Enter"),
    ]);
  }
}

module.exports = { TimelinePage };
