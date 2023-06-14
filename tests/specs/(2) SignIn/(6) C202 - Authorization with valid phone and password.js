import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { HeaderPage } from '../../pages/headerPage';
import { MyProfilePage, profileURL } from '../../pages/myProfilePage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C202 - Authorization with valid phone and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const headerPage = new HeaderPage(page);
  const myProfilePage = new MyProfilePage(page);

  async function authorizationWithValidPhones(validPhone) {
    await loginPage.navigateLoginPopUp();

    await loginPage.inputValue(loginPage.emailOrPhoneField, validPhone);
    await loginPage.inputValue(loginPage.passwordField, usersProfiles.validUser.password);
    await loginPage.signInBtn.click();
    await expect(loginPage.authorizationPopUp).not.toBeVisible();
    await expect(headerPage.avatarBlock).toBeVisible();

    await headerPage.expectProfileEmailVisible(usersProfiles.validUser.email)
    await headerPage.profileBtn.click();
    await expect(page).toHaveURL(profileURL);
    await expect(myProfilePage.verificationPhoneIcon).toBeVisible();
    await myProfilePage.checkProfilePhoneNumber(myProfilePage.ownerProfileNumber, validPhone)

    await headerPage.logOut();
  }
  await authorizationWithValidPhones(usersProfiles.validUser.phoneNumber);
  await authorizationWithValidPhones(usersProfiles.validUser.phoneNumber1);
  await authorizationWithValidPhones(usersProfiles.validUser.phoneNumber2);
  });

  
  

