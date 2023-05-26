import { test } from '@playwright/test';
import { LoginPage } from '../pageObject/LoginPage';
import usersProfiles from '../../resourcers/usersProfiles.json'

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.LoginNavigate();
  await login.clickElement(login.loginButton);
});

test('C200 - Authorization with empty fields', async ({ page }) => {
  const login = new LoginPage(page);
  await login.checkElementIsVisible(login.authorizationPopUp);
  await login.clickElement(login.signInBtn);
  await login.checkErrorEmptyFieldDisplayed(login.errorEmail);
  await login.checkErrorEmptyFieldDisplayed(login.errorPassword);
  await login.setValueInField(login.emailOrPhoneField, usersProfiles.validUser.email);
  await login.checkElementIsNotVisible(login.errorEmail);
  await login.checkErrorEmptyFieldDisplayed(login.errorPassword);
  await login.clickElement(login.signInBtn);
  await login.checkErrorEmptyFieldDisplayed(login.errorPassword);
  await login.checkElementIsVisible(login.authorizationPopUp);
  await login.clearValueInField(login.emailOrPhoneField);
  await login.checkErrorEmptyFieldDisplayed(login.errorEmail);
  await login.setValueInField(login.passwordField, usersProfiles.validUser.password);
  await login.checkElementIsNotVisible(login.errorPassword);
  await login.clickElement(login.signInBtn);
  await login.checkElementIsVisible(login.authorizationPopUp);
});

test('C203 - Authorization with invalid credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.setValueInField(login.passwordField, usersProfiles.validUser.password);
  await login.verifyInvalidEmails();
  await login.setValueInField(login.emailOrPhoneField, usersProfiles.validUser.email);
  await login.verifyInvalidPasswords();
  await login.setValueInField(login.passwordField, usersProfiles.notExistingUser.password);
  await login.clickElement(login.signInBtn);
  await login.checkErrorInvalidEmailOrPassword();
});

test('C207 - Authorization with invalid phone', async ({ page }) => {
  const login = new LoginPage(page);
  await login.setValueInField(login.passwordField, usersProfiles.validUser.password);
  await login.verifyInvalidPhoneNumber();
});

test('C199 - Reset the password with invalid email', async ({ page }) => {
  const login = new LoginPage(page);
  await login.clickElement(login.forgotPasswordBtn);
  await login.checkElementIsVisible(login.restorePasswordModal);
  await login.clickElement(login.restorePasswordBtn);
  await login.checkErrorEmptyFieldDisplayed(login.restorePasswordMsg)
  await login.setValueInField(login.resetEmailOrPhoneField, usersProfiles.validUser.email);
  await login.clickElement(login.closeResetModal);
  await login.clickElement(login.forgotPasswordBtn);
  await login.verifyInvalidEmailsToRestorePassword();
  await login.setValueInField(login.resetEmailOrPhoneField, usersProfiles.notExistingUser.email);
  await login.clickElement(login.restorePasswordBtn);
  await login.checkRestoreErrorNoExistEmail();
});

test('C201 - Authorization with valid email and password', async ({ page }) => {
  const login = new LoginPage(page);
  await login.setValueInField(login.emailOrPhoneField, usersProfiles.validUser.email);
  await login.setValueInField(login.passwordField, usersProfiles.validUser.password);
  await login.clickElement(login.hiddenPasswordIcon);
  await login.checkPaswordIsVisible();
  await login.clickElement(login.hiddenPasswordIcon);
  await login.checkPaswordIsNotVisible();
  await login.clickElement(login.signInBtn);
  await login.checkElementIsNotVisible(login.authorizationPopUp);
  await login.clickElement(login.avatarBlock);
  await login.ckeckProfileEmailVisible(usersProfiles.validUser.email);
  await login.clickElement(login.logoutBtn);
  // await login.checkLoginWithValidEmails(usersProfiles.validUserUppercase.email, usersProfiles.validUserUppercase.password);

  // Clarify test cases
  // await login.checkLoginWithValidEmails(usersProfiles.validUserWithSpaceBegin.email, usersProfiles.validUserWithSpaceBegin.password)
  // await login.checkLoginWithValidEmails(usersProfiles.validUserWithSpaceBEnd.email, usersProfiles.validUserWithSpaceBEnd.password)

});