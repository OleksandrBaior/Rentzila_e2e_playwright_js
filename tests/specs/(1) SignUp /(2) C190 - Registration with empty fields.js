import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';
import { EmailPage, emailForVarifycation } from '../../pages/emailPage';
import { HeaderPage } from '../../pages/headerPage';
import { AdminPage, adminURL } from '../../pages/adminPage';

test('C190 - Registration with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const emailPage = new EmailPage(page);
    const headerPage = new HeaderPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.navigateLoginPopUp();
 
});