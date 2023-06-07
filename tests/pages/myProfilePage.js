import { expect } from '@playwright/test';

export const profileURL = 'https://letkabackend.click/owner-cabinet/';

export class MyProfilePage {
    /**
   * @param {import('@playwright/test').Page} page
   */ 
    constructor(page) {
        this.page = page;
        this.ownerProfileNumber = page.locator('[data-testid="input_OwnerProfileNumber"]');
        this.verificationPhoneIcon = page.locator('[data-testid="verification_OwnerProfileNumber"]');
    }

    async checkProfilePhoneNumber(locator, value) {
        let valueInput = await locator.inputValue()
        expect(valueInput.replace(/ +/g, "")).toContain(value);
    }
 }