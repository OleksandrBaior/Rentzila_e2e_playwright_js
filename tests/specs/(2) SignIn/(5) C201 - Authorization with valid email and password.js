import { test, expect } from '@playwright/test';
import { LoginPage,  } from '../../pages/loginPage';
import { HeaderPage } from '../../pages/headerPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C201 - Authorization with valid email and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const headerPage = new HeaderPage(page);

  await loginPage.navigateLoginPopUp();
  await loginPage.inputValue(loginPage.emailOrPhoneField, usersProfiles.validUser.email);
  await loginPage.inputValue(loginPage.passwordField, usersProfiles.validUser.password);
  await loginPage.clickkHiddenPasswordIcon(true);
  await loginPage.clickkHiddenPasswordIcon(false);
  await loginPage.signInBtn.click();
  await expect(loginPage.authorizationPopUp).not.toBeVisible();
  await expect(headerPage.avatarBlock).toBeVisible();

  await headerPage.expectProfileEmailVisible(usersProfiles.validUser.email)
  await headerPage.logoutBtn.click()
  await expect(headerPage.avatarBlock).not.toBeVisible();
  await headerPage.loginBtn.click();
  await expect(loginPage.authorizationPopUp).toBeVisible();
  
  await loginPage.inputValue(loginPage.emailOrPhoneField, usersProfiles.validUserUppercase.email);
  await loginPage.inputValue(loginPage.passwordField, usersProfiles.validUserUppercase.password);
  await loginPage.signInBtn.click();
  await expect(loginPage.authorizationPopUp).not.toBeVisible();
  await expect(headerPage.avatarBlock).toBeVisible();
  await headerPage.expectProfileEmailVisible(usersProfiles.validUserUppercase.email);
});

  
  

