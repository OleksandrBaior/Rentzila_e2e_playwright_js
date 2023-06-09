import { test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';
import { EmailPage, EMAIL_FOR_VARIFYCATION } from '../../pages/emailPage';
import { HeaderPage } from '../../pages/headerPage';

test('C195 - Registration with valid credentials (email)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const emailPage = new EmailPage(page);
    const headerPage = new HeaderPage(page);


    await loginPage.navigateLoginPopUp();
    await loginPage.registrationNoAccountBtn.click();
    await loginPage.emailOrPhoneField.fill(EMAIL_FOR_VARIFYCATION);
    await loginPage.passwordField.fill(usersProfiles.validUser.password);
    await loginPage.registrationBtn.click();
    await emailPage.verifyEmail();
    
});
