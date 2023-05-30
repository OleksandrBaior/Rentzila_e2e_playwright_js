import { expect } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import usersProfiles  from '../../resourcers/usersProfiles.json'

export const emptyFieldError = 'Поле не може бути порожнім';
export const emailOrPhoneError = 'Неправильний формат email або номера телефону';
export const passwordError = 'Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли';
export const generalError = 'Невірний e-mail або пароль';
export const noExistEmailToRestore = 'Користувач з таким емейлом або номером телефону не верифікований в системі';

export class LoginPage extends HeaderPage {
   /**
   * @param {import('@playwright/test').Page} page
   */ 
    constructor(page) {
        super(page);
        this.page = page;
        this.authorizationPopUp = page.locator('div[class*="Authorization_wrapper"]');
        this.signInBtn = page.locator('[class*="LoginForm_submitBtn"]');
        this.errorEmailMsg = page.locator('//form/div[1]/p')
        this.errorPasswordMsg = page.locator('//form/div[2]/div[1]/p')
        this.emailOrPhoneField = page.locator('[data-testid="reactHookInput"][name="login"]');
        this.passwordField = page.locator('[data-testid="reactHookInput"][name="password"]');
        this.generalErrorMsg = page.locator('[data-testid="errorMessage"]');
        this.restorePasswordModal = page.locator('//*[@data-testid="restorePasswordContainer"]');
        this.forgotPasswordBtn = page.locator("//div[starts-with(text(),'Забули пароль?')]");
        this.restorePasswordBtn = page.locator('[class*="RestorePasswordPopup_submitBtn"]'); 
        this.restorePasswordMsg = page.locator('form[class*="RestorePasswordPopup_form_"] p');
        this.resetEmailOrPhoneField = page.locator('//*[@id=""]');
        this.closeResetModal = page.locator('[data-testid="restorePasswordCross"] [data-testid="crossDeleteIcon"]');
        this.restoreError = page.locator('//*[@data-testid="restoreError"]'); 
        this.hiddenPasswordIcon = page.locator('//*[@data-testid="reactHookButton"]');
        this.restorePasswordPopUp = page.locator('//*[@data-testid="restorePasswordContainer"]');
    }

    async checkErrorField(LocatorError, textError) {
        expect(await LocatorError.textContent()).toEqual(textError);
    }

    /**
    * @setValueInField function sets value in the field
    * @param element Field that is selected for use
    * @param value Value that is set in the field
    */ 
    
   async verifyInvalidEmails() {
       for (const email in usersProfiles.invalidEmails) {
            await this.setValueInField(this.emailOrPhoneField, usersProfiles.invalidEmails[email])
            await this.clickElement(this.signInBtn);
            await this.checkErrorField(this.errorEmailMsg, emailOrPhoneError)
            await this.clearValueInField(this.emailOrPhoneField);
        }
   }
    
    async verifyInvalidPasswords() {
        for (const password in usersProfiles.invalidPasswords) {
            await this.setValueInField(this.passwordField, usersProfiles.invalidPasswords[password])
            await this.clickElement(this.signInBtn);
            await this.checkErrorField(this.errorPasswordMsg, passwordError)
            await this.clearValueInField(this.passwordField);
            }
    }
    async verifyInvalidPhoneNumber() {
        for (const number in usersProfiles.invalidPhoneNumber) {
            await this.setValueInField(this.emailOrPhoneField, usersProfiles.invalidPhoneNumber[number])
            await this.clickElement(this.signInBtn);
            await this.checkErrorField(this.errorEmailMsg, emailOrPhoneError)
            await this.clearValueInField(this.emailOrPhoneField);
            }
    }

    /**
    * @verifyInvalidEmailsToRestorePassword function verifies the invalid emails can not restore
    */ 
    
    async verifyInvalidEmailsToRestorePassword() {
        for (const email in usersProfiles.invalidEmails) {
            await this.setValueInField(this.resetEmailOrPhoneField, usersProfiles.invalidEmails[email])
            await this.clickElement(this.restorePasswordBtn);
            await this.checkErrorField(this.restorePasswordMsg, emailOrPhoneError)
            await this.clearValueInField(this.resetEmailOrPhoneField);
         }
    }

    async checkPaswordIsVisible() {
        await expect(this.passwordField).toHaveAttribute('type', 'text');
    }
    
    async checkPaswordIsNotVisible() {
        await expect(this.passwordField).toHaveAttribute('type', 'password');
    }
   
    async checkLoginWithValidEmails(email, password) {
        await this.clickElement(this.loginButton);
        await this.checkElementIsVisible(this.authorizationPopUp);
        await this.setValueInField(this.emailOrPhoneField, email);
        await this.setValueInField(this.passwordField, password);
        await this.clickElement(this.signInBtn);
        await this.checkElementIsNotVisible(this.authorizationPopUp)
        await this.clickElement(this.avatarBlock)
        await this.checkProfileEmailVisible(email);
        await this.clickElement(this.logoutBtn);
    }
}


