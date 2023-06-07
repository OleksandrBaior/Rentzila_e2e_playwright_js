
export class BasePage  {
  
   /**
   * @param {import('@playwright/test').Page} page
   */
    
    constructor(page) {
        this.page = page;
    }
    
    async navigateBaseURL() {
        await this.page.goto('');
        await this.page.waitForLoadState('networkidle');
    };
};