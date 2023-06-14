import { test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C528 - Registration with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateLoginPopUp();
    await loginPage.registrationlink.click();
    await loginPage.inputValue(loginPage.passwordField, usersProfiles.validUser.password);
    await loginPage.checkInvalidEmails();
    await loginPage.checkInvalidPhone();
    await loginPage.inputValue(loginPage.emailOrPhoneField, usersProfiles.validUser.email);
});
    