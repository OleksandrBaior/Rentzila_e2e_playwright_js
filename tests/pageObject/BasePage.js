
export class Base  {
  
   /**
   * @param {import('@playwright/test').Page} page
   */
    
    constructor(page) {
        this.page = page
    }
    
    async navigate() {
        await this.page.goto('');
        await this.page.waitForLoadState('networkidle');
    };
};