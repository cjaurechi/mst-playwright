const { BasePage } = require("./BasePage");

class SearchResultPage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Gets the title of the product in an specific position
   * @param {int} itemPosition Position of the item
   * @returns Title of the item
   */
  async getItemTitle(itemPosition) {
    const itemTitle = await this.page.$$eval(
      ".items-box-name.font-2",
      (el, itemPosition) => el[itemPosition - 1].innerText,
      itemPosition
    );
    return itemTitle.toLowerCase();
  }
}

module.exports = { SearchResultPage };
