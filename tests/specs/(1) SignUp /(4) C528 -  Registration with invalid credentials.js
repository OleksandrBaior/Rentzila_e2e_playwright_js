import { expect, test } from '@playwright/test';
import { LoginPage, emptyFieldError, userRegistratedError} from '../../pages/loginPage';
import { HeaderPage } from '../../pages/headerPage';
import { AdminPage } from '../../pages/adminPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C528 -  Registration with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const headerPage = new HeaderPage(page);
    const adminPage = new AdminPage(page);
    await loginPage.navigateLoginPopUp();
    await loginPage.registrationNoAccountBtn.click();
 


    
});
    