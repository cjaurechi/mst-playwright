class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to an specific website
   * @param {string} page Website to navigate
   */
  async navigate(page) {
    await Promise.all([ 
      this.page.waitForNavigation(),
      await this.page.goto(page),
    ]);
  }

  async clickLogin() {
    await this.page.click('header >> text=ログイン');
  }

  async clickMyPage() {
    await this.page.click('header >> text=マイページ')
  }
}
module.exports = { BasePage };
