import { EmailPage } from '../../pages/emailPage';
import { test, expect } from '@playwright/test';
import { LoginPage, restoreMsg } from '../../pages/loginPage';
import { BasePage } from '../../pages/basePage';
import { HeaderPage } from '../../pages/headerPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

  test("C196 - Authorization with a forgotten password", async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const headerPage = new HeaderPage(page);
    const emailPage = new EmailPage(page);

    await basePage.navigateBaseURL();
    await headerPage.loginBtn.click();
    await expect(loginPage.authorizationPopUp).toBeVisible();
    await loginPage.forgotPasswordBtn.click();
    await expect(loginPage.restorePasswordModal).toBeVisible();
    await loginPage.resetEmailOrPhoneField.fill(usersProfiles.tutanotaEmail.email);
    await expect(loginPage.resetEmailOrPhoneField).toHaveValue(usersProfiles.tutanotaEmail.email);
    await loginPage.restorePasswordBtn.click();
    await expect(loginPage.restorePasswordAcceptMsg).toHaveText(restoreMsg);
    await expect(loginPage.restorePasswordAcceptMsg).toBeVisible();
    
    await page.goto(emailPage.emailUrl);
    await emailPage.emailLogIn.fill(usersProfiles.tutanotaEmail.email);
    await expect(emailPage.emailLogIn).toHaveValue(usersProfiles.tutanotaEmail.email);
    await emailPage.passwordLogIn.fill(usersProfiles.tutanotaEmail.password);
    await expect(emailPage.passwordLogIn).toHaveValue(usersProfiles.tutanotaEmail.password);
    await emailPage.logInBtn.click();
    await expect(emailPage.spanBtn).toBeVisible();
    await emailPage.spanBtn.click();
    await emailPage.lastResetLetter.first().click();
    await expect(emailPage.changePassword).toBeVisible();
    
    const pagePromise = context.waitForEvent('page');
    await page.getByRole('link', { name: 'Змінити пароль' }).click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState('networkidle');

    await expect(newPage.locator('[class*= "ResetPassword_ownDataText"]')).toBeVisible();
    await expect(newPage.locator('[class*= "ResetPassword_ownDataText"]')).toHaveText('Зміна або відновлення пароля');
      for (const phoneNumber in usersProfiles.invalidPhoneNumberToResore) {
        await newPage.locator('[data-testid="reactHookInput"]').fill(usersProfiles.invalidPhoneNumberToResore[phoneNumber]);
        await expect(newPage.locator('[data-testid="reactHookInput"]')).toHaveValue(usersProfiles.invalidPhoneNumberToResore[phoneNumber]);
        await newPage.locator('[data-testid="submitButton"]').click();
        await expect(newPage.locator('[class*="CustomReactHookInput_error_message"]')).toBeVisible();
        await expect(newPage.locator('[class*="CustomReactHookInput_error_message"]')).toHaveText('Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли')
      }
    await newPage.locator('[data-testid="reactHookInput"]').fill(usersProfiles.validUser.newPassword);
    await expect(newPage.locator('[data-testid="reactHookInput"]')).toHaveValue(usersProfiles.validUser.newPassword);
    await newPage.locator('[data-testid="submitButton"]').click();
    // await expect(loginPage.authorizationPopUp).toBeVisible();
    // await loginPage.emailOrPhoneField.fill(usersProfiles.validUser.email)
    // await expect(loginPage.emailOrPhoneField).toHaveValue(usersProfiles.validUser.email)
    // await loginPage.passwordField.fill(usersProfiles.validUser.password)
    // await expect(loginPage.passwordField).toHaveValue(usersProfiles.validUser.newPassword)
    // await loginPage.signInBtn.click();
  })

  
  
  

