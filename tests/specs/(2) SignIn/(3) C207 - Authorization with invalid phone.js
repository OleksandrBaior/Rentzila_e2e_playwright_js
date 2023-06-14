import { test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C207 - Authorization with invalid phone', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateLoginPopUp();
  await loginPage.inputValue(loginPage.passwordField, usersProfiles.validUser.password);
  await loginPage.checkInvalidPhone();
})

  
  
  

