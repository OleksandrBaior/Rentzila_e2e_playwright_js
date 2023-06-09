// import { test, expect } from '@playwright/test';
// import page from "./Page";
// const MailosaurClient = require('mailosaur');
import axios from "axios";
// import FormData = require("form-data");
var randomEmail = require('random-email');
// import randomEmail from '@random-email';

export const EMAIL_FOR_VARIFYCATION = randomEmail({ domain: "mailsac.com" }); //будь який тестовий емейл але з доменом мейлсаку


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
    //після того як натиснули зареєструватися на рензіллі, чекаємо поки відправиться лист
      await this.page.waitForTimeout(5000);
      try {
        await axios.get(
            `https://mailsac.com/api/addresses/${EMAIL_FOR_VARIFYCATION}/messages`,
            {
                headers: {
                    'Mailsac-Key': 'k_dEK1Ek8wgYaGHcig4MjM5vjZzyFoDFyzcw2c0c'
                  }
            }
        ).then(async (response) => {
        
          console.log("Лінк для підтвердження - " + response.data[0].links[0]); //витягуємо лінк з респонсу
          const confirmationLink = (response.data[0].links[0]).toString();
          await this.page.goto(confirmationLink);//верифікуємо акк переходячи за лінком
            
        //   await browser.pause(1000); //wait untill page load
    })} catch (error) {
        console.log(error);
    }}

};





