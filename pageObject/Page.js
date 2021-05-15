class Page {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to an specific URL
   * @param {string} url Website to navigate
   */
  async goToPage(url) {
    await this.page.goto(url);
  }

  /**
   * Gets the title of the product in an specific position
   * @param {int} itemPosition Position of the item to be captured
   * @returns Title of the captured product
   */
  async getProductTitle(itemPosition) {
    const itemTitle = await this.page.$$eval(
      ".items-box-name.font-2",
      (el, itemPosition) => el[itemPosition - 1].innerText,
      itemPosition
    );
    return itemTitle;
  }
}

module.exports = { Page };
