import { test, expect } from '@playwright/test';
import { LoginPage,  } from '../../pages/loginPage';
import { BasePage } from '../../pages/basePage';
import { HeaderPage } from '../../pages/headerPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';


  test('C201 - Authorization with valid email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const headerPage = new HeaderPage(page);

    await basePage.navigateBaseURL();
    await headerPage.loginBtn.click();
    await expect(loginPage.authorizationPopUp).toBeVisible();
    await loginPage.emailOrPhoneField.fill(usersProfiles.validUser.email)
    await expect(loginPage.emailOrPhoneField).toHaveValue(usersProfiles.validUser.email)
    await loginPage.passwordField.fill(usersProfiles.validUser.password)
    await expect(loginPage.passwordField).toHaveValue(usersProfiles.validUser.password)
    await loginPage.hiddenPasswordIcon.click()
    await expect(loginPage.passwordField).toHaveAttribute('type', 'text');
    await loginPage.hiddenPasswordIcon.click()
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
    await loginPage.signInBtn.click();
    await expect(loginPage.authorizationPopUp).not.toBeVisible();
    await expect(headerPage.avatarBlock).toBeVisible();
    await headerPage.avatarBlock.click();
    await expect(headerPage.profileEmail).toHaveText(usersProfiles.validUser.email);
    await headerPage.logoutBtn.click()
    await expect(headerPage.avatarBlock).not.toBeVisible();
    await headerPage.loginBtn.click();
    await expect(loginPage.authorizationPopUp).toBeVisible();
    await loginPage.emailOrPhoneField.fill(usersProfiles.validUserUppercase.email)
    await expect(loginPage.emailOrPhoneField).toHaveValue(usersProfiles.validUserUppercase.email)
    await loginPage.passwordField.fill(usersProfiles.validUser.password)
    await expect(loginPage.passwordField).toHaveValue(usersProfiles.validUser.password)
    await loginPage.signInBtn.click();
    await expect(headerPage.avatarBlock).toBeVisible();
    await headerPage.avatarBlock.click();
    await expect(headerPage.profileEmail).toHaveText(usersProfiles.validUser.email, {ignoreCase: true});
  });

  
  

