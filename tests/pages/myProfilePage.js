import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export const profileURL = 'https://letkabackend.click/owner-cabinet/';

export class MyProfilePage extends BasePage{
    /**
   * @param {import('@playwright/test').Page} page
   */ 
    constructor(page) {
        super(page);
        this.page = page;
        this.ownerProfileNumber = page.locator('[data-testid="input_OwnerProfileNumber"]');
        this.verificationPhoneIcon = page.locator('[data-testid="verification_OwnerProfileNumber"]');
    }

    async checkMatchValueField(field, value) {
        let valueInput = await field.inputValue()
        expect(valueInput.replace(/ +/g, "")).toContain(value);
    }
 }