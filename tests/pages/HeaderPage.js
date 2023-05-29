
export class HeaderPage  {
  
    /**
    * @param {import('@playwright/test').Page} page
    */
     
     constructor(page) {
        this.page = page;
        this.loginButton = page.locator('div[class*="Navbar_btn_enter"]');
        this.avatarBlock = page.getByTestId('avatarBlock');
        this.logoutBtn = page.locator('//*[@data-testid="logout"]');
     }
    
    async clickElement(locator) {
        await locator.click();
    }

 };