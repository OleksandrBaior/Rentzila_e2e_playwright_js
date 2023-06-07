import { test, expect } from '@playwright/test';
import { LoginPage, emptyFieldError, noExistEmailToRestore } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C199 - Restore the password with invalid email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateLoginPopUp();
  await loginPage.clickForgotPasswordBtn()
  await loginPage.restorePasswordBtn.click();
  await loginPage.expectErrorVisible(true, loginPage.restorePasswordMsg, emptyFieldError);
  await loginPage.inputValue(loginPage.resetEmailOrPhoneField, usersProfiles.validUser.email);
  await loginPage.closeResetModal.click();
  await expect(loginPage.restorePasswordModal).not.toBeVisible(); 
  await loginPage.clickForgotPasswordBtn();
  await loginPage.checkInvalidEmailsToRestorePassword();
  await loginPage.inputValue(loginPage.resetEmailOrPhoneField, usersProfiles.notExistingUser.email);
  await loginPage.restorePasswordBtn.click();
  await loginPage.expectErrorVisible(true, loginPage.restoreError, noExistEmailToRestore);
});

  
  
  

