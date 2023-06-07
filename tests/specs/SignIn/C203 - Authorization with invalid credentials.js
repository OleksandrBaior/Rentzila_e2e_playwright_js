import { test, expect } from '@playwright/test';
import { LoginPage, generalError } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C203 - Authorization with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateLoginPopUp();
  await loginPage.inputValue(loginPage.passwordField, usersProfiles.validUser.password);
  await loginPage.checkInvalidEmails();
  await loginPage.inputValue(loginPage.emailOrPhoneField, usersProfiles.notExistingUser.email);
  await loginPage.signInBtn.click();
  await loginPage.expectErrorVisible(true, loginPage.generalErrorMsg, generalError);
  await loginPage.inputValue(loginPage.emailOrPhoneField, usersProfiles.validUser.email);
  await loginPage.checkInvalidPasswords();
})

  
  
  

