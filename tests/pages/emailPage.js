import axios from "axios";
var randomEmail = require('random-email');

export const emailForVarifycation= randomEmail({ domain: "mailsac.com" }); 

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

    async confirmResetPassword() {
        await this.logInBtn.click();
        await this.spanBtn.click();
        await this.lastResetLetter.first().click();
    } 

  async verifyEmail() {
      await this.page.waitForTimeout(5000);
      try {
        await axios.get(
            `https://mailsac.com/api/addresses/${emailForVarifycation}/messages`,
            {
                headers: {
                    'Mailsac-Key': 'k_dEK1Ek8wgYaGHcig4MjM5vjZzyFoDFyzcw2c0c'
                  }
            }
        ).then(async (response) => {
          console.log("Лінк для підтвердження - " + response.data[0].links[0]); 
          const confirmationLink = (response.data[0].links[0]).toString();
          await this.page.goto(confirmationLink);
          await this.page.waitForLoadState('networkidle');  
    })} catch (error) {
            console.log(error);
    }}

};





