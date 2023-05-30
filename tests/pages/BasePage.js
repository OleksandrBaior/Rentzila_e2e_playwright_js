import { expect } from '@playwright/test';

export class BasePage  {
  
   /**
   * @param {import('@playwright/test').Page} page
   */
    
    constructor(page) {
        this.page = page;
    }
    
    async navigateToMainPage() {
        await this.page.goto('');
        await this.page.waitForLoadState('networkidle');
    };

    async clickElement(locator) {
        await locator.click();

    }

    async checkElementIsVisible(element) {
        await expect(element).toBeVisible();
    }
    
    async checkElementIsNotVisible(element) {
        await expect(element).not.toBeVisible();
    }

    async setValueInField(element, value) {
        await element.fill(value);
    }

    async clearValueInField(locator) {
        await locator.clear();
    }

    async checkURL(url) {
        await expect(this.page).toHaveURL(url);
    }
};