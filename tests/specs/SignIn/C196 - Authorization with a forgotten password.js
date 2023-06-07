import { EmailPage } from '../../pages/emailPage';
import { test, expect } from '@playwright/test';
import { LoginPage, restoreMsg } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';
import { UpdatePasswordPage } from '../../pages/updatePasswordPage';  

test("C196 - Authorization with a forgotten password", async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  const emailPage = new EmailPage(page);
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
  await expect(emailPage.spanBtn).toBeVisible();
  await emailPage.spanBtn.click();
  await emailPage.lastResetLetter.first().click();
  await expect(emailPage.changePassword).toBeVisible();
  await page.keyboard.down('End') 
    
  const pagePromise = context.waitForEvent('page');
  await emailPage.changePassword.click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState('networkidle');
  const upadePasswordPage = new UpdatePasswordPage(newPage);
  await expect(upadePasswordPage.titleForm).toBeVisible();
  
    
  await upadePasswordPage.checkInvalidPasswords();
    // await newPage.locator('[data-testid="reactHookInput"]').fill(usersProfiles.validUser.newPassword);
    // await expect(newPage.locator('[data-testid="reactHookInput"]')).toHaveValue(usersProfiles.validUser.newPassword);
    // await newPage.locator('[data-testid="submitButton"]').click();
    // await expect(loginPage.authorizationPopUp).toBeVisible();
    // await loginPage.emailOrPhoneField.fill(usersProfiles.validUser.email)
    // await expect(loginPage.emailOrPhoneField).toHaveValue(usersProfiles.validUser.email)
    // await loginPage.passwordField.fill(usersProfiles.validUser.password)
    // await expect(loginPage.passwordField).toHaveValue(usersProfiles.validUser.newPassword)
    // await loginPage.signInBtn.click();
  })

  
  
  

