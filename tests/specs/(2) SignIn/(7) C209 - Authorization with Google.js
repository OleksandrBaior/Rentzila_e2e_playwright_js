import { test, expect } from '@playwright/test';
import { LoginPage} from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C209 - Authorization with Google', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateLoginPopUp();
  await loginPage.authorizationGoogleBtn.click();
  await expect(loginPage.emailGoogleField).toBeVisible();
  await loginPage.inputValue(loginPage.emailGoogleField, usersProfiles.validUserForGoogle.phoneNumber);
  await loginPage.nextGoogleBtn.click();
  await expect(loginPage.passwordGoogleField).toBeVisible();
  await loginPage.inputValue(loginPage.passwordGoogleField, usersProfiles.validUserForGoogle.password);
});

  
  
  
