const BasePage = require('./basePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.inventoryList = '.inventory_list';
        this.burgerMenu = '.bm-burger-button';
        this.logoutLink = '#logout_sidebar_link';
        this.loginForm = '#login_button_container';
    }

    async login(username, password) {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async isLoggedIn() {
        await this.waitForElement(this.inventoryList);
        return true;
    }

    async isLoggedOut() {
        await this.waitForElement(this.loginForm);
        return true;
    }
}

module.exports = LoginPage;