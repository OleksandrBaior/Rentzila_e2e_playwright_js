import { test, expect } from '@playwright/test';
import { LoginPage, generalError } from '../../pages/loginPage';
import { BasePage } from '../../pages/basePage';
import { HeaderPage } from '../../pages/headerPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

  test('C203 - Authorization with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const headerPage = new HeaderPage(page);

    await basePage.navigateBaseURL();
    await headerPage.loginBtn.click();
    await expect(loginPage.authorizationPopUp).toBeVisible();
    await loginPage.passwordField.fill(usersProfiles.validUser.password);
    await expect(loginPage.passwordField).toHaveValue(usersProfiles.validUser.password)
    await loginPage.checkInvalidEmails();
    await loginPage.emailOrPhoneField.fill(usersProfiles.notExistingUser.email);
    await expect(loginPage.emailOrPhoneField).toHaveValue(usersProfiles.notExistingUser.email)
    await loginPage.signInBtn.click();
    await loginPage.expectErrorVisible(true, loginPage.generalErrorMsg, generalError);
    await loginPage.emailOrPhoneField.fill(usersProfiles.validUser.email);
    await expect(loginPage.emailOrPhoneField).toHaveValue(usersProfiles.validUser.email)
    await loginPage.checkInvalidPasswords();
  })

  
  
  

