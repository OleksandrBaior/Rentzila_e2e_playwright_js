import { EmailPage } from '../../pages/emailPage';
import { test, expect } from '@playwright/test';
import { LoginPage, restoreMsg, generalError } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';
import { UpdatePasswordPage } from '../../pages/updatePasswordPage';  
import { HeaderPage } from '../../pages/headerPage';

test("C196 - Authorization with a forgotten password", async ({ page, context }) => {
  test.setTimeout(32000);
  const loginPage = new LoginPage(page);
  const emailPage = new EmailPage(page);
  const headerPage = new HeaderPage(page);

  await loginPage.navigateLoginPopUp();
  await loginPage.forgotPasswordBtn.click();
  await expect(loginPage.restorePasswordModal).toBeVisible();
  await loginPage.inputValue(loginPage.resetEmailOrPhoneField, usersProfiles.tutanotaEmail.email);
  await loginPage.restorePasswordBtn.click();
  await loginPage.expectErrorVisible(true, loginPage.restorePasswordAcceptMsg, restoreMsg)  

  await page.goto(emailPage.emailUrl);
  await page.waitForLoadState('networkidle');
  await loginPage.inputValue(emailPage.emailLogIn, usersProfiles.tutanotaEmail.email);
  await loginPage.inputValue(emailPage.passwordLogIn, usersProfiles.tutanotaEmail.password);
  await emailPage.logInBtn.click();
  await expect(emailPage.spanBtn).toBeVisible({timeout: 7000});
  await emailPage.spanBtn.click();
  await emailPage.lastResetLetter.first().click();
  await expect(emailPage.changePassword).toBeVisible();
  await page.keyboard.down('End'); 
  const pagePromise = context.waitForEvent('page');
  await emailPage.changePassword.click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState('networkidle');
  const upadePasswordPage = new UpdatePasswordPage(newPage);
  await upadePasswordPage.updatePassword(newPage, upadePasswordPage, usersProfiles.tutanotaEmail.newPassword)
  

  await loginPage.navigateLoginPopUp();
  await loginPage.logiIn(usersProfiles.tutanotaEmail.email, usersProfiles.tutanotaEmail.password)
  await loginPage.expectErrorVisible(true, loginPage.generalErrorMsg, generalError);
  await loginPage.logiIn(usersProfiles.tutanotaEmail.email, usersProfiles.tutanotaEmail.newPassword)
  await headerPage.expectProfileEmailVisible(usersProfiles.tutanotaEmail.email)


  
  })

  
  
  

