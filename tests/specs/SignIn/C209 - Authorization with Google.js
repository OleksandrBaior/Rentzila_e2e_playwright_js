import { test, expect } from '@playwright/test';
import { LoginPage} from '../../pages/loginPage';
import { BasePage } from '../../pages/basePage';
import { HeaderPage } from '../../pages/headerPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

  test('C209 - Authorization with Google', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const headerPage = new HeaderPage(page);

    await basePage.navigateBaseURL();
    await headerPage.loginBtn.click();
    await expect(loginPage.authorizationPopUp).toBeVisible();
    await loginPage.authorizationGoogleBtn.click();
    await expect(loginPage.emailGoogleField).toBeVisible();
    await loginPage.emailGoogleField.fill(usersProfiles.validUserForGoogle.email);
    await expect(loginPage.emailGoogleField).toHaveValue(usersProfiles.validUserForGoogle.email);
    await loginPage.nextGoogleBtn.click();
    await expect(loginPage.passwordGoogleField).toBeVisible();
    await loginPage.passwordGoogleField.fill(usersProfiles.validUserForGoogle.password);
    await expect(loginPage.passwordGoogleField).toHaveValue(usersProfiles.validUserForGoogle.password);
  });

  
  
  
