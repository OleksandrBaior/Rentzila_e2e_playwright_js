import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';
import { EmailPage, emailForVarifycation } from '../../pages/emailPage';
import { HeaderPage } from '../../pages/headerPage';
import { AdminPage } from '../../pages/adminPage';


test('C195 - Registration with valid credentials (email)', async ({ page }) => {
    test.setTimeout(40000);
    const loginPage = new LoginPage(page);
    const emailPage = new EmailPage(page);
    const headerPage = new HeaderPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.navigateLoginPopUp();
    await loginPage.registrationlink.click();
    await loginPage.inputValue(loginPage.emailOrPhoneField, emailForVarifycation)
    await loginPage.inputValue(loginPage.passwordField, usersProfiles.validUser.password);
    await loginPage.registrationBtn.click();
    await emailPage.verifyEmail(emailForVarifycation);
    await headerPage.logOut();
    await loginPage.loginBtn.click();
    await loginPage.logiIn(usersProfiles.adminAccount.email, usersProfiles.adminAccount.password);
    await expect(headerPage.avatarBlock).toBeVisible();
    await headerPage.superAdminIcon.click();
    await expect(adminPage.adminPanel).toBeVisible();
    await adminPage.users.click();
    await expect(adminPage.userTitle).toBeVisible();
    await adminPage.checkUserExist(true, emailForVarifycation);
    await adminPage.deleteUser(await adminPage.userID.textContent());
    await page.reload();
    await adminPage.checkUserExist(false, emailForVarifycation);
});
