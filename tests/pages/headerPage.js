import { expect } from '@playwright/test';

export class HeaderPage {
  
    /**
    * @param {import('@playwright/test').Page} page
    */
     
    constructor(page) {
        this.page = page;
        this.loginBtn = page.locator('div[class*="Navbar_btn_enter"]');
        this.avatarBlock = page.getByTestId('avatarBlock');
        this.profileBtn = page.locator('[data-testid="profile"]');
        this.logoutBtn = page.locator('[data-testid="logout"]');
        this.profileEmail = page.locator('[class*="ProfileDropdownMenu_email"]');
        this.logo = page.locator('a [data-testid="logo"]');
     }
    
    async expectProfileEmailVisible(email) {
        await this.avatarBlock.click();
        await expect(this.profileEmail).toHaveText(email, { ignoreCase: true });
    }
    async logOut() {
        await this.avatarBlock.click();
        await expect(this.profileEmail).toBeVisible();
        await this.logoutBtn.click();
        await expect(this.avatarBlock).not.toBeVisible();
    }
 };