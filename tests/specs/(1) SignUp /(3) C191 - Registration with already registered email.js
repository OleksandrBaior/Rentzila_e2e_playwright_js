import { expect, test } from '@playwright/test';
import { LoginPage, emptyFieldError, userRegistratedError} from '../../pages/loginPage';
import { HeaderPage } from '../../pages/headerPage';
import { AdminPage } from '../../pages/adminPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C191 - Registration with already registered email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const headerPage = new HeaderPage(page);
    const adminPage = new AdminPage(page);
    
    await loginPage.navigateLoginPopUp();
    await loginPage.registrationlink.click();
    await loginPage.inputValue(loginPage.emailOrPhoneField, usersProfiles.validUser.email);
    await loginPage.inputValue(loginPage.passwordField, usersProfiles.validUser.password);
    await loginPage.signInBtn.click();
    await loginPage.expectErrorVisible(true, loginPage.userRegistratedError, userRegistratedError);

    await loginPage.navigateLoginPopUp();
    await loginPage.logiIn(usersProfiles.adminAccount.email, usersProfiles.adminAccount.password);
    await headerPage.superAdminIcon.click();
    await adminPage.users.click();
    await adminPage.checkUserExist(true, usersProfiles.validUser.email);
});
    

   
  
