import { expect } from '@playwright/test';
import usersProfiles  from '../../resourcers/usersProfiles.json'

export const emptyFieldError = 'Поле не може бути порожнім';
export const emailOrPhoneError = 'Неправильний формат email або номера телефону';
export const passwordError = 'Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли';
export const passwordErrorLess8Chars = 'Будь ласка, введіть як мінімум 8 символів';
export const generalError = 'Невірний e-mail або пароль';
export const noExistEmailToRestore = 'Користувач з таким емейлом або номером телефону не верифікований в системі';
export const restoreMsg = 'На Ваш е-mail надіслані подальші інструкції по відновленню пароля від акаунта'
export const authorizationGoogleURL = 'https://accounts.google.com/';
export const userRegistratedError = 'Профіль з таким емейлом вже існує';

export class LoginPage {
   /**
   * @param {import('@playwright/test').Page} page
   */ 
    constructor(page) {
        this.page = page;
        this.authorizationPopUp = page.locator('div[class*="Authorization_wrapper"]');
        this.signInBtn = page.locator('[class*="LoginForm_submitBtn"]');
        this.errorEmailMsg = page.locator('//form/div[1]/p')
        this.errorPasswordMsg = page.locator('//form/div[2]/div[1]/p')
        this.errorInvalidPassword = page.locator('//form/div[3]/div[1]/p')
        this.emailOrPhoneField = page.locator('[data-testid="reactHookInput"][name="login"]');
        this.passwordField = page.locator('[data-testid="reactHookInput"][name="password"]');
        this.generalErrorMsg = page.locator('[data-testid="errorMessage"]');
        this.restorePasswordModal = page.locator('//*[@data-testid="restorePasswordContainer"]');
        this.forgotPasswordBtn = page.locator("//div[starts-with(text(),'Забули пароль?')]");
        this.restorePasswordBtn = page.locator('button[class*="RestorePassword"]'); 
        this.restorePasswordMsg = page.locator('form[class*="RestorePasswordPopup_form_"] p');
        this.resetEmailOrPhoneField = page.locator('//*[@id=""]');
        this.closeResetModal = page.locator('[data-testid="restorePasswordCross"] [data-testid="crossDeleteIcon"]');
        this.restoreError = page.locator('//*[@data-testid="restoreError"]'); 
        this.hiddenPasswordIcon = page.locator('//*[@data-testid="reactHookButton"]');
        this.restorePasswordPopUp = page.locator('//*[@data-testid="restorePasswordContainer"]');
        this.authorizationGoogleBtn = page.locator('[class*="AuthorizationGoogle_button"]');
        this.emailGoogleField = page.locator('#identifierId');
        this.nextGoogleBtn = page.getByRole('button', { name: 'Next' })
        this.passwordGoogleField = page.getByRole('textbox', { name: 'Enter your password' });
        this.restorePasswordAcceptMsg = page.locator('[class*="RestorePasswordAcceptancePopup_content"]');
        this.loginBtn = page.locator('div[class*="Navbar_btn_enter"]');
        this.registrationNoAccountBtn = page.locator('[data-testid="switcher"]');
        this.registrationBtn = page.locator('[class*="LoginForm_submitBtn"]');
        this.errorRegistrationPasswordMsg = page.locator('//form/div[2]/p');
        this.errorRegistrationEmailMsg = page.locator('//form/div[1]/p');
        this.userRegistratedError = page.locator('[class*="LoginForm_error"]');
    }

    async navigateLoginPopUp() {
        await this.page.goto('');
        await this.page.waitForLoadState('networkidle');
        await this.loginBtn.click();
        await expect(this.authorizationPopUp).toBeVisible();
    }
    async inputValue(fieldLocator, value) {
        await fieldLocator.fill(value);
        await expect(fieldLocator).toHaveValue(value);
    }
    async clickForgotPasswordBtn() {
        await this.forgotPasswordBtn.click();
        await expect(this.restorePasswordModal).toBeVisible();
    }
    async clickkHiddenPasswordIcon({visiblePassword: boolean}) {
        if ({visiblePassword: true}) {
            await this.hiddenPasswordIcon.click()
            await expect(this.passwordField).toHaveAttribute('type', 'text');
        if ({visiblePassword: false}) {
            await this.hiddenPasswordIcon.click()
            await expect(this.passwordField).toHaveAttribute('type', 'password');
            }
        }
    }
    async expectErrorVisible(boolean, locator, textError) {
        await expect(locator).toBeVisible({ visible: boolean });
            if (boolean) {
                await expect(locator).toHaveText(textError);
            } 
    }
    async checkInvalidEmails() {
        for (const email in usersProfiles.invalidEmails) {
            await this.emailOrPhoneField.fill(usersProfiles.invalidEmails[email]);
            await this.signInBtn.click();
            await this.expectErrorVisible(true, this.errorEmailMsg, emailOrPhoneError);   
        }
    }   
    async checkInvalidPasswords() {
        for (const password in usersProfiles.invalidPasswords) {
            await this.passwordField.fill(usersProfiles.invalidPasswords[password]);
            await this.signInBtn.click();
            await this.expectErrorVisible(true, this.errorInvalidPassword, passwordError);   
        }
    }
    async checkInvalidPhone() {
        for (const phone in usersProfiles.invalidPhoneNumber) {
            await this.emailOrPhoneField.fill(usersProfiles.invalidPhoneNumber[phone]);
            await this.signInBtn.click();
            await this.expectErrorVisible(true, this.errorEmailMsg, emailOrPhoneError);   
        }
    }
    async checkInvalidEmailsToRestorePassword() {
        for (const email in usersProfiles.invalidPhoneNumber) {
            await this.resetEmailOrPhoneField.fill(usersProfiles.invalidPhoneNumber[email]);
            await this.restorePasswordBtn.click();
            await this.expectErrorVisible(true, this.restorePasswordMsg, emailOrPhoneError);   
        }
    }
    async logiIn(emailOrPhone, password) {
        await this.inputValue(this.emailOrPhoneField, emailOrPhone);
        await this.inputValue(this.passwordField, password);
        await this.signInBtn.click();
    }
   
}




