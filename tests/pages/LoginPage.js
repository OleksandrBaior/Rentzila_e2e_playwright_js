import { expect } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import usersProfiles  from '../../resourcers/usersProfiles.json'


const emptyFieldError = 'Поле не може бути порожнім';
const emailOrPhoneError = 'Неправильний формат email або номера телефону';
const passwordError = 'Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли';
const emailPasswordError = 'Невірний e-mail або пароль';
const noExistEmailToRestore = 'Користувач з таким емейлом або номером телефону не верифікований в системі';

export class LoginPage extends HeaderPage {
   /**
   * @param {import('@playwright/test').Page} page
   */ 
    constructor(page) {
        super(page);
        this.page = page;
        this.authorizationPopUp = page.locator('div[class*="Authorization_wrapper"]');
        this.signInBtn = page.getByRole('button', { name: 'Увійти', exact: true });
        this.errorPassword = page.getByTestId('authorizationContainer').locator('form div').filter({ hasText: 'Пароль Поле не може бути порожнімЗабули пароль?' }).getByRole('alert')
        this.errorEmail = page.getByTestId('authorizationContainer').locator('form div').filter({ hasText: 'E-mail або номер телефону Поле не може бути порожнім' }).getByRole('alert')
        this.errorInvalidEmailMsg = page.getByText('Неправильний формат email або номера телефону')
        this.errorInvalidPasswordMsg = page.getByText('Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, тако')
        this.emailOrPhoneField = page.getByLabel('E-mail або номер телефону');
        this.passwordField = page.getByLabel('Пароль');
        this.generalErrorMsg = page.getByTestId('errorMessage');
        this.restorePasswordModal = page.locator('//*[@data-testid="restorePasswordContainer"]');
        this.forgotPasswordBtn = page.locator("//div[starts-with(text(),'Забули пароль?')]");
        this.restorePasswordBtn = page.locator('[class*="RestorePasswordPopup_submitBtn"]'); 
        this.restorePasswordMsg = page.locator('[class*="CustomReactHookInput_error_message"]');
        this.resetEmailOrPhoneField = page.locator('//*[@id=""]');
        this.closeResetModal = page.locator('[class*="RestorePasswordPopup_cross"] svg');
        this.restoreError = page.locator('//*[@data-testid="restoreError"]'); 
        this.hiddenPasswordIcon = page.locator('//*[@data-testid="reactHookButton"]');
        this.profileEmail = page.locator('[class*="ProfileDropdownMenu_email"]');
        this.restorePasswordPopUp = page.locator('//*[@data-testid="restorePasswordContainer"]');
    }
   
    async clickElement(locator) {
        await locator.click();
    }
    async checkElementIsVisible(element) {
        await expect(element).toBeVisible();
    }
    async checkElementIsNotVisible(element) {
        await expect(element).not.toBeVisible();
    }
    async checkErrorEmptyFieldDisplayed(locator) {
        expect(await locator.textContent()).toEqual(emptyFieldError);
    }
    async checkErrorEmailOrPhoneIsDisplayed(locator) {
        expect(await locator.textContent()).toEqual(emailOrPhoneError);
    }
    async checkErrorPasswordIsDisplayed() {
        expect(await this.errorInvalidPasswordMsg.textContent()).toEqual(passwordError);
    }
    async checkErrorInvalidEmailOrPasswordDisplayed() {
        expect(await this.generalErrorMsg.textContent()).toEqual(emailPasswordError);
    }
    async checkRestoreErrorNoExistEmailDisplayed() {
        expect(await this.restoreError.textContent()).toEqual(noExistEmailToRestore);
    }
    /**
    * @setValueInField funtion sets value in the field
    * @param element Field that is selected for use
    * @param value Value that is set in the field
    */ 
    async setValueInField(element, value) {
        await element.fill(value);
    }
    async clearValueInField(locator) {
        await locator.clear();
    }
   async verifyInvalidEmails() {
       for (const email in usersProfiles.invalidEmails) {
            await this.setValueInField(this.emailOrPhoneField, usersProfiles.invalidEmails[email])
            await this.clickElement(this.signInBtn);
            await this.checkErrorEmailOrPhoneIsDisplayed(this.errorInvalidEmailMsg);
            await this.clearValueInField(this.emailOrPhoneField);
        }
    }
    async verifyInvalidPasswords() {
        for (const password in usersProfiles.invalidPasswords) {
            await this.setValueInField(this.passwordField, usersProfiles.invalidPasswords[password])
            await this.clickElement(this.signInBtn);
            await this.checkErrorPasswordIsDisplayed();
            await this.clearValueInField(this.passwordField);
            }
    }
    async verifyInvalidPhoneNumber() {
        for (const number in usersProfiles.invalidPhoneNumber) {
            await this.setValueInField(this.emailOrPhoneField, usersProfiles.invalidPhoneNumber[number])
            await this.clickElement(this.signInBtn);
            await this.checkErrorEmailOrPhoneIsDisplayed(this.errorInvalidEmailMsg)
            await this.clearValueInField(this.emailOrPhoneField);
            }
    }
    async verifyInvalidEmailsToRestorePassword() {
        for (const email in usersProfiles.invalidEmails) {
            await this.setValueInField(this.resetEmailOrPhoneField, usersProfiles.invalidEmails[email])
            await this.clickElement(this.restorePasswordBtn);
            await this.checkErrorEmailOrPhoneIsDisplayed(this.restorePasswordMsg);
            await this.clearValueInField(this.emailOrPhoneField);
         }
    }
    async checkPaswordIsVisible() {
        await expect(this.passwordField).toHaveValue(usersProfiles.validUser.password); 
    }
    async checkPaswordIsNotVisible() {
        await expect(this.passwordField).toHaveAttribute('type', 'password');
    }
    async ckeckProfileEmailVisible(email) {
        expect(await this.profileEmail.textContent()).toContain(email.toLowerCase()); 
    }
    async checkLoginWithValidEmails(email, password) {
        await this.clickElement(this.loginButton);
        await this.checkElementIsVisible(this.authorizationPopUp);
        await this.setValueInField(this.emailOrPhoneField, email);
        await this.setValueInField(this.passwordField, password);
        await this.clickElement(this.signInBtn);
        await this.checkElementIsNotVisible(this.authorizationPopUp)
        await this.clickElement(this.avatarBlock)
        await this.ckeckProfileEmailVisible(email);
        await this.clickElement(this.logoutBtn);
    }
}


