import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BasePage } from '../../pages/basePage';
import { HeaderPage } from '../../pages/headerPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

  test('C207 - Authorization with invalid phone', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const headerPage = new HeaderPage(page);

    await basePage.navigateBaseURL();
    await headerPage.loginBtn.click();
    await expect(loginPage.authorizationPopUp).toBeVisible();
    await loginPage.passwordField.fill(usersProfiles.validUser.password);
    await expect(loginPage.passwordField).toHaveValue(usersProfiles.validUser.password)
    await loginPage.checkInvalidPhone();
  })

  
  
  

