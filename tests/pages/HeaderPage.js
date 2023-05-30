import { BasePage } from './BasePage';
import { expect } from '@playwright/test';



export class HeaderPage extends BasePage {
  
    /**
    * @param {import('@playwright/test').Page} page
    */
     
    constructor(page) {
        super(page);
        this.page = page;
        this.loginButton = page.locator('div[class*="Navbar_btn_enter"]');
        this.avatarBlock = page.getByTestId('avatarBlock');
        this.logoutBtn = page.locator('//*[@data-testid="logout"]');
        this.profileEmail = page.locator('[class*="ProfileDropdownMenu_email"]');
     }
    
    async checkProfileEmailVisible(email) {
        expect(await this.profileEmail.textContent()).toContain(email.toLowerCase()); 
    }

 };