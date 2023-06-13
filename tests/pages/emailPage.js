import axios from "axios";
var randomEmail = require('random-email');


export const emailForVarifycation = randomEmail({ domain: "mailsac.com" }); 


export class EmailPage {
  
   /**
   * @param {import('@playwright/test').Page} page
   */
    
    constructor(page) {
        this.page = page;
    }

    async verifyEmail(email) {
      await this.page.waitForTimeout(5000);
      try {
        await axios.get(
            `https://mailsac.com/api/addresses/${email}/messages`,
            {
                headers: {
                    'Mailsac-Key': 'k_dEK1Ek8wgYaGHcig4MjM5vjZzyFoDFyzcw2c0c'
                  }
            }
        ).then(async (response) => {
          console.log("Лінк для підтвердження - " + response.data[0].links[0]); 
          const confirmationLink = (response.data[0].links[0]).toString();
          await this.page.goto(confirmationLink);
          await this.page.waitForLoadState();  
    })} catch (error) {
            console.log(error);
      }
  }

    

};





