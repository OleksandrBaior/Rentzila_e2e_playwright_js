import { test, expect } from '@playwright/test';
import { LoginPage, emptyFieldError, noExistEmailToRestore } from '../../pages/loginPage';
import { BasePage } from '../../pages/basePage';
import { HeaderPage } from '../../pages/headerPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

  test('C199 - Restore the password with invalid email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const headerPage = new HeaderPage(page);
    
    await basePage.navigateBaseURL();
    await headerPage.loginBtn.click();
    await expect(loginPage.authorizationPopUp).toBeVisible();
    await loginPage.forgotPasswordBtn.click();
    await expect(loginPage.restorePasswordModal).toBeVisible();  
    await loginPage.restorePasswordBtn.click();
    await loginPage.expectErrorVisible(true, loginPage.restorePasswordMsg, emptyFieldError);
    await loginPage.resetEmailOrPhoneField.fill(usersProfiles.validUser.email)
    await expect(loginPage.resetEmailOrPhoneField).toHaveValue(usersProfiles.validUser.email)
    await loginPage.closeResetModal.click();
    await expect(loginPage.restorePasswordModal).not.toBeVisible();  
    await loginPage.forgotPasswordBtn.click();
    await expect(loginPage.restorePasswordModal).toBeVisible(); 
    await loginPage.checkInvalidEmailsToRestorePassword();
    await loginPage.resetEmailOrPhoneField.fill(usersProfiles.notExistingUser.email);
    await expect(loginPage.resetEmailOrPhoneField).toHaveValue(usersProfiles.notExistingUser.email);
    await loginPage.restorePasswordBtn.click();
    await loginPage.expectErrorVisible(true, loginPage.restoreError, noExistEmailToRestore);
  });

  
  
  

