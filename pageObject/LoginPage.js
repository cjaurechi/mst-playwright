const { BasePage } = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  /**
   * Login with user credentials
   * @param {string} username User name
   * @param {string} password User password 
   */
  async login(username, password) {
    await this.page.fill('[placeholder="メールアドレス"]', username);
    await this.page.fill('[placeholder="パスワード"]', password);
    await this.page.click(".login-submit");
    
    /* Ideally we run this on an environment that has captcha disabled 
     * or it's configured to accept always the same value */
  }
}

module.exports = { LoginPage };
