import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BasePage } from '../../pages/basePage';
import { HeaderPage } from '../../pages/headerPage';
import { MyProfilePage, profileURL } from '../../pages/myProfilePage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

  test('C202 - Authorization with valid phone and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const headerPage = new HeaderPage(page);
    const myProfilePage = new MyProfilePage(page);

    await basePage.navigateBaseURL();
    await headerPage.loginBtn.click();
    await expect(loginPage.authorizationPopUp).toBeVisible();
    await loginPage.emailOrPhoneField.fill(usersProfiles.validUser.phoneNumber)
    await expect(loginPage.emailOrPhoneField).toHaveValue(usersProfiles.validUser.phoneNumber)
    await loginPage.passwordField.fill(usersProfiles.validUser.password)
    await expect(loginPage.passwordField).toHaveValue(usersProfiles.validUser.password)
    await loginPage.signInBtn.click();
    await expect(loginPage.authorizationPopUp).not.toBeVisible();
    await expect(headerPage.avatarBlock).toBeVisible();
    await headerPage.avatarBlock.click();
    await expect(headerPage.profileEmail).toHaveText(usersProfiles.validUser.email);
    await headerPage.profileBtn.click();
    await expect(page).toHaveURL(profileURL);
    await expect(myProfilePage.verificationPhoneIcon).toBeVisible();
    await myProfilePage.checkProfilePhoneNumber(myProfilePage.ownerProfileNumber, usersProfiles.validUser.phoneNumber)
  });

  
  

