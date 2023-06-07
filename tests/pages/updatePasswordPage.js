import { expect } from '@playwright/test';
import usersProfiles from '../../resourcers/usersProfiles.json';

export const textError = 'Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли';

export class UpdatePasswordPage  {
  
    /**
    * @param {import('@playwright/test').Page} page
    */
     
     constructor(page) {
         this.page = page;
         this.titleForm = page.locator('[class*= "ResetPassword_ownDataText"]');
         this.passwordField = page.locator('[data-testid="reactHookInput"]');
         this.saveNewPasswordBtn = page.locator('[data-testid="submitButton"]');
         this.errorField = page.locator('[class*="CustomReactHookInput_error_message"]');
         this.authorizationPopUp = page.locator('div[class*="Authorization_wrapper"]');
     }
     
     async inputValue(fieldLocator, value) {
        await fieldLocator.fill(value);
        await expect(fieldLocator).toHaveValue(value);
     }
    
     async expectErrorVisible(boolean, locator, textError) {
        await expect(locator).toBeVisible({ visible: boolean });
            if (boolean) {
                await expect(locator).toHaveText(textError);
            } 
     }
    async checkInvalidPasswords() {
        for (const password in usersProfiles.invalidPhoneNumberToResore) {
            await this.inputValue(this.passwordField,usersProfiles.invalidPhoneNumberToResore[password])
            await this.saveNewPasswordBtn.click()
            await this.expectErrorVisible(true, this.errorField, textError)
          }
    }
    async updatePassword(newPage, upadePasswordPage, password) {
        
        await expect(upadePasswordPage.titleForm).toBeVisible();
        await upadePasswordPage.checkInvalidPasswords();
        await upadePasswordPage.inputValue(upadePasswordPage.passwordField, password);
        await upadePasswordPage.saveNewPasswordBtn.click();
        await expect(upadePasswordPage.authorizationPopUp).toBeVisible();
        await newPage.close();
    }
  
  
 };