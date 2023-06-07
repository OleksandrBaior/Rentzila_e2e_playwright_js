

export class EmailPage {
  
   /**
   * @param {import('@playwright/test').Page} page
   */
    
    constructor(page) {
        this.page = page;
        this.emailUrl = 'https://mail.tutanota.com/login';
        this.emailLogIn = page.locator('[type="email"]');
        this.passwordLogIn = page.locator('[type="password"]');
        this.logInBtn = page.locator('button[title="Log in"]');
        this.spanBtn = page.getByRole('button', { name: 'Spam' });
        this.changePassword = page.getByRole('link', { name: 'Змінити пароль' })
        this.lastResetLetter = page.getByText('kukol.dbcp.django@gmail.com')
    }
    
  
};