import { test } from '@playwright/test';
import { LoginPage, emptyFieldError, generalError, noExistEmailToRestore} from '../pages/loginPage';
import { BasePage } from '../pages/basePage';
import { HeaderPage } from '../pages/headerPage';
import { MyProfilePage, profileURL } from '../pages/myProfilePage';
import usersProfiles from '../../resourcers/usersProfiles.json';

test('C200 - Authorization with empty fields', async ({ page }) => {
  const login = new LoginPage(page);
  const base = new BasePage(page);
  const header = new HeaderPage(page);

  await base.navigateToMainPage();
  await header.clickElement(header.loginButton);
  await login.checkElementIsVisible(login.authorizationPopUp);
  await login.clickElement(login.signInBtn);
  await login.checkErrorField(login.errorEmailMsg, emptyFieldError)
  await login.checkErrorField(login.errorPasswordMsg, emptyFieldError)
  await login.setValueInField(login.emailOrPhoneField, usersProfiles.validUser.email);
  await login.checkElementIsNotVisible(login.errorEmailMsg);
  await login.checkErrorField(login.errorPasswordMsg, emptyFieldError)
  await login.clickElement(login.signInBtn);
  await login.checkErrorField(login.errorPasswordMsg, emptyFieldError)
  await login.checkElementIsVisible(login.authorizationPopUp);
  await login.clearValueInField(login.emailOrPhoneField);
  await login.checkErrorField(login.errorEmailMsg, emptyFieldError)
  await login.setValueInField(login.passwordField, usersProfiles.validUser.password);
  await login.checkElementIsNotVisible(login.errorPasswordMsg);
  await login.clickElement(login.signInBtn);
  await login.checkElementIsVisible(login.authorizationPopUp);
});

test('C203 - Authorization with invalid credentials', async ({ page }) => {
  const login = new LoginPage(page);
  const base = new BasePage(page);
  const header = new HeaderPage(page);

  await base.navigateToMainPage();
  await header.clickElement(header.loginButton);
  await login.setValueInField(login.passwordField, usersProfiles.validUser.password);
  await login.verifyInvalidEmails();
  await login.setValueInField(login.emailOrPhoneField, usersProfiles.validUser.email);
  await login.verifyInvalidPasswords();
  await login.setValueInField(login.passwordField, usersProfiles.notExistingUser.password);
  await login.clickElement(login.signInBtn);
  await login.checkErrorField(login.generalErrorMsg, generalError);
});

test('C207 - Authorization with invalid phone', async ({ page }) => {
  const login = new LoginPage(page);
  const base = new BasePage(page);
  const header = new HeaderPage(page);
  
  await base.navigateToMainPage();
  await header.clickElement(header.loginButton);
  await login.setValueInField(login.passwordField, usersProfiles.validUser.password);
  await login.verifyInvalidPhoneNumber();
});

test('C199 - Restore the password with invalid email', async ({ page }) => {
  const login = new LoginPage(page);
  const base = new BasePage(page);
  const header = new HeaderPage(page);
  
  await base.navigateToMainPage();
  await header.clickElement(header.loginButton);
  await login.clickElement(login.forgotPasswordBtn);
  await login.checkElementIsVisible(login.restorePasswordModal);
  await login.clickElement(login.restorePasswordBtn);
  await login.checkErrorField(login.restorePasswordMsg, emptyFieldError)
  await login.setValueInField(login.resetEmailOrPhoneField, usersProfiles.validUser.email);
  await login.clickElement(login.closeResetModal);
  await login.checkElementIsNotVisible(login.restorePasswordPopUp);
  await login.clickElement(login.forgotPasswordBtn);
  await login.verifyInvalidEmailsToRestorePassword();
  await login.setValueInField(login.resetEmailOrPhoneField, usersProfiles.notExistingUser.email);
  await login.clickElement(login.restorePasswordBtn);
  await login.checkErrorField(login.restoreError, noExistEmailToRestore )
});

test('C201 - Authorization with valid email and password', async ({ page }) => {
  const login = new LoginPage(page);
  const base = new BasePage(page);
  const header = new HeaderPage(page);
  
  await base.navigateToMainPage();
  await header.clickElement(header.loginButton);
  await login.checkElementIsVisible(login.authorizationPopUp);
  await login.setValueInField(login.emailOrPhoneField, usersProfiles.validUser.email);
  await login.setValueInField(login.passwordField, usersProfiles.validUser.password);
  await login.clickElement(login.hiddenPasswordIcon);
  await login.checkPaswordIsVisible();
  await login.clickElement(login.hiddenPasswordIcon);
  await login.checkPaswordIsNotVisible();
  await login.clickElement(login.signInBtn);
  await login.checkElementIsNotVisible(login.authorizationPopUp);
  await header.clickElement(header.avatarBlock);
  await login.checkProfileEmailVisible(usersProfiles.validUser.email);
  await header.clickElement(header.logoutBtn);
  await login.checkLoginWithValidEmails(usersProfiles.validUserUppercase.email, usersProfiles.validUserUppercase.password);
});

test('C202 -  Authorization with valid phone and password', async ({ page }) => {
  const login = new LoginPage(page);
  const base = new BasePage(page);
  const header = new HeaderPage(page);
  const myProfile = new MyProfilePage(page);

  await base.navigateToMainPage();
  await header.clickElement(header.loginButton);
  await login.checkElementIsVisible(login.authorizationPopUp);
  await login.setValueInField(login.emailOrPhoneField, usersProfiles.validUser.phoneNumber);
  await base.checkElementIsNotVisible(login.errorEmailMsg)
  await login.setValueInField(login.passwordField, usersProfiles.validUser.password);
  await login.clickElement(login.signInBtn);
  await login.checkElementIsNotVisible(login.authorizationPopUp);
  await header.checkElementIsVisible(header.avatarBlock)
  await header.clickElement(header.avatarBlock);
  await header.clickElement(header.profileBtn);
  await myProfile.checkURL(profileURL);
  await myProfile.checkElementIsVisible(myProfile.verificationPhoneIcon)
  await myProfile.checkMatchValueField(myProfile.ownerProfileNumber, usersProfiles.validUser.phoneNumber)
  
  
  // Clarify test cases in the TeasRail
  // Log out and repeat test case with valid phone:
  // 380506743058
  // 0506743057
});