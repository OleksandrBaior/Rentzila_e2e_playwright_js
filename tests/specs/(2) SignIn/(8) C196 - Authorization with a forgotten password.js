import { EmailPage } from '../../pages/emailPage';
import { test, expect } from '@playwright/test';
import { LoginPage, restoreMsg, generalError } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';
import { UpdatePasswordPage } from '../../pages/updatePasswordPage';  
import { HeaderPage } from '../../pages/headerPage';

test("C196 - Authorization with a forgotten password", async ({ page }) => {
  test.setTimeout(40000);
  const loginPage = new LoginPage(page);
  const emailPage = new EmailPage(page);
  const headerPage = new HeaderPage(page);
  const updatePasswordPage = new UpdatePasswordPage(page);

  async function updatePassword(oldPassword, newPassword) {
    await loginPage.navigateLoginPopUp();
    await loginPage.forgotPasswordBtn.click();
    await expect(loginPage.restorePasswordModal).toBeVisible();
    await loginPage.inputValue(loginPage.resetEmailOrPhoneField, usersProfiles.restorePasswordEmail.email);
    await loginPage.restorePasswordBtn.click();
    await loginPage.expectErrorVisible(true, loginPage.restorePasswordAcceptMsg, restoreMsg)  

    await emailPage.verifyEmail(usersProfiles.restorePasswordEmail.email);

    await expect(updatePasswordPage.titleForm).toBeVisible();
    await updatePasswordPage.checkInvalidPasswords();
    await updatePasswordPage.inputValue(updatePasswordPage.passwordField, newPassword);
    await updatePasswordPage.saveNewPasswordBtn.click();
    await expect(updatePasswordPage.authorizationPopUp).toBeVisible();
    await loginPage.logiIn(usersProfiles.restorePasswordEmail.email, oldPassword);
    await loginPage.expectErrorVisible(true, loginPage.generalErrorMsg, generalError);
    await loginPage.logiIn(usersProfiles.restorePasswordEmail.email, newPassword);
    await headerPage.expectProfileEmailVisible(usersProfiles.restorePasswordEmail.email);
    await headerPage.logoutBtn.click();
  }

await updatePassword(usersProfiles.restorePasswordEmail.password, usersProfiles.restorePasswordEmail.newPassword);
await updatePassword(usersProfiles.restorePasswordEmail.newPassword, usersProfiles.restorePasswordEmail.password);
  
})


  
  
  

